import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Bind, Body, Controller, Inject, Post, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { DefaultResponse } from "../../../common/constant/default.response";
import { ProductService } from "../service/product.service";
import { ProductEditRequestDto } from "../model/dto/request/product-edit.request.dto";
import { FilesInterceptor } from "@nestjs/platform-express";
import { additionalMulterDiskOptions, detailMulterDiskOptions, mainMulterDiskOptions } from "../../../common/file/config/multer.options";
import { ProductEditImageResponseDto } from "../model/dto/response/product-edit-image-response.dto";

@ApiTags("관리자 상품 관리 서비스")
@Controller("admin/managements/products")
export class ProductController {
  constructor(@Inject("ProductService") private readonly productService: ProductService) {}

  @ApiOperation({
    summary: "상품 메인 이미지 등록",
  })
  @ApiOkResponse({
    description: "작업 성공!",
    type: Promise<DefaultResponse<ProductEditImageResponseDto>>,
  })
  @ApiBearerAuth()
  @Post("/main-images/")
  @UseInterceptors(FilesInterceptor("mainImages", null, mainMulterDiskOptions))
  @Bind(UploadedFiles())
  async createProductMainImages(@UploadedFiles() mainImages: Array<Express.Multer.File>): Promise<DefaultResponse<ProductEditImageResponseDto>> {
    return this.productService.createProductMainImages(mainImages);
  }

  @ApiOperation({
    summary: "상품 추가 이미지 등록",
  })
  @ApiOkResponse({
    description: "작업 성공!",
    type: Promise<DefaultResponse<ProductEditImageResponseDto>>,
  })
  @ApiBearerAuth()
  @Post("/additional-images")
  @UseInterceptors(FilesInterceptor("additionalImages", null, additionalMulterDiskOptions))
  @Bind(UploadedFiles())
  async createProductAdditionalImages(
    @UploadedFiles() additionalImages: Array<Express.Multer.File>,
  ): Promise<DefaultResponse<ProductEditImageResponseDto>> {
    return this.productService.createProductAdditionalImages(additionalImages);
  }

  @ApiOperation({
    summary: "상품 상세 이미지 등록",
  })
  @ApiOkResponse({
    description: "작업 성공!",
    type: Promise<DefaultResponse<ProductEditImageResponseDto>>,
  })
  @ApiBearerAuth()
  @Post("/detail-images")
  @UseInterceptors(FilesInterceptor("detailImages", null, detailMulterDiskOptions))
  @Bind(UploadedFiles())
  async createProductDetailImages(@UploadedFiles() detailImages: Array<Express.Multer.File>): Promise<DefaultResponse<ProductEditImageResponseDto>> {
    return this.productService.createProductDetailImages(detailImages);
  }

  @ApiOperation({
    summary: "상품 등록",
  })
  @ApiOkResponse({
    description: "작업 성공!",
    type: Promise<DefaultResponse<number>>,
  })
  @ApiBearerAuth()
  @Post()
  async createProduct(@Body() productEditRequestDto: ProductEditRequestDto): Promise<DefaultResponse<number>> {
    return this.productService.createProduct(productEditRequestDto);
  }
}

//  @UseGuards(JwtAuthenticationGuard)
