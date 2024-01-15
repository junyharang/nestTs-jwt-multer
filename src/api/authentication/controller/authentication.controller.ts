import { Body, Controller, Inject, Post, Req, Res, UseGuards, ValidationPipe } from "@nestjs/common";
import { DefaultResponse } from "../../common/constant/default.response";
import { SignupRequestDto } from "../model/dto/request/signup-request.dto";
import { AuthenticationService } from "../service/authentication.service";
import { SigninRequestDto } from "../model/dto/request/signin-request.dto";
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { JwtAuthenticationGuard } from "../guard/jwt.authentication.guard";
import { SignoutRequestDto } from "../model/dto/request/signout-request.dto";
import { Response } from "express";

@ApiTags("인증 서비스")
@Controller("auth")
export class AuthenticationController {
  constructor(@Inject("AuthenticationService") private readonly authenticationService: AuthenticationService) {}

  @ApiOperation({
    summary: "회원가입 기능",
  })
  @ApiOkResponse({
    description: "회원가입 성공",
    type: DefaultResponse<number>,
  })
  @Post("/signup")
  async signUp(@Body() userCreateRequestDto: SignupRequestDto): Promise<DefaultResponse<number>> {
    return this.authenticationService.signUp(userCreateRequestDto);
  }

  @ApiOperation({
    summary: "로그인 기능",
  })
  @ApiOkResponse({
    description: "로그인 성공",
    type: DefaultResponse<string>,
  })
  @Post("/signin")
  async signIn(@Body(ValidationPipe) signinRequestDto: SigninRequestDto): Promise<DefaultResponse<string>> {
    return this.authenticationService.signIn(signinRequestDto);
  }

  @Post("/signout")
  @ApiOperation({
    summary: "로그 아웃 기능",
  })
  @ApiOkResponse({
    description: "로그아웃 성공",
    type: DefaultResponse<number>,
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthenticationGuard)
  async signOut(@Req() signOutRequestDto: SignoutRequestDto, @Res() response: Response): Promise<DefaultResponse<Response>> {
    return this.authenticationService.signOut(signOutRequestDto.id, response);
  }
}
