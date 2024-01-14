import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import configuration from "../common/config/environment/configuration";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRoot({
      type: configuration().db.type,
      host: configuration().db.host,
      database: configuration().db.database,
      port: configuration().db.port,
      username: configuration().db.username,
      password: configuration().db.password,
      synchronize: configuration().db.synchronize,
      entities: [__dirname + "/**/*.entity{.ts,.js}"],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

//     // GraphQLModule.forRoot<ApolloDriverConfig>({
//     //   autoSchemaFile: true,
//     //   driver: ApolloDriver,
//     // }),
