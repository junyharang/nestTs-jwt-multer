import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import configuration from "../../../../../common/config/environment/configuration";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserProductController } from "../controller/product.controller";
import { User } from "../../../common/user/model/entity/user.entity";
import { UserServiceImpl } from "../../../common/user/service/user.service-impl";
import { ProductQueryBuilderRepository } from "../../../management/product/repository/product-query-builder.repository";
import { Product } from "../../../management/product/model/entity/product.entity";
import { UserProductServiceImpl } from "../service/user-product.service-impl";
import { ProductAdditionalImage } from "../../../management/product/model/entity/product-additional-image.entity";
import { ProductDetailImage } from "../../../management/product/model/entity/product-detail-image.entity";
import { Category } from "../../../management/category/model/entity/category.entity";
import { Division } from "../../../management/division/model/entity/division.entity";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forFeature([User, Product, ProductAdditionalImage, ProductDetailImage, Category, Division]),
  ],
  controllers: [UserProductController],
  providers: [
    UserServiceImpl,
    {
      provide: "UserService",
      useClass: UserServiceImpl,
    },
    UserProductServiceImpl,
    {
      provide: "UserProductService",
      useClass: UserProductServiceImpl,
    },
    ProductQueryBuilderRepository,
    {
      provide: "ProductQueryBuilderRepository",
      useClass: ProductQueryBuilderRepository,
    },
  ],
})
export class UserProductModule {}
