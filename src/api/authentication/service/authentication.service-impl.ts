import { AuthenticationService } from "./authentication.service";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../../user/model/entity/user.entity";
import { HttpStatus, Injectable } from "@nestjs/common";
import { SignupRequestDto } from "../model/dto/request/signup-request.dto";
import { DefaultResponse } from "../../common/constant/default.response";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { SigninRequestDto } from "../model/dto/request/signin-request.dto";
import { EncryptUtil } from "../../../common/util/encrypt.util";
import { JwtService } from "@nestjs/jwt";

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
      const { email, name, age } = findByUserInfo;

      const payload = {
        email,
        name,
        age,
      };

      return DefaultResponse.responseWithData(HttpStatus.OK, "로그인 성공!", this.jwtService.sign(payload));
    } else {
      return DefaultResponse.response(HttpStatus.BAD_REQUEST, "로그인 실패!");
    }
  }
}
