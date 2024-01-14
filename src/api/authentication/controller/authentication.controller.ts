import { Body, Controller, Inject, Post, ValidationPipe } from "@nestjs/common";
import { DefaultResponse } from "../../common/constant/default.response";
import { SignupRequestDto } from "../model/dto/request/signup-request.dto";
import { AuthenticationService } from "../service/authentication.service";
import { SigninRequestDto } from "../model/dto/request/signin-request.dto";

@Controller("user")
export class AuthenticationController {
  constructor(@Inject("AuthenticationService") private readonly authenticationService: AuthenticationService) {}

  @Post("/signup")
  async signUp(@Body() userCreateRequestDto: SignupRequestDto): Promise<DefaultResponse<number>> {
    return this.authenticationService.signUp(userCreateRequestDto);
  }

  @Post("/signin")
  async signIn(@Body(ValidationPipe) signinRequestDto: SigninRequestDto): Promise<DefaultResponse<string>> {
    return this.authenticationService.signIn(signinRequestDto);
  }
}
