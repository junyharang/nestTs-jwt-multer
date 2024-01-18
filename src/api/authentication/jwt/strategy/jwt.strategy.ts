import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy, VerifiedCallback } from "passport-jwt";
import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtPayload } from "../jwt.payload";
import { UserService } from "../../../user/service/user.service";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor(
    @Inject("UserService") private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // secretOrKey: configuration().jwt.secret,
      secretOrKey: configService.get("jwt.accessTokenSecret"),
    });
  }

  async validate(jwtPayload: JwtPayload, done: VerifiedCallback): Promise<void> {
    const authUser = await this.userService.findByEmail(jwtPayload.email);

    if (!authUser) {
      throw new UnauthorizedException({ statusCode: 401, message: "회원 정보를 찾을 수 없어요." });
    }

    return done(null, {
      id: authUser.id,
      email: authUser.email,
      name: authUser.name,
      role: authUser.role,
    });
  }
}
