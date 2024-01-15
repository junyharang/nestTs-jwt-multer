import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../../user/model/entity/user.entity";
import { AuthenticationController } from "../controller/authentication.controller";
import { AuthenticationServiceImpl } from "../service/authentication.service-impl";
import { JwtModule } from "@nestjs/jwt";
import configuration from "../../../../common/config/environment/configuration";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "../strategy/jwt.strategy";
import { UserServiceImpl } from "../../user/service/user.service-impl";

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.register({
      secret: configuration().jwt.secret,
      signOptions: { expiresIn: "7d" },
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthenticationController],
  providers: [
    AuthenticationServiceImpl,
    {
      provide: "AuthenticationService",
      useClass: AuthenticationServiceImpl,
    },
    UserServiceImpl,
    {
      provide: "UserService",
      useClass: UserServiceImpl,
    },
    JwtStrategy,
  ],
  exports: [
    AuthenticationServiceImpl,
    {
      provide: "AuthenticationService",
      useClass: AuthenticationServiceImpl,
    },
  ],
})
export class AuthenticationModule {}
