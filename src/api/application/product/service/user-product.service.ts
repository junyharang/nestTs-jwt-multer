import { DefaultResponse } from "../../../common/constant/default.response";
import { UserTokenRequestDto } from "../../../common/authentication/model/dto/request/user-token-request.dto";
import { ProductSearchRequestDto } from "../../../management/product/model/dto/request/product-search.request.dto";
import { ProductListResponseDto } from "../../../management/product/model/dto/response/product-list.response.dto";
import { ProductDetailResponseDto } from "../../../management/product/model/dto/response/product-detail.response.dto";

export interface UserProductService {
  getUserProductList(productSearchRequestDto: ProductSearchRequestDto): Promise<DefaultResponse<ProductListResponseDto>>;

  getUserProductDetail(userTokenRequestDto: UserTokenRequestDto, productId: number): Promise<DefaultResponse<ProductDetailResponseDto>>;
}
