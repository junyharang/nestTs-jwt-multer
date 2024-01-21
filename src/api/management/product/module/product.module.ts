import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import configuration from "../../../../../common/config/environment/configuration";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "../model/entity/product.entity";
import { ProductImage } from "../model/entity/product-image.entity";
import { ProductController } from "../controller/product.controller";
import { ProductServiceImpl } from "../service/product.service-impl";
import { Category } from "../../category/model/entity/category.entity";
import { Division } from "../../division/model/entity/division.entity";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forFeature([Product, ProductImage, Category, Division]),
  ],
  controllers: [ProductController],
  providers: [
    ProductServiceImpl,
    {
      provide: "ProductService",
      useClass: ProductServiceImpl,
    },
  ],
})
export class ProductModule {}
