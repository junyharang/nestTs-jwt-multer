import { AuthenticationService } from "./authentication.service";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../../user/model/entity/user.entity";
import { BadRequestException, ForbiddenException, HttpStatus, Injectable } from "@nestjs/common";
import { SignupRequestDto } from "../model/dto/request/signup-request.dto";
import { DefaultResponse } from "../../common/constant/default.response";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { SigninRequestDto } from "../model/dto/request/signin-request.dto";
import { EncryptUtil } from "../../../common/util/encrypt.util";
import { JwtService } from "@nestjs/jwt";
import { response, Response } from "express";

@Injectable()
export class AuthenticationServiceImpl implements AuthenticationService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(signupRequestDto: SignupRequestDto): Promise<DefaultResponse<number>> {
    if (signupRequestDto === null) {
      return DefaultResponse.response(HttpStatus.BAD_REQUEST, "회원가입에 실패하였어요.");
    }

    signupRequestDto.password = await EncryptUtil.userPasswordEncryptor(signupRequestDto.password);

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

  async signIn(signinRequestDto: SigninRequestDto): Promise<DefaultResponse<string>> {
    const findByUserInfo = await this.userRepository.findOne({
      select: ["email", "password"],
      where: { email: signinRequestDto.email },
    });

    if (findByUserInfo && (await bcrypt.compare(signinRequestDto.password, findByUserInfo.password))) {
      const { id, email, name, age } = findByUserInfo;

      const payload = {
        id,
        email,
        name,
        age,
      };

      return DefaultResponse.responseWithData(HttpStatus.OK, "로그인 성공!", this.jwtService.sign(payload));
    } else {
      return DefaultResponse.response(HttpStatus.BAD_REQUEST, "로그인 실패!");
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
}
