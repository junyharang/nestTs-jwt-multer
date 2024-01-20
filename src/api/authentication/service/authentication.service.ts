import { SignupRequestDto } from "../model/dto/request/signup-request.dto";
import { DefaultResponse } from "../../common/constant/default.response";
import { SigninRequestDto } from "../model/dto/request/signin-request.dto";
import { Response } from "express";
import { SigninResponseDto } from "../model/dto/response/SigninResponseDto";
import { UserTokenRequestDto } from "../model/dto/request/user-token-request.dto";
import { User } from "../../user/model/entity/user.entity";

export interface AuthenticationService {
  signUp(signupRequestDto: SignupRequestDto): Promise<DefaultResponse<number>>;

  signIn(signinRequestDto: SigninRequestDto, response: Response): Promise<DefaultResponse<SigninResponseDto>>;

  reissueAccessToken(userTokenRequestDto: UserTokenRequestDto): Promise<DefaultResponse<string>>;

  validateRefreshToken(authUser: User, refreshToken: string): Promise<void>;

  signOut(email: string, response: Response): Promise<DefaultResponse<void>>;

  validateUser(email: string, password: string): Promise<any>;
}
