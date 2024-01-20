import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy, VerifiedCallback } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { UserService } from "../../../user/service/user.service";
import { Request } from "express";
import { JwtAccessTokenPayload } from "../jwtAccessTokenPayload";
import { AuthenticationService } from "../../service/authentication.service";

@Injectable()
export class JwtRefreshAccessTokenStrategy extends PassportStrategy(Strategy, "jwt-refresh-token") {
  constructor(
    @Inject("UserService") private readonly userService: UserService,
    @Inject("AuthenticationService") private readonly authenticationService: AuthenticationService,
    private readonly configService: ConfigService,
  ) {
    const extractors = [(request: Request) => request.cookies?.refreshToken];

    super({
      jwtFromRequest: ExtractJwt.fromExtractors(extractors),
      ignoreExpiration: false,
      secretOrKey: configService.get("jwt.refreshTokenSecret"),
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload: JwtAccessTokenPayload, done: VerifiedCallback) {
    const refreshToken = request.cookies?.refreshToken;

    const authUser = await this.userService.findByEmail(payload.email);

    if (!authUser) {
      throw new UnauthorizedException({ statusCode: 401, message: "회원 정보를 찾을 수 없어요." });
    }

    await this.authenticationService.validateRefreshToken(authUser, refreshToken);
    return done(null, { email: payload.email });
  }
}
