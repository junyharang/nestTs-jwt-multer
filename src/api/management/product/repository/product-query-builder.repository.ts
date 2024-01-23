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
      .innerJoinAndSelect("product.category", "category")
      .innerJoinAndSelect("product.division", "division");

    if (productSearchRequestDto.category) {
      selectQueryBuilder.andWhere("category LIKE :category", { category: `%${productSearchRequestDto.category}%` });
    }

    if (productSearchRequestDto.division) {
      selectQueryBuilder.andWhere("division LIKE :division", { division: `%${productSearchRequestDto.division}%` });
    }

    selectQueryBuilder.orderBy("product.id", productSearchRequestDto.sort);

    if (
      productSearchRequestDto.getLimit() > 0 ||
      (productSearchRequestDto.getLimit() !== null && productSearchRequestDto.getOffset() !== undefined)
    ) {
      console.log("productSearchRequestDto.getLimit(): ");
      console.log(productSearchRequestDto.getLimit());
      selectQueryBuilder.take(productSearchRequestDto.getLimit());
    }

    if (productSearchRequestDto.getLimit() > 0 || productSearchRequestDto.getOffset() !== null || productSearchRequestDto.getOffset() !== undefined) {
      console.log("productSearchRequestDto.getOffset(): ");
      console.log(productSearchRequestDto.getOffset());
      selectQueryBuilder.skip(productSearchRequestDto.getOffset());
    }

    return await selectQueryBuilder.getManyAndCount();
  }
}
