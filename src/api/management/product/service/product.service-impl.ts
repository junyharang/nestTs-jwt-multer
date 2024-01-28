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
import { ProductUpdateRequestDto } from "../model/dto/request/product-update.request.dto";
import { User } from "../../../common/user/model/entity/user.entity";
import { ProductCheckedIdRequestDto } from "../model/dto/request/common/product-checked-id.request.dto";
import { Role } from "../../../common/user/model/entity/role";
import { ProductImageDeleteRequestDto } from "../model/dto/request/image/product-image-delete-request.dto";
import { UserTokenRequestDto } from "../../../common/authentication/model/dto/request/user-token-request.dto";
import express from "express";
import { FileVerifyUtil } from "../../../../common/util/file.verify.util";
import * as console from "console";
import { FileManagementUtil } from "../../../../common/util/file.management.util";
import { async } from "rxjs";

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
    await this.permissionCheck(userTokenRequestDto);

    if (!mainImage) {
      throw new BadRequestException({ statusCode: 400, message: "업로드할 파일을 확인해 주세요." });
    }

    if (!FileVerifyUtil.singleImageSizeVerify(48, 48, mainImage)) {
      FileManagementUtil.deleteProductOriginalImages(configuration().file.image.upload.storage.path + "main", mainImage[0].filename);
      throw new BadRequestException({ statusCode: 400, message: "이미지 사이즈가 너무 큽니다." });
    }

    const imageContent = {
      imageUrl: `${configuration().server.url}:${configuration().server.port}/product/images/main/${mainImage[0].filename}`,
    };

    return DefaultResponse.responseWithData(HttpStatus.OK, "작업 성공!", imageContent);
  }

  async createResizeProductImages(
    userTokenRequestDto: UserTokenRequestDto,
    imageFile: Express.Multer.File,
    maxWidthPx: number,
    maxHeightPx: number,
  ): Promise<DefaultResponse<{ imageUrl: string }>> {
    await this.permissionCheck(userTokenRequestDto);

    let imageContent: { imageUrl: string } = { imageUrl: "" };

    if (!imageFile) {
      throw new BadRequestException({ statusCode: 400, message: "업로드할 파일을 확인해 주세요." });
    }

    if (imageFile[0].fieldname === "mainImage" && (await FileManagementUtil.singleImageResizing(imageFile, maxWidthPx, maxHeightPx))) {
      imageContent = {
        imageUrl: `${configuration().server.url}:${configuration().server.port}/product/images/main/${imageFile[0].filename}`,
      };
    }

    if (imageFile[0].fieldname === "additionalImage" && (await FileManagementUtil.singleImageResizing(imageFile, maxWidthPx, maxHeightPx))) {
      imageContent = {
        imageUrl: `${configuration().server.url}:${configuration().server.port}/product/images/additional/${imageFile[0].filename}`,
      };
    }

    if (imageFile[0].fieldname === "detailImage" && (await FileManagementUtil.singleImageResizing(imageFile, maxWidthPx, maxHeightPx))) {
      imageContent = {
        imageUrl: `${configuration().server.url}:${configuration().server.port}/product/images/detailImage/${imageFile[0].filename}`,
      };
    }

    return DefaultResponse.responseWithData(HttpStatus.OK, "작업 성공!", imageContent);
  }

  async createProduct(userTokenRequestDto: UserTokenRequestDto, productEditRequestDto: ProductEditRequestDto): Promise<DefaultResponse<number>> {
    await this.permissionCheck(userTokenRequestDto);

    if (!productEditRequestDto) {
      throw new BadRequestException({ statusCode: 400, message: "상품 정보를 확인해 주세요." });
    }

    const requestUser: User = await this.getUserInfo(userTokenRequestDto);

    const product = await this.productRepository.save(productEditRequestDto.toEntity(requestUser, productEditRequestDto));

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
    await this.permissionCheck(userTokenRequestDto);

    if (!productId || !additionalImages || additionalImages.length === 0) {
      throw new BadRequestException({ statusCode: 400, message: "업로드할 파일을 확인해 주세요." });
    }

    const saveSuccessImageContents: { imageId: number; imageUrl: string }[] = [];
    const saveFailImageContents: { imageFileName: string; exceptionContent: { statusCode: number; message: string } }[] = [];

    const imageSizePromises: any[] = additionalImages.map(async (image: Express.Multer.File): Promise<void> => {
      if (!FileVerifyUtil.manyImageSizeVerify(264, 264, image)) {
        FileManagementUtil.deleteProductOriginalImages(configuration().file.image.upload.storage.path + "additional", image.filename);
        saveFailImageContents.push({
          imageFileName: image.filename,
          exceptionContent: { statusCode: 400, message: "이미지 사이즈가 너무 큽니다." },
        });
      } else {
        saveSuccessImageContents.push(await this.imageCreatedStorageProcessors(parseInt(productId["productId"]), image, "additional"));
      }
    });

    // 모든 이미지에 대한 사이즈 체크가 완료되길 기다립니다.
    await Promise.all(imageSizePromises);

    return DefaultResponse.responseWithData(
      HttpStatus.OK,
      "작업 성공!",
      new ProductEditImageResponseDto(saveSuccessImageContents, saveFailImageContents),
    );
  }

  async createProductDetailImages(
    userTokenRequestDto: UserTokenRequestDto,
    detailImages: Array<Express.Multer.File>,
    productId: string,
  ): Promise<DefaultResponse<ProductEditImageResponseDto>> {
    await this.permissionCheck(userTokenRequestDto);

    if (!productId || !detailImages || detailImages.length === 0) {
      throw new BadRequestException({ statusCode: 400, message: "업로드할 파일을 확인해 주세요." });
    }

    const saveSuccessImageContents: { imageId: number; imageUrl: string }[] = [];
    const saveFailImageContents: { imageFileName: string; exceptionContent: { statusCode: number; message: string } }[] = [];

    const imageSizePromises: any[] = detailImages.map(async (image: Express.Multer.File): Promise<void> => {
      if (!FileVerifyUtil.manyImageSizeVerify(1700, 1700, image)) {
        FileManagementUtil.deleteProductOriginalImages(configuration().file.image.upload.storage.path + "detail", image.filename);
        saveFailImageContents.push({
          imageFileName: image.filename,
          exceptionContent: { statusCode: 400, message: "이미지 사이즈가 너무 큽니다." },
        });
      } else {
        saveSuccessImageContents.push(await this.imageCreatedStorageProcessors(parseInt(productId["productId"]), image, "detail"));
      }
    });

    await Promise.all(imageSizePromises);

    return DefaultResponse.responseWithData(
      HttpStatus.OK,
      "작업 성공!",
      new ProductEditImageResponseDto(saveSuccessImageContents, saveFailImageContents),
    );
  }

  async getProductList(
    userTokenRequestDto: UserTokenRequestDto,
    productSearchRequestDto: ProductSearchRequestDto,
  ): Promise<DefaultResponse<ProductListResponseDto>> {
    await this.permissionCheck(userTokenRequestDto);

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
    await this.permissionCheck(userTokenRequestDto);

    if (!userTokenRequestDto || !productId || productId <= 0) {
      throw new BadRequestException({ statusCode: 400, message: "상품 정보를 확인해 주세요." });
    }

    const product: Product = await this.productQueryBuilderRepository.findByIdAndJoinOneThing(productId);

    if (!product) {
      throw new BadRequestException({ statusCode: 404, message: "상품 조회에 실패하였어요. 상품 정보를 확인해 주세요." });
    }

    return DefaultResponse.responseWithData(HttpStatus.OK, "작업 성공!", new ProductDetailResponseDto(product));
  }

  async viewImage(userTokenRequestDto: UserTokenRequestDto, urn: string, response: express.Response): Promise<DefaultResponse<void>> {
    await this.permissionCheck(userTokenRequestDto);

    if (!urn) {
      throw new BadRequestException({ statusCode: 400, message: "이미지를 확인해 주세요." });
    }

    const fileUrn = urn["urn"];

    const storagePath: string = await this.parsingImageDivision(fileUrn);

    const fileNameMatch: RegExpMatchArray = fileUrn.match(/\/([^\/]+)$/);
    const fileName = fileNameMatch ? fileNameMatch[1] : null;

    console.log("viewImage()의 fileName: ", fileName);

    return DefaultResponse.responseWithData(HttpStatus.OK, "파일 조회 성공!", response.sendFile(fileName, { root: storagePath }));
  }

  async deleteProductMainImages(
    userTokenRequestDto: UserTokenRequestDto,
    productCheckedIdRequestDto: ProductCheckedIdRequestDto,
  ): Promise<DefaultResponse<void>> {
    await this.permissionCheck(userTokenRequestDto);

    if (!userTokenRequestDto.email) {
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

    FileManagementUtil.deleteProductOriginalImages("./local/storage/product/main/images/", product.productMainImageUrl);

    return DefaultResponse.response(HttpStatus.OK, "작업 성공!");
  }

  async updateProduct(userTokenRequestDto: UserTokenRequestDto, productUpdateRequestDto: ProductUpdateRequestDto): Promise<DefaultResponse<number>> {
    await this.permissionCheck(userTokenRequestDto);

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
    await this.permissionCheck(userTokenRequestDto);

    if (!productImageDeleteRequestDto) {
      throw new BadRequestException({ statusCode: 400, message: "요청을 확인해 주세요." });
    }

    if (!userTokenRequestDto.email) {
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

      FileManagementUtil.deleteProductOriginalImages(
        configuration().file.image.upload.storage.path + "additional",
        this.getOriginalFileName(imageUrl),
      );

      url.push(imageUrl);
    }

    return DefaultResponse.responseWithData(HttpStatus.OK, "작업 성공!", { deleteTarget: { url: url } });
  }

  async deleteProductDetailImages(
    userTokenRequestDto: UserTokenRequestDto,
    productImageDeleteRequestDto: ProductImageDeleteRequestDto,
  ): Promise<DefaultResponse<{ deleteTarget: { url: string[] } }>> {
    await this.permissionCheck(userTokenRequestDto);
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

      FileManagementUtil.deleteProductOriginalImages(configuration().file.image.upload.storage.path + "detail", this.getOriginalFileName(imageUrl));

      url.push(imageUrl);
    }

    return DefaultResponse.responseWithData(HttpStatus.OK, "작업 성공!", { deleteTarget: { url: url } });
  }

  async deleteProduct(
    userTokenRequestDto: UserTokenRequestDto,
    productCheckedIdRequestDto: ProductCheckedIdRequestDto,
  ): Promise<DefaultResponse<number>> {
    await this.permissionCheck(userTokenRequestDto);

    if (!productCheckedIdRequestDto) {
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
    await this.permissionCheck(userTokenRequestDto);

    if (!productCheckedIdRequestDto) {
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

  private getOriginalFileName(productMainImageUrl: string): string {
    const directoryPath = productMainImageUrl.replace(/:\d+/, "");
    return directoryPath.match(/\/([^\/]+)$/)[1];
  }

  async imageCreatedStorageProcessors(
    productId: number,
    imageFile: Express.Multer.File,
    category: string,
  ): Promise<{
    imageId: number;
    imageUrl: string;
  }> {
    if (!imageFile) {
      throw new BadRequestException({ statusCode: 400, message: "업로드할 파일을 확인해 주세요." });
    }

    let imageContent: { imageId: number; imageUrl: string };

    if (category === "additional") {
      const saveImage: ProductAdditionalImage = await this.productAdditionalImageRepository.save(
        ProductImageRequestDto.toAdditionalImageEntity(
          productId,
          `${configuration().server.url}:${configuration().server.port}/product/images/additional/${imageFile.filename}`,
        ),
      );

      if (!saveImage) {
        throw new InternalServerErrorException({ statusCode: 500, message: "상품 추가 이미지 등록에 실패하였어요. 관리자에게 문의해 주세요." });
      }

      imageContent = {
        imageId: saveImage.id,
        imageUrl: saveImage.url,
      };
    } else {
      const saveImage: ProductDetailImage = await this.productDetailImageRepository.save(
        ProductImageRequestDto.toDetailImageEntity(
          productId,
          `${configuration().server.url}:${configuration().server.port}/product/images/detail/${imageFile.filename}`,
        ),
      );

      if (!saveImage) {
        throw new InternalServerErrorException({ statusCode: 500, message: "상품 추가 이미지 등록에 실패하였어요. 관리자에게 문의해 주세요." });
      }

      imageContent = {
        imageId: saveImage.id,
        imageUrl: saveImage.url,
      };
    }

    return imageContent;
  }

  async parsingImageDivision(fileUrn: string): Promise<string> {
    const regExpMatchArray: RegExpMatchArray = fileUrn.match(/\/product\/images\/([^\/]+)/);

    if (!regExpMatchArray) {
      throw new BadRequestException({ statusCode: 400, message: "이미지를 확인해 주세요." });
    }

    return await this.checkImageExistence(fileUrn, regExpMatchArray[1]);
  }

  async checkImageExistence(fileUrn: string, imageDivision: string): Promise<string> {
    const fileUrl = `${configuration().server.url}:${configuration().server.port}${fileUrn}`;

    console.log("viewImage()의 fileUrl: ", fileUrl);

    if (imageDivision === "main") {
      if (!(await this.productRepository.findOne({ where: { productMainImageUrl: fileUrl } }))) {
        throw new BadRequestException({ statusCode: 404, message: "상품 정보를 확인해 주세요." });
      }

      return "./local/storage/product/main/images";
    } else if (imageDivision === "additional") {
      if (!(await this.productAdditionalImageRepository.findOne({ where: { url: fileUrl } }))) {
        throw new BadRequestException({ statusCode: 404, message: "상품 정보를 확인해 주세요." });
      }

      return "./local/storage/product/additional/images";
    } else {
      if (!(await this.productDetailImageRepository.findOne({ where: { url: fileUrl } }))) {
        throw new BadRequestException({ statusCode: 404, message: "상품 정보를 확인해 주세요." });
      }

      return "./local/storage/product/detail/images";
    }
  }

  async permissionCheck(userTokenRequestDto: UserTokenRequestDto): Promise<void> {
    if (!userTokenRequestDto) {
      throw new BadRequestException({ statusCode: 400, message: "상품 정보를 확인해 주세요." });
    }

    const user: User = await this.userRepository.findOne({ where: { email: userTokenRequestDto.email } });

    if (!user || user.userRole !== Role.ADMIN) {
      throw new NotFoundException({ statusCode: 404, message: "찾을 수 없어요." });
    }
  }

  private async getUserInfo(userTokenRequestDto: UserTokenRequestDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email: userTokenRequestDto.email } });

    if (!user) {
      throw new NotFoundException({ statusCode: 404, message: "등록되지 않은 이용자 정보에요." });
    }

    return user;
  }
}
