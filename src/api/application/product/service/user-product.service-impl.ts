import { BadRequestException, HttpStatus, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Page } from "../../../common/constant/page";
import { User } from "../../../common/user/model/entity/user.entity";
import { UserTokenRequestDto } from "../../../common/authentication/model/dto/request/user-token-request.dto";
import { UserProductService } from "./user-product.service";
import { Product } from "../../../management/product/model/entity/product.entity";
import { ProductRepository } from "../../../management/product/repository/product.repository";
import { DefaultResponse } from "../../../common/constant/default.response";
import { ProductSearchRequestDto } from "../../../management/product/model/dto/request/product-search.request.dto";
import { ProductListResponseDto } from "../../../management/product/model/dto/response/product-list.response.dto";
import { ProductDetailResponseDto } from "../../../management/product/model/dto/response/product-detail.response.dto";
import express from "express";
import { ProductAdditionalImage } from "../../../management/product/model/entity/product-additional-image.entity";
import { ProductDetailImage } from "../../../management/product/model/entity/product-detail-image.entity";
import configuration from "../../../../../common/config/environment/configuration";

@Injectable()
export class UserProductServiceImpl implements UserProductService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(ProductAdditionalImage) private productAdditionalImageRepository: Repository<ProductAdditionalImage>,
    @InjectRepository(ProductDetailImage) private productDetailImageRepository: Repository<ProductDetailImage>,
    @Inject("ProductQueryBuilderRepository") private readonly productQueryBuilderRepository: ProductRepository,
  ) {}

  async getUserProductList(productSearchRequestDto: ProductSearchRequestDto): Promise<DefaultResponse<ProductListResponseDto>> {
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

  async getUserProductDetail(userTokenRequestDto: UserTokenRequestDto, productId: number): Promise<DefaultResponse<ProductDetailResponseDto>> {
    if (!productId || productId <= 0) {
      throw new BadRequestException({ statusCode: 400, message: "상품 정보를 확인해 주세요." });
    }

    this.permissionCheck(userTokenRequestDto);

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

  async parsingImageDivision(fileUrn: string): Promise<string> {
    const regExpMatchArray: RegExpMatchArray = fileUrn.match(/\/product\/images\/([^\/]+)/);

    if (!regExpMatchArray) {
      throw new BadRequestException({ statusCode: 400, message: "이미지를 확인해 주세요." });
    }

    return await this.checkImageExistence(fileUrn, regExpMatchArray[1]);
  }

  async checkImageExistence(fileUrn: string, imageDivision: string): Promise<string> {
    const fileUrl = `${configuration().server.url}:${configuration().server.port}${fileUrn}`;

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

    if (!user || user.userRole === null) {
      throw new NotFoundException({ statusCode: 404, message: "찾을 수 없어요." });
    }
  }
}
