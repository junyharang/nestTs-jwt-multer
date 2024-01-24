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
import { ProductUpdateRequestDto } from "../model/dto/request/product-update.request.dto";
import { User } from "../../../common/user/model/entity/user.entity";
import { ProductCheckedIdRequestDto } from "../model/dto/request/common/product-checked-id.request.dto";
import { Role } from "../../../common/user/model/entity/role";
import { ProductImageDeleteRequestDto } from "../model/dto/request/image/product-image-delete-request.dto";
import { UserTokenRequestDto } from "../../../common/authentication/model/dto/request/user-token-request.dto";

@Injectable()
export class ProductServiceImpl implements ProductService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @Inject("ProductQueryBuilderRepository") private readonly productQueryBuilderRepository: ProductRepository,
    @InjectRepository(ProductAdditionalImage) private productAdditionalImageRepository: Repository<ProductAdditionalImage>,
    @InjectRepository(ProductDetailImage) private productDetailImageRepository: Repository<ProductDetailImage>,
  ) {}

  async createProductMainImages(
    userTokenRequestDto: UserTokenRequestDto,
    mainImage: Express.Multer.File,
  ): Promise<DefaultResponse<{ imageUrl: string }>> {
    if (!userTokenRequestDto.email) {
      throw new NotFoundException({ statusCode: 404, message: "찾을 수 없어요." });
    }

    const user = await this.userRepository.findOne({ where: { email: userTokenRequestDto.email } });

    if (!user || user.userRole !== Role.ADMIN) {
      throw new NotFoundException({ statusCode: 404, message: "찾을 수 없어요." });
    }

    if (!mainImage) {
      throw new BadRequestException({ statusCode: 400, message: "업로드할 파일을 확인해 주세요." });
    }

    const imageContent = {
      imageUrl: `${configuration().server.url}:${configuration().server.port}/product/images/main/${mainImage[0].filename}`,
    };

    return DefaultResponse.responseWithData(HttpStatus.OK, "작업 성공!", imageContent);
  }

  async createProduct(userTokenRequestDto: UserTokenRequestDto, productEditRequestDto: ProductEditRequestDto): Promise<DefaultResponse<number>> {
    if (!userTokenRequestDto.email) {
      throw new NotFoundException({ statusCode: 404, message: "찾을 수 없어요." });
    }

    const user = await this.userRepository.findOne({ where: { email: userTokenRequestDto.email } });

    if (!user || user.userRole !== Role.ADMIN) {
      throw new NotFoundException({ statusCode: 404, message: "찾을 수 없어요." });
    }

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
    userTokenRequestDto: UserTokenRequestDto,
    additionalImages: Array<Express.Multer.File>,
    productId: string,
  ): Promise<DefaultResponse<ProductEditImageResponseDto>> {
    const user = await this.userRepository.findOne({ where: { email: userTokenRequestDto.email } });

    if (!user || user.userRole !== Role.ADMIN) {
      throw new NotFoundException({ statusCode: 404, message: "찾을 수 없어요." });
    }

    if (!productId || !additionalImages || additionalImages.length === 0) {
      throw new BadRequestException({ statusCode: 400, message: "업로드할 파일을 확인해 주세요." });
    }

    return DefaultResponse.responseWithData(
      HttpStatus.OK,
      "작업 성공!",
      new ProductEditImageResponseDto(await this.imageCreatedStorageProcessors(parseInt(productId["productId"]), additionalImages, "additional")),
    );
  }

  async createProductDetailImages(
    userTokenRequestDto: UserTokenRequestDto,
    detailImages: Array<Express.Multer.File>,
    productId: string,
  ): Promise<DefaultResponse<ProductEditImageResponseDto>> {
    if (!userTokenRequestDto.email) {
      throw new NotFoundException({ statusCode: 404, message: "찾을 수 없어요." });
    }

    const user = await this.userRepository.findOne({ where: { email: userTokenRequestDto.email } });

    if (!user || user.userRole !== Role.ADMIN) {
      throw new NotFoundException({ statusCode: 404, message: "찾을 수 없어요." });
    }

    if (!productId || !detailImages || detailImages.length === 0) {
      throw new BadRequestException({ statusCode: 400, message: "업로드할 파일을 확인해 주세요." });
    }

    return DefaultResponse.responseWithData(
      HttpStatus.OK,
      "작업 성공!",
      new ProductEditImageResponseDto(await this.imageCreatedStorageProcessors(parseInt(productId["productId"]), detailImages, "detail")),
    );
  }

  async getProductList(
    userTokenRequestDto: UserTokenRequestDto,
    productSearchRequestDto: ProductSearchRequestDto,
  ): Promise<DefaultResponse<ProductListResponseDto>> {
    if (!userTokenRequestDto.email) {
      throw new NotFoundException({ statusCode: 404, message: "찾을 수 없어요." });
    }

    const user = await this.userRepository.findOne({ where: { email: userTokenRequestDto.email } });

    if (!user || user.userRole !== Role.ADMIN) {
      throw new NotFoundException({ statusCode: 404, message: "찾을 수 없어요." });
    }

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

  async getProductDetail(userTokenRequestDto: UserTokenRequestDto, productId: number): Promise<DefaultResponse<ProductDetailResponseDto>> {
    if (!userTokenRequestDto || !productId || productId <= 0) {
      throw new BadRequestException({ statusCode: 400, message: "상품 정보를 확인해 주세요." });
    }

    const user = await this.userRepository.findOne({ where: { email: userTokenRequestDto.email } });

    if (!user || user.userRole !== Role.ADMIN) {
      throw new NotFoundException({ statusCode: 404, message: "찾을 수 없어요." });
    }

    const product: Product = await this.productQueryBuilderRepository.findByIdAndJoinOneThing(productId);

    if (!product) {
      throw new BadRequestException({ statusCode: 404, message: "상품 조회에 실패하였어요. 상품 정보를 확인해 주세요." });
    }

    return DefaultResponse.responseWithData(HttpStatus.OK, "작업 성공!", new ProductDetailResponseDto(product));
  }

  async deleteProductMainImages(
    userTokenRequestDto: UserTokenRequestDto,
    productCheckedIdRequestDto: ProductCheckedIdRequestDto,
  ): Promise<DefaultResponse<void>> {
    if (!userTokenRequestDto.email) {
      throw new NotFoundException({ statusCode: 404, message: "찾을 수 없어요." });
    }

    const user = await this.userRepository.findOne({ where: { email: userTokenRequestDto.email } });

    if (!user || user.userRole !== Role.ADMIN) {
      throw new NotFoundException({ statusCode: 404, message: "찾을 수 없어요." });
    }

    const product = await this.productQueryBuilderRepository.findByIdAndJoinOneThing(productCheckedIdRequestDto.productId);

    if (product === null) {
      throw new NotFoundException({ statusCode: 404, message: "상품 정보를 확인해 주세요." });
    }

    try {
      await this.productRepository.update(productCheckedIdRequestDto.productId, {
        productMainImageUrl: null,
      });
    } catch (error) {
      throw new InternalServerErrorException({ statusCode: 500, message: "상품 메인 이미지 삭제에 실패하였어요. 관리자에게 문의해 주세요." });
    }

    this.deleteOriginalImages("main", product.productMainImageUrl);

    return DefaultResponse.response(HttpStatus.OK, "작업 성공!");
  }

  async updateProduct(userTokenRequestDto: UserTokenRequestDto, productUpdateRequestDto: ProductUpdateRequestDto): Promise<DefaultResponse<number>> {
    if (!productUpdateRequestDto.userId) {
      throw new NotFoundException({ statusCode: 404, message: "찾을 수 없어요." });
    }

    if (!userTokenRequestDto.email) {
      throw new NotFoundException({ statusCode: 404, message: "찾을 수 없어요." });
    }

    const user: User = await this.userRepository.findOne({ where: { email: userTokenRequestDto.email } });

    if (!user || user.userRole !== Role.ADMIN) {
      throw new NotFoundException({ statusCode: 404, message: "찾을 수 없어요." });
    }

    if (!productUpdateRequestDto) {
      throw new BadRequestException({ statusCode: 400, message: "상품 정보를 확인해 주세요." });
    }

    const product: Product = await this.productQueryBuilderRepository.findByIdAndJoinOneThing(productUpdateRequestDto.productId);

    if (product === null) {
      throw new NotFoundException({ statusCode: 404, message: "상품 정보를 확인해 주세요." });
    }

    try {
      if (productUpdateRequestDto.mainImageUrl) {
        await this.productRepository.update(productUpdateRequestDto.productId, {
          productName: productUpdateRequestDto.name,
          productCount: productUpdateRequestDto.count,
          productPrice: productUpdateRequestDto.price,
          productContent: productUpdateRequestDto.content,
          productMainImageUrl: productUpdateRequestDto.mainImageUrl,
        });
      } else {
        await this.productRepository.update(productUpdateRequestDto.productId, {
          productName: productUpdateRequestDto.name,
          productCount: productUpdateRequestDto.count,
          productPrice: productUpdateRequestDto.price,
          productContent: productUpdateRequestDto.content,
        });
      }
    } catch (error) {
      throw new InternalServerErrorException({ statusCode: 500, message: "상품 수정에 실패하였어요. 관리자에게 문의해 주세요." });
    }

    return DefaultResponse.responseWithData(HttpStatus.OK, "작업 성공!", product.productId);
  }

  async deleteProductAdditionalImages(
    userTokenRequestDto: UserTokenRequestDto,
    productImageDeleteRequestDto: ProductImageDeleteRequestDto,
  ): Promise<DefaultResponse<{ deleteTarget: { url: string[] } }>> {
    if (!productImageDeleteRequestDto) {
      throw new BadRequestException({ statusCode: 400, message: "요청을 확인해 주세요." });
    }

    if (!userTokenRequestDto.email) {
      throw new NotFoundException({ statusCode: 404, message: "찾을 수 없어요." });
    }

    const user: User = await this.userRepository.findOne({ where: { email: userTokenRequestDto.email } });

    if (!user || user.userRole !== Role.ADMIN) {
      throw new NotFoundException({ statusCode: 404, message: "찾을 수 없어요." });
    }

    if (!productImageDeleteRequestDto.productId) {
      throw new BadRequestException({ statusCode: 400, message: "상품 정보를 확인해 주세요." });
    }

    const product: Product = await this.productQueryBuilderRepository.findByIdAndJoinOneThing(productImageDeleteRequestDto.productId);

    if (!product) {
      throw new NotFoundException({ statusCode: 404, message: "상품 정보를 확인해 주세요." });
    }

    const url: string[] = [];

    for (const imageUrl of productImageDeleteRequestDto.arrayUrl) {
      const deleteTarget = await this.productAdditionalImageRepository.findOne({ where: { url: imageUrl } });

      if (!deleteTarget) {
        throw new NotFoundException({ statusCode: 404, message: "삭제 대상을 찾을 수 없어요." });
      }

      try {
        await this.productAdditionalImageRepository.delete(deleteTarget.id);
      } catch (error) {
        throw new InternalServerErrorException({ statusCode: 500, message: "상품 추가 이미지 삭제에 실패하였어요. 관리자에게 문의해 주세요." });
      }

      this.deleteOriginalImages("additional", imageUrl);

      url.push(imageUrl);
    }

    return DefaultResponse.responseWithData(HttpStatus.OK, "작업 성공!", { deleteTarget: { url: url } });
  }

  async deleteProductDetailImages(
    userTokenRequestDto: UserTokenRequestDto,
    productImageDeleteRequestDto: ProductImageDeleteRequestDto,
  ): Promise<DefaultResponse<{ deleteTarget: { url: string[] } }>> {
    if (!userTokenRequestDto) {
      throw new NotFoundException({ statusCode: 404, message: "찾을 수 없어요." });
    }

    if (!userTokenRequestDto.email) {
      throw new NotFoundException({ statusCode: 404, message: "찾을 수 없어요." });
    }

    const user: User = await this.userRepository.findOne({ where: { email: userTokenRequestDto.email } });

    if (!user || user.userRole !== Role.ADMIN) {
      throw new NotFoundException({ statusCode: 404, message: "찾을 수 없어요." });
    }

    if (!productImageDeleteRequestDto) {
      throw new BadRequestException({ statusCode: 400, message: "요청을 확인해 주세요." });
    }

    if (!productImageDeleteRequestDto.productId) {
      throw new BadRequestException({ statusCode: 400, message: "상품 정보를 확인해 주세요." });
    }

    const product: Product = await this.productQueryBuilderRepository.findByIdAndJoinOneThing(productImageDeleteRequestDto.productId);

    if (!product) {
      throw new NotFoundException({ statusCode: 404, message: "상품 정보를 확인해 주세요." });
    }

    const url: string[] = [];

    for (const imageUrl of productImageDeleteRequestDto.arrayUrl) {
      const deleteTarget = await this.productDetailImageRepository.findOne({ where: { url: imageUrl } });

      if (!deleteTarget) {
        throw new NotFoundException({ statusCode: 404, message: "삭제 대상을 찾을 수 없어요." });
      }

      try {
        await this.productDetailImageRepository.delete(deleteTarget.id);
      } catch (error) {
        throw new InternalServerErrorException({ statusCode: 500, message: "상품 상세 이미지 삭제에 실패하였어요. 관리자에게 문의해 주세요." });
      }

      this.deleteOriginalImages("detail", imageUrl);

      url.push(imageUrl);
    }

    return DefaultResponse.responseWithData(HttpStatus.OK, "작업 성공!", { deleteTarget: { url: url } });
  }

  async deleteProduct(
    userTokenRequestDto: UserTokenRequestDto,
    productCheckedIdRequestDto: ProductCheckedIdRequestDto,
  ): Promise<DefaultResponse<number>> {
    if (!productCheckedIdRequestDto) {
      throw new NotFoundException({ statusCode: 404, message: "찾을 수 없어요." });
    }

    if (!userTokenRequestDto.email) {
      throw new NotFoundException({ statusCode: 404, message: "찾을 수 없어요." });
    }

    const user = await this.userRepository.findOne({ where: { email: userTokenRequestDto.email } });

    if (!user || user.userRole !== Role.ADMIN) {
      throw new NotFoundException({ statusCode: 404, message: "찾을 수 없어요." });
    }

    if (!productCheckedIdRequestDto.productId) {
      throw new BadRequestException({ statusCode: 400, message: "상품 정보를 확인해 주세요." });
    }

    const product: Product = await this.productQueryBuilderRepository.findByIdAndJoinOneThing(productCheckedIdRequestDto.productId);

    if (!product) {
      throw new NotFoundException({ statusCode: 404, message: "상품 정보를 확인해 주세요." });
    }

    try {
      await this.productRepository.softDelete(productCheckedIdRequestDto.productId);

      return DefaultResponse.responseWithData(HttpStatus.OK, "작업 성공!", product.productId);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException({ statusCode: 500, message: "상품 삭제에 실패하였어요. 관리자에게 문의해 주세요." });
    }
  }

  async restoreProduct(
    userTokenRequestDto: UserTokenRequestDto,
    productCheckedIdRequestDto: ProductCheckedIdRequestDto,
  ): Promise<DefaultResponse<number>> {
    if (!productCheckedIdRequestDto) {
      throw new NotFoundException({ statusCode: 404, message: "찾을 수 없어요." });
    }

    if (!userTokenRequestDto.email) {
      throw new NotFoundException({ statusCode: 404, message: "찾을 수 없어요." });
    }

    const user = await this.userRepository.findOne({ where: { email: userTokenRequestDto.email } });

    if (!user || user.userRole !== Role.ADMIN) {
      throw new NotFoundException({ statusCode: 404, message: "찾을 수 없어요." });
    }

    if (!productCheckedIdRequestDto.productId) {
      throw new BadRequestException({ statusCode: 400, message: "상품 정보를 확인해 주세요." });
    }

    const product: Product = await this.productRepository.findOne({
      where: { productId: productCheckedIdRequestDto.productId },
      withDeleted: true,
    });

    if (!product) {
      throw new NotFoundException({ statusCode: 404, message: "상품 정보를 확인해 주세요." });
    }

    try {
      await this.productRepository.restore(productCheckedIdRequestDto.productId);

      return DefaultResponse.responseWithData(HttpStatus.OK, "작업 성공!", product.productId);
    } catch (error) {
      throw new InternalServerErrorException({ statusCode: 500, message: "상품 복구에 실패하였어요. 관리자에게 문의해 주세요." });
    }
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

  async imageCreatedStorageProcessors(productId: number, images: Array<Express.Multer.File>, category: string): Promise<any[]> {
    if (!images || images.length === 0) {
      throw new BadRequestException({ statusCode: 400, message: "업로드할 파일을 확인해 주세요." });
    }

    const result: any[] = [];

    for (const image of images) {
      if (category === "additional") {
        const saveImage: ProductAdditionalImage = await this.productAdditionalImageRepository.save(
          ProductImageRequestDto.toAdditionalImageEntity(
            productId,
            `${configuration().server.url}:${configuration().server.port}/product/images/additional/${image.filename}`,
          ),
        );

        if (!saveImage) {
          throw new InternalServerErrorException({ statusCode: 500, message: "상품 추가 이미지 등록에 실패하였어요. 관리자에게 문의해 주세요." });
        }

        const imageContent = {
          imageId: saveImage.id,
          imageUrl: saveImage.url,
        };

        result.push(imageContent);
      } else {
        const saveImage: ProductDetailImage = await this.productDetailImageRepository.save(
          ProductImageRequestDto.toDetailImageEntity(
            productId,
            `${configuration().server.url}:${configuration().server.port}/product/images/detail/${image.filename}`,
          ),
        );

        if (!saveImage) {
          throw new InternalServerErrorException({ statusCode: 500, message: "상품 추가 이미지 등록에 실패하였어요. 관리자에게 문의해 주세요." });
        }

        const imageContent = {
          imageId: saveImage.id,
          imageUrl: saveImage.url,
        };

        result.push(imageContent);
      }
    }

    return result;
  }
}
