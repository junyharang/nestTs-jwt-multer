import { SignupRequestDto } from "../model/dto/request/signup-request.dto";
import { DefaultResponse } from "../../common/constant/default.response";
import { SigninRequestDto } from "../model/dto/request/signin-request.dto";
import { Response } from "express";

export interface AuthenticationService {
  signUp(signupRequestDto: SignupRequestDto): Promise<DefaultResponse<number>>;

  signIn(signinRequestDto: SigninRequestDto): Promise<DefaultResponse<string>>;

  signOut(id: number, response: Response): Promise<DefaultResponse<Response>>;

  validateUser(email: string, password: string): Promise<any>;
}
