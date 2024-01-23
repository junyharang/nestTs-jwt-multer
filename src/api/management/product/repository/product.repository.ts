import { ProductSearchRequestDto } from "../model/dto/request/product-search.request.dto";
import { Product } from "../model/entity/product.entity";

export interface ProductRepository {
  dynamicQuerySearchAndPagingByDto(productSearchRequestDto: ProductSearchRequestDto): Promise<[Product[], number]>;
}
