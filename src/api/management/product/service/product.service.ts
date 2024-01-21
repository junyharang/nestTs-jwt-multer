import { DefaultResponse } from "../../../common/constant/default.response";

export interface ProductService {
  createProduct(productCreateRequestDto: ProductCreateRequestDto): Promise<DefaultResponse<number>>;
}
