import { DefaultResponse } from "../../../common/constant/default.response";
import { ProductEditRequestDto } from "../model/dto/request/product-edit.request.dto";
import { ProductEditImageResponseDto } from "../model/dto/response/image/product-edit-image-response.dto";
import { ProductSearchRequestDto } from "../model/dto/request/product-search.request.dto";
import { ProductListResponseDto } from "../model/dto/response/product-list.response.dto";
import { ProductDetailResponseDto } from "../model/dto/response/product-detail.response.dto";
import { ProductUpdateRequestDto } from "../model/dto/request/product-update.request.dto";
import { ProductCheckedIdRequestDto } from "../model/dto/request/common/product-checked-id.request.dto";
import { ProductImageDeleteRequestDto } from "../model/dto/request/image/product-image-delete-request.dto";

export interface ProductService {
  createProductMainImages(mainImage: Express.Multer.File): Promise<DefaultResponse<{ imageUrl: string }>>;

  createProduct(productEditRequestDto: ProductEditRequestDto): Promise<DefaultResponse<number>>;

  createProductAdditionalImages(
    additionalImages: Array<Express.Multer.File>,
    productId: string,
  ): Promise<DefaultResponse<ProductEditImageResponseDto>>;

  createProductDetailImages(detailImages: Array<Express.Multer.File>, productId: string): Promise<DefaultResponse<ProductEditImageResponseDto>>;

  getProductList(productSearchRequestDto: ProductSearchRequestDto): Promise<DefaultResponse<ProductListResponseDto>>;

  getProductDetail(productId: number): Promise<DefaultResponse<ProductDetailResponseDto>>;

  deleteProductMainImages(productCheckedIdRequestDto: ProductCheckedIdRequestDto): Promise<DefaultResponse<void>>;

  updateProduct(productUpdateRequestDto: ProductUpdateRequestDto): Promise<DefaultResponse<number>>;

  deleteProductAdditionalImages(
    productImageDeleteRequestDto: ProductImageDeleteRequestDto,
  ): Promise<DefaultResponse<{ deleteTarget: { url: string[] } }>>;

  deleteProductDetailImages(
    productImageDeleteRequestDto: ProductImageDeleteRequestDto,
  ): Promise<DefaultResponse<{ deleteTarget: { url: string[] } }>>;
}
