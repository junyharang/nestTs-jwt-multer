import { SignupRequestDto } from "../model/dto/request/signup-request.dto";
import { DefaultResponse } from "../../common/constant/default.response";
import { SigninRequestDto } from "../model/dto/request/signin-request.dto";
import { Response } from "express";
import { SigninResponseDto } from "../model/dto/response/SigninResponseDto";
import { UserReissueAccessTokenRequestDto } from "../model/dto/request/user-reissue-access-token-request.dto";
import { User } from "../../user/model/entity/user.entity";

export interface AuthenticationService {
  signUp(signupRequestDto: SignupRequestDto): Promise<DefaultResponse<number>>;

  signIn(signinRequestDto: SigninRequestDto, response: Response): Promise<DefaultResponse<SigninResponseDto>>;

  reissueAccessToken(userReissueAccessTokenRequestDto: UserReissueAccessTokenRequestDto): Promise<DefaultResponse<string>>;

  validateRefreshToken(authUser: User, refreshToken: string): Promise<void>;

  signOut(id: number, response: Response): Promise<DefaultResponse<Response>>;

  validateUser(email: string, password: string): Promise<any>;
}
