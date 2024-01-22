import { ProductService } from "./product.service";
import { BadRequestException, HttpStatus, Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProductEditRequestDto } from "../model/dto/request/product-edit.request.dto";
import { DefaultResponse } from "../../../common/constant/default.response";
import { Product } from "../model/entity/product.entity";
import { ProductAdditionalImage } from "../model/entity/product-additional-image.entity";
import configuration from "../../../../../common/config/environment/configuration";
import { ProductEditImageResponseDto } from "../model/dto/response/product-edit-image-response.dto";
import { ProductImageRequestDto } from "../model/dto/request/product-image.request.dto";
import { ProductDetailImage } from "../model/entity/product-detail-image.entity";

@Injectable()
export class ProductServiceImpl implements ProductService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(ProductAdditionalImage) private productAdditionalImageRepository: Repository<ProductAdditionalImage>,
    @InjectRepository(ProductDetailImage) private productDetailImageRepository: Repository<ProductDetailImage>,
  ) {}

  async createProductMainImages(mainImage: Express.Multer.File): Promise<DefaultResponse<{ imageUrl: string }>> {
    if (!mainImage) {
      throw new BadRequestException({ statusCode: 400, message: "업로드할 파일을 확인해 주세요." });
    }

    const imageContent = {
      imageUrl: `${configuration().server.url}:${configuration().server.port}/product/images/main/${mainImage.filename}`,
    };

    return DefaultResponse.responseWithData(HttpStatus.OK, "작업 성공!", imageContent);
  }

  async createProductAdditionalImages(
    additionalImages: Array<Express.Multer.File>,
    productId: string,
  ): Promise<DefaultResponse<ProductEditImageResponseDto>> {
    if (!productId || !additionalImages || additionalImages.length === 0) {
      throw new BadRequestException({ statusCode: 400, message: "업로드할 파일을 확인해 주세요." });
    }

    return DefaultResponse.responseWithData(
      HttpStatus.OK,
      "작업 성공!",
      new ProductEditImageResponseDto(await this.imageStorageProcessors(parseInt(productId["productId"]), additionalImages, "additional")),
    );
  }

  async createProductDetailImages(
    detailImages: Array<Express.Multer.File>,
    productId: string,
  ): Promise<DefaultResponse<ProductEditImageResponseDto>> {
    if (!productId || !detailImages || detailImages.length === 0) {
      throw new BadRequestException({ statusCode: 400, message: "업로드할 파일을 확인해 주세요." });
    }

    return DefaultResponse.responseWithData(
      HttpStatus.OK,
      "작업 성공!",
      new ProductEditImageResponseDto(await this.imageStorageProcessors(parseInt(productId["productId"]), detailImages, "detail")),
    );
  }

  async createProduct(productEditRequestDto: ProductEditRequestDto): Promise<DefaultResponse<number>> {
    console.log("createProduct()-productEditRequestDto 값: ");
    console.log(productEditRequestDto);

    if (!productEditRequestDto) {
      throw new BadRequestException({ statusCode: 400, message: "상품 정보를 확인해 주세요." });
    }

    const product = await this.productRepository.save(productEditRequestDto.toEntity(productEditRequestDto));

    console.log("createProduct()-product 값: ");
    console.log(product);

    if (!product) {
      throw new InternalServerErrorException({ statusCode: 500, message: "상품 등록에 실패하였어요." });
    }

    return DefaultResponse.responseWithData(HttpStatus.OK, "작업 성공!", product.id);
  }

  async imageStorageProcessors(productId: number, images: Array<Express.Multer.File>, category: string): Promise<any[]> {
    if (!images || images.length === 0) {
      throw new BadRequestException({ statusCode: 400, message: "업로드할 파일을 확인해 주세요." });
    }

    const result: any[] = [];

    for (const image of images) {
      // let imageContent: Record<string, unknown> = {};

      if (category === "additional") {
        const saveImage: ProductAdditionalImage = await this.productAdditionalImageRepository.save(
          ProductImageRequestDto.toAdditionalImageEntity(
            productId,
            category,
            `${configuration().server.url}:${configuration().server.port}/product/images/additional/${image.filename}`,
          ),
        );

        if (!saveImage) {
          throw new InternalServerErrorException({ statusCode: 500, message: "상품 추가 이미지 등록에 실패하였어요. 관리자에게 문의해 주세요." });
        }

        const imageContent = {
          imageId: saveImage.id,
          imageCategory: saveImage.category,
          imageUrl: saveImage.url,
        };

        result.push(imageContent);
      } else {
        const saveImage: ProductDetailImage = await this.productDetailImageRepository.save(
          ProductImageRequestDto.toDetailImageEntity(
            productId,
            category,
            `${configuration().server.url}:${configuration().server.port}/product/images/detail/${image.filename}`,
          ),
        );

        if (!saveImage) {
          throw new InternalServerErrorException({ statusCode: 500, message: "상품 추가 이미지 등록에 실패하였어요. 관리자에게 문의해 주세요." });
        }

        const imageContent = {
          imageId: saveImage.id,
          imageCategory: saveImage.category,
          imageUrl: saveImage.url,
        };

        result.push(imageContent);
      }
    }

    return result;
  }
}
