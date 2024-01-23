import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import configuration from "../common/config/environment/configuration";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "./api/common/user/module/user.module";
import { FileModule } from "./api/common/file/module/file.module";
import { ProductModule } from "./api/management/product/module/product.module";
import { AuthenticationModule } from "./api/common/authentication/module/authentication.module";
import { CategoryModule } from "./api/management/category/module/category.module";
import { DivisionModule } from "./api/management/division/module/division.module";

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
      logging: configuration().db.logging,
    }),

    AuthenticationModule,
    UserModule,
    FileModule,
    ProductModule,
    CategoryModule,
    DivisionModule,
  ],
})
export class AppModule {}

//     // GraphQLModule.forRoot<ApolloDriverConfig>({
//     //   autoSchemaFile: true,
//     //   driver: ApolloDriver,
//     // }),
