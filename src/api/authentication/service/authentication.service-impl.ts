import { AuthenticationService } from "./authentication.service";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../../user/model/entity/user.entity";
import { BadRequestException, ForbiddenException, HttpStatus, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { SignupRequestDto } from "../model/dto/request/signup-request.dto";
import { DefaultResponse } from "../../common/constant/default.response";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { SigninRequestDto } from "../model/dto/request/signin-request.dto";
import { EncryptUtil } from "../../../common/util/encrypt.util";
import { JwtService } from "@nestjs/jwt";
import { Response } from "express";
import { JwtPayload } from "../jwt/jwt.payload";
import { ConfigService } from "@nestjs/config";
import { JwtConfig } from "../../../../common/config/jwt.config";
import { SigninResponseDto } from "../model/dto/response/SigninResponseDto";
import { UserReissueAccessTokenRequestDto } from "../model/dto/request/user-reissue-access-token-request.dto";
import { CookieService } from "../../common/cookie/service/cookie.service";

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

    const saveUserResult = await this.userRepository.save(signupRequestDto.toEntity(signupRequestDto));

    if (saveUserResult === null) {
      return DefaultResponse.response(HttpStatus.INTERNAL_SERVER_ERROR, "Server Error");
    }

    return DefaultResponse.responseWithData(HttpStatus.CREATED, "회원 가입 성공했어요!", saveUserResult.id);
  }

  async signIn(signinRequestDto: SigninRequestDto, response: Response): Promise<DefaultResponse<SigninResponseDto>> {
    const findByUserInfo = await this.userRepository.findOne({
      where: { email: signinRequestDto.email },
    });

    if (findByUserInfo && (await bcrypt.compare(signinRequestDto.password, findByUserInfo.password))) {
      const payload: JwtPayload = { email: findByUserInfo.email };

      const accessToken = this.jwtService.sign(payload, {
        secret: this.jwtConfig.accessTokenSecret,
        expiresIn: this.jwtConfig.accessTokenExpireIn,
      });

      const refreshToken = this.jwtService.sign(payload, {
        secret: this.jwtConfig.refreshTokenSecret,
        expiresIn: this.jwtConfig.refreshTokenExpireIn,
      });

      findByUserInfo.setRefreshToken(await EncryptUtil.hashingEncrypt("token", refreshToken));
      findByUserInfo.setRefreshTokenExpireDate(this.getCurrentRefreshTokenExpireDate());

      await this.userRepository.update(
        { id: findByUserInfo.id },
        {
          refreshToken: findByUserInfo.refreshToken,
          refreshTokenExpireDate: findByUserInfo.refreshTokenExpireDate,
        },
      );

      response.setHeader("authorization", "Bearer " + [accessToken, refreshToken]);

      this.cookieService.setRefreshToken(response, refreshToken);

      return DefaultResponse.responseWithData(
        HttpStatus.OK,
        "로그인 성공!",
        new SigninResponseDto(accessToken, refreshToken, findByUserInfo.refreshTokenExpireDate),
      );
    } else {
      return DefaultResponse.response(HttpStatus.BAD_REQUEST, "로그인 실패! Email 또는 비밀번호를 확인해주세요.");
    }
  }

  async reissueAccessToken(userReissueAccessTokenRequestDto: UserReissueAccessTokenRequestDto): Promise<DefaultResponse<string>> {
    if (userReissueAccessTokenRequestDto === null) {
      return DefaultResponse.response(HttpStatus.BAD_REQUEST, "Access Token 재발급에 실패하였어요.");
    }

    const payload: JwtPayload = { email: userReissueAccessTokenRequestDto.email };

    return DefaultResponse.responseWithData(
      HttpStatus.OK,
      "Access Token 재발급 성공!",
      this.jwtService.sign(payload, {
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

  async signOut(id: number, response: Response): Promise<DefaultResponse<Response>> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      return DefaultResponse.response(HttpStatus.UNAUTHORIZED, "로그인 아웃 실패!");
    }

    return DefaultResponse.responseWithData(
      HttpStatus.OK,
      "로그아웃 성공!",
      response.setHeader("Set-Cookie", `Authentication=; HttpOnly; Path=/; Max-Age=0`),
      // response.cookie("jwt", "", { maxAge: 0 }),
    );
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
