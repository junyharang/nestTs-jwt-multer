import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../../user/model/entity/user.entity";
import { AuthenticationController } from "../controller/authentication.controller";
import { AuthenticationServiceImpl } from "../service/authentication.service-impl";
import { JwtModule } from "@nestjs/jwt";
import configuration from "../../../../common/config/environment/configuration";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "../jwt/strategy/jwt.strategy";
import { UserServiceImpl } from "../../user/service/user.service-impl";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtConfig } from "../../../../common/config/jwt.config";

@Module({
  imports: [
    // PassportModule.register({ defaultStrategy: "jwt" }),
    // JwtModule.register({
    //   secret: configuration().jwt.secret,
    //   signOptions: { expiresIn: "7d" },
    // }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forFeature([User]),
    // UserModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        const jwt = configService.get<JwtConfig>("jwt");

        return {
          secret: jwt.accessTokenSecret,
          signOptions: { expiresIn: jwt.accessTokenExpireIn },
        };
      },
      inject: [ConfigService],
    }),
    PassportModule.register({ defaultStrategy: "jwt" }),
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
