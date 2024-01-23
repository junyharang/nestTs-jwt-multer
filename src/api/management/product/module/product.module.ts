import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import configuration from "../../../../../common/config/environment/configuration";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "../model/entity/product.entity";
import { ProductAdditionalImage } from "../model/entity/product-additional-image.entity";
import { ProductController } from "../controller/product.controller";
import { ProductServiceImpl } from "../service/product.service-impl";
import { Category } from "../../category/model/entity/category.entity";
import { Division } from "../../division/model/entity/division.entity";
import { ProductDetailImage } from "../model/entity/product-detail-image.entity";
import { ProductQueryBuilderRepository } from "../repository/product-query-builder.repository";
import { User } from "../../../common/user/model/entity/user.entity";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forFeature([User, Product, ProductAdditionalImage, ProductDetailImage, Category, Division]),
  ],
  controllers: [ProductController],
  providers: [
    ProductServiceImpl,
    {
      provide: "ProductService",
      useClass: ProductServiceImpl,
    },
    ProductQueryBuilderRepository,
    {
      provide: "ProductQueryBuilderRepository",
      useClass: ProductQueryBuilderRepository,
    },
  ],
})
export class ProductModule {}
