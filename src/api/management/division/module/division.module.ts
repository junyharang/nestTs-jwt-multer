import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import configuration from "../../../../../common/config/environment/configuration";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Division } from "../model/entity/division.entity";
import { DivisionServiceImpl } from "../service/division.service-impl";
import { DivisionController } from "../controller/division.controller";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forFeature([Division]),
  ],
  controllers: [DivisionController],
  providers: [
    DivisionServiceImpl,
    {
      provide: "DivisionService",
      useClass: DivisionServiceImpl,
    },
  ],
})
export class DivisionModule {}
