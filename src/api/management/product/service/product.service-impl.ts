import { ProductService } from "./product.service";
import { BadRequestException, HttpStatus, Inject, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProductEditRequestDto } from "../model/dto/request/product-edit.request.dto";
import { DefaultResponse } from "../../../common/constant/default.response";
import { Product } from "../model/entity/product.entity";
import { ProductAdditionalImage } from "../model/entity/product-additional-image.entity";
import configuration from "../../../../../common/config/environment/configuration";
import { ProductEditImageResponseDto } from "../model/dto/response/image/product-edit-image-response.dto";
import { ProductImageRequestDto } from "../model/dto/request/image/product-image.request.dto";
import { ProductDetailImage } from "../model/entity/product-detail-image.entity";
import { ProductSearchRequestDto } from "../model/dto/request/product-search.request.dto";
import { ProductListResponseDto } from "../model/dto/response/product-list.response.dto";
import { ProductRepository } from "../repository/product.repository";
import { Page } from "../../../common/constant/page";
import { ProductDetailResponseDto } from "../model/dto/response/product-detail.response.dto";
import * as fs from "fs";
import { resolve } from "path";

@Injectable()
export class ProductServiceImpl implements ProductService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @Inject("ProductQueryBuilderRepository") private readonly productQueryBuilderRepository: ProductRepository,
    @InjectRepository(ProductAdditionalImage) private productAdditionalImageRepository: Repository<ProductAdditionalImage>,
    @InjectRepository(ProductDetailImage) private productDetailImageRepository: Repository<ProductDetailImage>,
  ) {}

  async createProductMainImages(mainImage: Express.Multer.File): Promise<DefaultResponse<{ imageUrl: string }>> {
    if (!mainImage) {
      throw new BadRequestException({ statusCode: 400, message: "업로드할 파일을 확인해 주세요." });
    }

    const imageContent = {
      imageUrl: `${configuration().server.url}:${configuration().server.port}/product/images/main/${mainImage[0].filename}`,
    };

    return DefaultResponse.responseWithData(HttpStatus.OK, "작업 성공!", imageContent);
  }

  async createProduct(productEditRequestDto: ProductEditRequestDto): Promise<DefaultResponse<number>> {
    if (!productEditRequestDto) {
      throw new BadRequestException({ statusCode: 400, message: "상품 정보를 확인해 주세요." });
    }

    const product = await this.productRepository.save(productEditRequestDto.toEntity(productEditRequestDto));

    if (!product) {
      throw new InternalServerErrorException({ statusCode: 500, message: "상품 등록에 실패하였어요." });
    }

    return DefaultResponse.responseWithData(HttpStatus.OK, "작업 성공!", product.productId);
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

  async imageStorageProcessors(productId: number, images: Array<Express.Multer.File>, category: string): Promise<any[]> {
    if (!images || images.length === 0) {
      throw new BadRequestException({ statusCode: 400, message: "업로드할 파일을 확인해 주세요." });
    }

    const result: any[] = [];

    for (const image of images) {
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

  async getProductList(productSearchRequestDto: ProductSearchRequestDto): Promise<DefaultResponse<ProductListResponseDto>> {
    const findByProducts: [Product[], number] = await this.productQueryBuilderRepository.dynamicQuerySearchAndPagingByDto(productSearchRequestDto);

    if (!findByProducts || findByProducts[0].length === 0) {
      throw new BadRequestException({ statusCode: 404, message: "상품이 등록되지 않았어요. 상품 정보를 확인해 주세요." });
    }

    return DefaultResponse.responseWithPaginationAndData(
      HttpStatus.OK,
      "작업 성공!",
      new Page(
        findByProducts[0].length,
        findByProducts[1],
        findByProducts[0].map((product: Product) => new ProductListResponseDto(product)),
      ),
    );
  }

  async getProductDetail(productId: number): Promise<DefaultResponse<ProductDetailResponseDto>> {
    if (!productId || productId <= 0) {
      throw new BadRequestException({ statusCode: 400, message: "상품 정보를 확인해 주세요." });
    }

    const product: Product = await this.productQueryBuilderRepository.findByIdAndJoinOneThing(productId);

    if (!product) {
      throw new BadRequestException({ statusCode: 404, message: "상품 조회에 실패하였어요. 상품 정보를 확인해 주세요." });
    }

    return DefaultResponse.responseWithData(HttpStatus.OK, "작업 성공!", new ProductDetailResponseDto(product));
  }

  async updateProductMainImages(productId: string, mainImage: Express.Multer.File): Promise<DefaultResponse<{ imageUrl: string }>> {
    if (!productId || !mainImage) {
      throw new BadRequestException({ statusCode: 400, message: "수정할 파일을 확인해 주세요." });
    }

    const product = await this.productQueryBuilderRepository.findByIdAndJoinOneThing(parseInt(productId["productId"]));

    if ((await this.productQueryBuilderRepository.findByIdAndJoinOneThing(parseInt(productId["productId"]))) === null) {
      throw new NotFoundException({ statusCode: 404, message: "상품 정보를 확인해 주세요." });
    }

    await this.productRepository.update(productId, {
      productMainImageUrl: `${configuration().server.url}:${configuration().server.port}/product/images/main/${mainImage[0].filename}`,
    });

    this.deleteOriginalImages("main", product.productMainImageUrl);

    return DefaultResponse.responseWithData(HttpStatus.OK, "작업 성공!", {
      imageUrl: `${configuration().server.url}:${configuration().server.port}/product/images/main/${mainImage[0].filename}`,
    });
  }

  private deleteOriginalImages(imageDivision: string, productMainImageUrl: string): void {
    const directoryPath = productMainImageUrl.replace(/:\d+/, "");
    const imageName = directoryPath.match(/\/([^\/]+)$/)[1];
    let originalImageDirectoryPath: string;

    if (imageDivision === "main") {
      originalImageDirectoryPath = "./local/storage/product/main/images/" + imageName;
    } else if (imageDivision === "additional") {
      originalImageDirectoryPath = "./local/storage/product/additional/images/" + imageName;
    } else {
      originalImageDirectoryPath = "./local/storage/product/detail/images/" + imageName;
    }

    if (fs.existsSync(originalImageDirectoryPath)) {
      fs.unlink(originalImageDirectoryPath, (error) => {
        if (error) {
          throw new InternalServerErrorException({ statusCode: 500, message: "파일 삭제에 실패하였어요. 관리자에게 문의해 주세요." });
        } else {
          resolve();
        }
      });
    } else {
      // 파일이 이미 삭제 되었거나, 존재하지 않으면 계속 진행
      resolve();

      throw new InternalServerErrorException({ statusCode: 500, message: "삭제 대상 파일이 존재하지 않아요. 관리자에게 문의해 주세요." });
    }
  }
}
