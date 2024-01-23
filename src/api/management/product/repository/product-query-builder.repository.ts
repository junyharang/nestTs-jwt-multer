import { ProductRepository } from "./product.repository";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "../model/entity/product.entity";
import { Repository, SelectQueryBuilder } from "typeorm";
import { ProductSearchRequestDto } from "../model/dto/request/product-search.request.dto";

@Injectable()
export class ProductQueryBuilderRepository implements ProductRepository {
  constructor(@InjectRepository(Product) private readonly productRepository: Repository<Product>) {}

  async dynamicQuerySearchAndPagingByDto(productSearchRequestDto: ProductSearchRequestDto): Promise<[Product[], number]> {
    const selectQueryBuilder: SelectQueryBuilder<Product> = this.productRepository
      .createQueryBuilder("product")
      .leftJoinAndSelect("product.user", "author")
      .leftJoinAndSelect("product.category", "category")
      .leftJoinAndSelect("product.division", "division")
      .take(productSearchRequestDto.getLimit())
      .skip(productSearchRequestDto.getOffset());

    if (productSearchRequestDto.category) {
      selectQueryBuilder.andWhere("category.categoryName LIKE :category", { category: `%${productSearchRequestDto.category}%` });
    }

    if (productSearchRequestDto.division) {
      selectQueryBuilder.andWhere("division.divisionName LIKE :division", { division: `%${productSearchRequestDto.division}%` });
    }

    selectQueryBuilder.orderBy("product.productId", productSearchRequestDto.sort);

    return await selectQueryBuilder.getManyAndCount();
  }

  findByIdAndJoinOneThing(productId: number): Promise<Product> {
    return this.productRepository
      .createQueryBuilder("product")
      .leftJoinAndSelect("product.user", "author")
      .leftJoinAndSelect("product.category", "category")
      .leftJoinAndSelect("product.division", "division")
      .leftJoinAndSelect("product.productAdditionalImages", "productAdditionalImages")
      .leftJoinAndSelect("product.productDetailImages", "productDetailImages")
      .where("product.productId = :productId", { productId })
      .getOne();
  }
}
