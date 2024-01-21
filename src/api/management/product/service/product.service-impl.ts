import { ProductService } from "./product.service";
import { BadRequestException, HttpStatus, Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProductEditRequestDto } from "../model/dto/request/product-edit.request.dto";
import { DefaultResponse } from "../../../common/constant/default.response";
import { Product } from "../model/entity/product.entity";
import { ProductImage } from "../model/entity/product-image.entity";
import configuration from "../../../../../common/config/environment/configuration";
import { ProductEditImageResponseDto } from "../model/dto/response/product-edit-image-response.dto";
import { ProductImageRequestDto } from "../model/dto/request/product-image.request.dto";

@Injectable()
export class ProductServiceImpl implements ProductService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(ProductImage) private productImageRepository: Repository<ProductImage>,
  ) {}

  async createProductMainImages(mainImages: Array<Express.Multer.File>): Promise<DefaultResponse<ProductEditImageResponseDto>> {
    if (!mainImages || mainImages.length === 0) {
      throw new BadRequestException({ statusCode: 400, message: "업로드할 파일을 확인해 주세요." });
    }

    return DefaultResponse.responseWithData(
      HttpStatus.OK,
      "작업 성공!",
      new ProductEditImageResponseDto(await this.imageStorageProcessors(mainImages, "main")),
    );
  }

  async createProductAdditionalImages(additionalImages: Array<Express.Multer.File>): Promise<DefaultResponse<ProductEditImageResponseDto>> {
    if (!additionalImages || additionalImages.length === 0) {
      throw new BadRequestException({ statusCode: 400, message: "업로드할 파일을 확인해 주세요." });
    }

    return DefaultResponse.responseWithData(
      HttpStatus.OK,
      "작업 성공!",
      new ProductEditImageResponseDto(await this.imageStorageProcessors(additionalImages, "additional")),
    );
  }

  async createProductDetailImages(detailImages: Array<Express.Multer.File>): Promise<DefaultResponse<ProductEditImageResponseDto>> {
    if (!detailImages || detailImages.length === 0) {
      throw new BadRequestException({ statusCode: 400, message: "업로드할 파일을 확인해 주세요." });
    }

    return DefaultResponse.responseWithData(
      HttpStatus.OK,
      "작업 성공!",
      new ProductEditImageResponseDto(await this.imageStorageProcessors(detailImages, "detail")),
    );
  }

  async createProduct(productEditRequestDto: ProductEditRequestDto): Promise<DefaultResponse<number>> {
    if (!productEditRequestDto) {
      throw new BadRequestException({ statusCode: 400, message: "상품 정보를 확인해 주세요." });
    }

    const product = await this.productRepository.save(productEditRequestDto.toEntity(productEditRequestDto));

    if (!product) {
      throw new InternalServerErrorException({ statusCode: 500, message: "상품 등록에 실패하였어요." });
    }

    return DefaultResponse.responseWithData(HttpStatus.OK, "작업 성공!", product.id);
  }

  async imageStorageProcessors(images: Array<Express.Multer.File>, category: string): Promise<any[]> {
    if (!images || images.length === 0) {
      throw new BadRequestException({ statusCode: 400, message: "업로드할 파일을 확인해 주세요." });
    }

    const result: any[] = [];

    for (const image of images) {
      const saveImage = await this.productImageRepository.save(
        ProductImageRequestDto.toEntity(category, `${configuration().server.url}:${configuration().server.port}/product/images/${image.filename}`),
      );

      if (!saveImage) {
        throw new InternalServerErrorException({ statusCode: 500, message: "상품 이미지 등록에 실패하였어요." });
      }

      const imageContent = {
        imageId: saveImage.id,
        imageCategory: saveImage.category,
        imageUrl: saveImage.url,
      };

      result.push(imageContent);
    }

    return result;
  }
}
