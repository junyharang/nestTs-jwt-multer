import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import configuration from "../../../../../common/config/environment/configuration";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "../model/entity/category.entity";
import { CategoryServiceImpl } from "../service/category.service-impl";
import { CategoryController } from "../controller/category.controller";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forFeature([Category]),
  ],
  controllers: [CategoryController],
  providers: [
    CategoryServiceImpl,
    {
      provide: "CategoryService",
      useClass: CategoryServiceImpl,
    },
  ],
})
export class CategoryModule {}
