import { DefaultResponse } from "../../../common/constant/default.response";
import { ProductEditRequestDto } from "../model/dto/request/product-edit.request.dto";
import { ProductEditImageResponseDto } from "../model/dto/response/image/product-edit-image-response.dto";
import { ProductSearchRequestDto } from "../model/dto/request/product-search.request.dto";
import { ProductListResponseDto } from "../model/dto/response/product-list.response.dto";
import { ProductDetailResponseDto } from "../model/dto/response/product-detail.response.dto";
import { ProductUpdateRequestDto } from "../model/dto/request/product-update.request.dto";
import { ProductCheckedIdRequestDto } from "../model/dto/request/common/product-checked-id.request.dto";
import { ProductImageDeleteRequestDto } from "../model/dto/request/image/product-image-delete-request.dto";
import { UserTokenRequestDto } from "../../../common/authentication/model/dto/request/user-token-request.dto";
import express from "express";

export interface ProductService {
  createProductMainImages(userTokenRequestDto: UserTokenRequestDto, mainImage: Express.Multer.File): Promise<DefaultResponse<{ imageUrl: string }>>;

  createProduct(userTokenRequestDto: UserTokenRequestDto, productEditRequestDto: ProductEditRequestDto): Promise<DefaultResponse<number>>;

  createProductAdditionalImages(
    userTokenRequestDto: UserTokenRequestDto,
    additionalImages: Array<Express.Multer.File>,
    productId: string,
  ): Promise<DefaultResponse<ProductEditImageResponseDto>>;

  createProductDetailImages(
    userTokenRequestDto: UserTokenRequestDto,
    detailImages: Array<Express.Multer.File>,
    productId: string,
  ): Promise<DefaultResponse<ProductEditImageResponseDto>>;

  getProductList(
    userTokenRequestDto: UserTokenRequestDto,
    productSearchRequestDto: ProductSearchRequestDto,
  ): Promise<DefaultResponse<ProductListResponseDto>>;

  getProductDetail(userTokenRequestDto: UserTokenRequestDto, productId: number): Promise<DefaultResponse<ProductDetailResponseDto>>;

  viewImage(userTokenRequestDto: UserTokenRequestDto, urn: string, response: express.Response): Promise<DefaultResponse<void>>;

  deleteProductMainImages(
    userTokenRequestDto: UserTokenRequestDto,
    productCheckedIdRequestDto: ProductCheckedIdRequestDto,
  ): Promise<DefaultResponse<void>>;

  updateProduct(userTokenRequestDto: UserTokenRequestDto, productUpdateRequestDto: ProductUpdateRequestDto): Promise<DefaultResponse<number>>;

  deleteProductAdditionalImages(
    userTokenRequestDto: UserTokenRequestDto,
    productImageDeleteRequestDto: ProductImageDeleteRequestDto,
  ): Promise<DefaultResponse<{ deleteTarget: { url: string[] } }>>;

  deleteProductDetailImages(
    userTokenRequestDto: UserTokenRequestDto,
    productImageDeleteRequestDto: ProductImageDeleteRequestDto,
  ): Promise<DefaultResponse<{ deleteTarget: { url: string[] } }>>;

  deleteProduct(userTokenRequestDto: UserTokenRequestDto, productCheckedIdRequestDto: ProductCheckedIdRequestDto): Promise<DefaultResponse<number>>;

  restoreProduct(userTokenRequestDto: UserTokenRequestDto, productCheckedIdRequestDto: ProductCheckedIdRequestDto): Promise<DefaultResponse<number>>;
}
