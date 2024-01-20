import { Body, Controller, Get, Inject, Post, Req, Res, UseGuards, ValidationPipe } from "@nestjs/common";
import { DefaultResponse } from "../../common/constant/default.response";
import { SignupRequestDto } from "../model/dto/request/signup-request.dto";
import { AuthenticationService } from "../service/authentication.service";
import { SigninRequestDto } from "../model/dto/request/signin-request.dto";
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { JwtAuthenticationGuard } from "../guard/jwt.authentication.guard";
import { SignoutRequestDto } from "../model/dto/request/signout-request.dto";
import { Response } from "express";
import { SigninResponseDto } from "../model/dto/response/SigninResponseDto";
import { AuthGuard } from "@nestjs/passport";
import { GetUserInfo, UserReissueAccessTokenRequestDto } from "../model/dto/request/user-reissue-access-token-request.dto";

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
  async signIn(
    @Body(ValidationPipe) signinRequestDto: SigninRequestDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<DefaultResponse<SigninResponseDto>> {
    return this.authenticationService.signIn(signinRequestDto, response);
  }

  @ApiOperation({
    summary: "Access Token 재발급",
  })
  @ApiOkResponse({
    description: "재발급 성공",
    type: DefaultResponse<string>,
  })
  @Get("/refresh")
  @UseGuards(AuthGuard("jwt-refresh-token"))
  async reissueAccessToken(@GetUserInfo() userReissueAccessTokenRequestDto: UserReissueAccessTokenRequestDto): Promise<DefaultResponse<string>> {
    return this.authenticationService.reissueAccessToken(userReissueAccessTokenRequestDto);
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
