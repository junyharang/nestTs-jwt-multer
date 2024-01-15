import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../../user/model/entity/user.entity";
import { UserServiceImpl } from "../../user/service/user.service-impl";
import { AuthenticationModule } from "../../authentication/module/authentication.module";
import { UserController } from "../controller/user.controller";

@Module({
  imports: [TypeOrmModule.forFeature([User]), AuthenticationModule],
  controllers: [UserController],
  providers: [
    UserServiceImpl,
    {
      provide: "UserService",
      useClass: UserServiceImpl,
    },
  ],
})
export class UserModule {}
