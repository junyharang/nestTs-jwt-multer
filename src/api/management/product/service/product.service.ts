import { DefaultResponse } from "../../../common/constant/default.response";
import { ProductEditRequestDto } from "../model/dto/request/product-edit.request.dto";
import { ProductEditImageResponseDto } from "../model/dto/response/product-edit-image-response.dto";

export interface ProductService {
  createProduct(productEditRequestDto: ProductEditRequestDto): Promise<DefaultResponse<number>>;

  createProductMainImages(mainImage: Express.Multer.File): Promise<DefaultResponse<{ imageUrl: string }>>;

  createProductAdditionalImages(
    additionalImages: Array<Express.Multer.File>,
    productId: string,
  ): Promise<DefaultResponse<ProductEditImageResponseDto>>;

  createProductDetailImages(detailImages: Array<Express.Multer.File>, productId: string): Promise<DefaultResponse<ProductEditImageResponseDto>>;
}
