import { DefaultResponse } from "../../../common/constant/default.response";
import { UserTokenRequestDto } from "../../../common/authentication/model/dto/request/user-token-request.dto";
import { ProductSearchRequestDto } from "../../../management/product/model/dto/request/product-search.request.dto";
import { ProductListResponseDto } from "../../../management/product/model/dto/response/product-list.response.dto";
import { ProductDetailResponseDto } from "../../../management/product/model/dto/response/product-detail.response.dto";
import express from "express";
import { ProductImageUrlSearchRequestDto } from "../../../common/product/model/dto/request/product-image-url-search.request.dto";

export interface UserProductService {
  getUserProductList(productSearchRequestDto: ProductSearchRequestDto): Promise<DefaultResponse<ProductListResponseDto>>;

  getUserProductDetail(userTokenRequestDto: UserTokenRequestDto, productId: number): Promise<DefaultResponse<ProductDetailResponseDto>>;

  viewImage(userTokenRequestDto: UserTokenRequestDto, urn: string, response: express.Response): Promise<DefaultResponse<void>>;
}
