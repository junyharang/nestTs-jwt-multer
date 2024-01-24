import { AuthenticationService } from "./authentication.service";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../../user/model/entity/user.entity";
import { BadRequestException, ForbiddenException, HttpStatus, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { SignupRequestDto } from "../model/dto/request/signup-request.dto";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { SigninRequestDto } from "../model/dto/request/signin-request.dto";
import { JwtService } from "@nestjs/jwt";
import { response, Response } from "express";
import { JwtAccessTokenPayload, JwtRefreshTokenPayload } from "../jwt/jwtAccessTokenPayload";
import { ConfigService } from "@nestjs/config";
import { SigninResponseDto } from "../model/dto/response/SigninResponseDto";
import { UserTokenRequestDto } from "../model/dto/request/user-token-request.dto";
import { CookieService } from "../../cookie/service/cookie.service";
import { JwtConfig } from "../../../../../common/config/jwt.config";
import { EncryptUtil } from "../../../../common/util/encrypt.util";
import { DefaultResponse } from "../../constant/default.response";
import { Role } from "../../user/model/entity/role";
import { async } from "rxjs";

@Injectable()
export class AuthenticationServiceImpl implements AuthenticationService {
  private jwtConfig: JwtConfig = this.configService.get("jwt");
  private saltOrRounds = this.jwtConfig.saltOrRounds;

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    @Inject("CookieService") private readonly cookieService: CookieService,
  ) {}

  async signUp(signupRequestDto: SignupRequestDto): Promise<DefaultResponse<number>> {
    if (signupRequestDto === null) {
      return DefaultResponse.response(HttpStatus.BAD_REQUEST, "회원가입에 실패하였어요.");
    }

    signupRequestDto.password = await EncryptUtil.hashingEncrypt("password", signupRequestDto.password);

    const userEmail = signupRequestDto.email;

    if ((await this.userRepository.findOne({ where: { email: userEmail } })) !== null) {
      return DefaultResponse.response(HttpStatus.CONFLICT, "이미 등록된 Email 주소 입니다.");
    }

    const users = await this.userRepository.findAndCount();

    if (!users || users[0].length === 0 || users[1] === 0) {
      signupRequestDto.role = Role.ADMIN;
    }

    const saveUserResult = await this.userRepository.save(signupRequestDto.toEntity(signupRequestDto));

    if (saveUserResult === null) {
      return DefaultResponse.response(HttpStatus.INTERNAL_SERVER_ERROR, "Server Error");
    }

    return DefaultResponse.responseWithData(HttpStatus.CREATED, "회원 가입 성공했어요!", saveUserResult.userId);
  }

  async signIn(signinRequestDto: SigninRequestDto, response: Response): Promise<DefaultResponse<SigninResponseDto>> {
    const findByUserInfo: User = await this.userRepository.findOne({
      where: { email: signinRequestDto.email },
    });

    if (findByUserInfo && (await bcrypt.compare(signinRequestDto.password, findByUserInfo.password))) {
      const accessTokenPayload: JwtAccessTokenPayload = {
        email: findByUserInfo.email,
        role: findByUserInfo.userRole,
      };

      const refreshTokenPayload: JwtRefreshTokenPayload = {
        email: findByUserInfo.email,
      };

      const accessToken = this.jwtService.sign(accessTokenPayload, {
        secret: this.jwtConfig.accessTokenSecret,
        expiresIn: this.jwtConfig.accessTokenExpireIn,
      });

      const refreshToken = this.jwtService.sign(refreshTokenPayload, {
        secret: this.jwtConfig.refreshTokenSecret,
        expiresIn: this.jwtConfig.refreshTokenExpireIn,
      });

      findByUserInfo.setRefreshToken(await EncryptUtil.hashingEncrypt("token", refreshToken));
      findByUserInfo.setRefreshTokenExpireDate(this.getCurrentRefreshTokenExpireDate());

      await this.userRepository.update(findByUserInfo.userId, {
        refreshToken: findByUserInfo.refreshToken,
        refreshTokenExpireDateTime: findByUserInfo.refreshTokenExpireDateTime,
      });

      response.setHeader("authorization", "Bearer " + [accessToken, refreshToken]);

      this.cookieService.setRefreshToken(response, refreshToken);

      return DefaultResponse.responseWithData(
        HttpStatus.OK,
        "로그인 성공!",
        new SigninResponseDto(accessToken, refreshToken, findByUserInfo.refreshTokenExpireDateTime),
      );
    } else {
      return DefaultResponse.response(HttpStatus.BAD_REQUEST, "로그인 실패! Email 또는 비밀번호를 확인해주세요.");
    }
  }

  async reissueAccessToken(userTokenRequestDto: UserTokenRequestDto): Promise<DefaultResponse<string>> {
    if (userTokenRequestDto === null) {
      return DefaultResponse.response(HttpStatus.BAD_REQUEST, "Access Token 재발급에 실패하였어요.");
    }

    const accessTokenPayload: JwtAccessTokenPayload = {
      email: userTokenRequestDto.email,
      role: userTokenRequestDto.role,
    };

    return DefaultResponse.responseWithData(
      HttpStatus.OK,
      "Access Token 재발급 성공!",
      this.jwtService.sign(accessTokenPayload, {
        secret: this.jwtConfig.accessTokenSecret,
        expiresIn: this.jwtConfig.accessTokenExpireIn,
      }),
    );
  }

  async validateRefreshToken(authUser: User, refreshToken: string): Promise<void> {
    if (!(await bcrypt.compare(refreshToken, authUser.refreshToken))) {
      throw new UnauthorizedException({ statusCode: 401, message: "Refresh Token이 유효하지 않아요." });
    }
  }

  async signOut(email: string, response: Response): Promise<DefaultResponse<void>> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      return DefaultResponse.response(HttpStatus.UNAUTHORIZED, "로그 아웃 실패! 이용자 정보를 찾을 수 없어요.");
    }

    user.setRefreshToken("");
    user.setRefreshTokenExpireDate(null);

    await this.userRepository.update(user.userId, {
      refreshToken: user.refreshToken,
      refreshTokenExpireDateTime: user.refreshTokenExpireDateTime,
    });

    this.cookieService.clearRefreshToken(response);

    return DefaultResponse.response(HttpStatus.OK, "로그아웃 성공!");
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw new ForbiddenException({ statusCode: 403, message: "등록되지 않은 이용자에요." });
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException({ statusCode: 400, message: "잘못된 비밀번호가 전달 되었어요." });
    }

    return user;
  }

  private getCurrentRefreshTokenExpireDate(): Date {
    const currentDate = new Date();
    // Date 형식으로 데이터 베이스 저장을 위해 문자열을 숫자 타입으로 변환
    return new Date(currentDate.getTime() + parseInt(this.configService.get<string>("jwt.refreshTokenExpireIn")));
  }
}
