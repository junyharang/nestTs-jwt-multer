import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import configuration from "../common/config/environment/configuration";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthenticationModule } from "./api/authentication/module/authentication.module";
import { UserModule } from "./api/user/module/user.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRoot({
      autoLoadEntities: true,
      type: configuration().db.type,
      host: configuration().db.host,
      database: configuration().db.database,
      port: configuration().db.port,
      username: configuration().db.username,
      password: configuration().db.password,
      synchronize: configuration().db.synchronize,
    }),

    AuthenticationModule,
    UserModule,
  ],
})
export class AppModule {}

//     // GraphQLModule.forRoot<ApolloDriverConfig>({
//     //   autoSchemaFile: true,
//     //   driver: ApolloDriver,
//     // }),
