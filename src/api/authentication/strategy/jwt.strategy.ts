import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-jwt";
import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { ExtractJwt, VerifiedCallback } from "passport-jwt";
import configuration from "../../../../common/config/environment/configuration";
import { JwtPayload } from "./jwt.payload";
import { UserService } from "../../user/service/user.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt-authentication") {
  constructor(@Inject("UserService") private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configuration().jwt.secret,
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
    });
  }
}
