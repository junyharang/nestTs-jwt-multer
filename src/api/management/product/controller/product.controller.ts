import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiTags } from "@nestjs/swagger";
import { Bind, Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { DefaultResponse } from "../../../common/constant/default.response";
import { ProductService } from "../service/product.service";
import { ProductEditRequestDto } from "../model/dto/request/product-edit.request.dto";
import { FilesInterceptor } from "@nestjs/platform-express";
import { additionalMulterDiskOptions, detailMulterDiskOptions, mainMulterDiskOptions } from "../../../common/file/config/multer.options";
import { ProductEditImageResponseDto } from "../model/dto/response/image/product-edit-image-response.dto";
import { ProductSearchRequestDto } from "../model/dto/request/product-search.request.dto";
import { ProductListResponseDto } from "../model/dto/response/product-list.response.dto";
import { ProductDetailResponseDto } from "../model/dto/response/product-detail.response.dto";
import { ProductUpdateRequestDto } from "../model/dto/request/product-update.request.dto";
import { ProductCheckedIdRequestDto } from "../model/dto/request/common/product-checked-id.request.dto";
import { ProductImageDeleteRequestDto } from "../model/dto/request/image/product-image-delete-request.dto";

@ApiTags("관리자 상품 관리 서비스")
@Controller("admin/managements/products")
export class ProductController {
  constructor(@Inject("ProductService") private readonly productService: ProductService) {}

  @ApiOperation({
    summary: "상품 메인 이미지 등록",
  })
  @ApiOkResponse({
    description: "작업 성공!",
    type: Promise<DefaultResponse<string>>,
  })
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        mainImage: {
          type: "string",
          format: "binary",
        },
      },
    },
  })
  @ApiBearerAuth()
  @Post("/main-images/")
  @UseInterceptors(FilesInterceptor("mainImage", null, mainMulterDiskOptions))
  @Bind(UploadedFiles())
  async createProductMainImages(@UploadedFiles() mainImage: Express.Multer.File): Promise<DefaultResponse<{ imageUrl: string }>> {
    return this.productService.createProductMainImages(mainImage);
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

  @ApiOperation({
    summary: "상품 추가 이미지 등록",
  })
  @ApiOkResponse({
    description: "작업 성공!",
    type: Promise<DefaultResponse<ProductEditImageResponseDto>>,
  })
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        추가_이미지1: {
          type: "string",
          format: "binary",
        },
        추가_이미지2: {
          type: "string",
          format: "binary",
        },
      },
    },
  })
  @ApiBearerAuth()
  @Post("/additional-images")
  @UseInterceptors(FilesInterceptor("additionalImages", null, additionalMulterDiskOptions))
  @Bind(UploadedFiles())
  async createProductAdditionalImages(
    @UploadedFiles() additionalImages: Array<Express.Multer.File>,
    @Body() productId: string,
  ): Promise<DefaultResponse<ProductEditImageResponseDto>> {
    return this.productService.createProductAdditionalImages(additionalImages, productId);
  }

  @ApiOperation({
    summary: "상품 상세 이미지 등록",
  })
  @ApiOkResponse({
    description: "작업 성공!",
    type: Promise<DefaultResponse<ProductEditImageResponseDto>>,
  })
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        상세_이미지1: {
          type: "string",
          format: "binary",
        },
        상세_이미지2: {
          type: "string",
          format: "binary",
        },
      },
    },
  })
  @ApiBearerAuth()
  @Post("/detail-images")
  @UseInterceptors(FilesInterceptor("detailImages", null, detailMulterDiskOptions))
  @Bind(UploadedFiles())
  async createProductDetailImages(
    @UploadedFiles() detailImages: Array<Express.Multer.File>,
    @Body() productId: string,
  ): Promise<DefaultResponse<ProductEditImageResponseDto>> {
    return this.productService.createProductDetailImages(detailImages, productId);
  }

  @ApiOperation({
    summary: "상품 목록 조회(페이징 처리) 및 검색 기능",
  })
  @ApiOkResponse({
    description: "작업 성공!",
    type: Promise<DefaultResponse<ProductListResponseDto>>,
  })
  @ApiQuery({
    name: "productSearchRequestDto",
    required: true,
    description: "상품 검색 조건 및 페이징 처리 조건",
  })
  @ApiBearerAuth()
  @Get()
  async getProductList(@Query() productSearchRequestDto: ProductSearchRequestDto): Promise<DefaultResponse<ProductListResponseDto>> {
    return this.productService.getProductList(productSearchRequestDto);
  }

  @ApiOperation({
    summary: "상품 상세 조회",
  })
  @ApiOkResponse({
    description: "작업 성공!",
    type: Promise<DefaultResponse<ProductDetailResponseDto>>,
  })
  @ApiParam({
    name: "productId",
    required: true,
    description: "상품 고유 번호",
  })
  @ApiBearerAuth()
  @Get("/:productId")
  async getProductDetail(@Param("productId") productId: number): Promise<DefaultResponse<ProductDetailResponseDto>> {
    return this.productService.getProductDetail(productId);
  }

  @ApiOperation({
    summary: "상품 메인 이미지 삭제",
  })
  @ApiOkResponse({
    description: "작업 성공!",
    type: Promise<DefaultResponse<void>>,
  })
  @ApiBearerAuth()
  @Delete("/main-images/")
  async deleteProductMainImages(@Body() productCheckedIdRequestDto: ProductCheckedIdRequestDto): Promise<DefaultResponse<void>> {
    return this.productService.deleteProductMainImages(productCheckedIdRequestDto);
  }

  @ApiOperation({
    summary: "상품 수정",
  })
  @ApiOkResponse({
    description: "작업 성공!",
    type: Promise<DefaultResponse<number>>,
  })
  @ApiBearerAuth()
  @Patch()
  async updateProduct(@Body() productUpdateRequestDto: ProductUpdateRequestDto): Promise<DefaultResponse<number>> {
    return this.productService.updateProduct(productUpdateRequestDto);
  }

  @ApiOperation({
    summary: "상품 추가 이미지 삭제",
  })
  @ApiOkResponse({
    description: "작업 성공!",
    type: Promise<DefaultResponse<ProductEditImageResponseDto>>,
  })
  @ApiBearerAuth()
  @Delete("/additional-images")
  async deleteProductAdditionalImages(
    @Body() productImageDeleteRequestDto: ProductImageDeleteRequestDto,
  ): Promise<DefaultResponse<{ deleteTarget: { url: string[] } }>> {
    return this.productService.deleteProductAdditionalImages(productImageDeleteRequestDto);
  }

  @ApiOperation({
    summary: "상품 상세 이미지 삭제",
  })
  @ApiOkResponse({
    description: "작업 성공!",
    type: Promise<DefaultResponse<ProductEditImageResponseDto>>,
  })
  @ApiBearerAuth()
  @Delete("/detail-images")
  async deleteProductDetailImages(
    @Body() productImageDeleteRequestDto: ProductImageDeleteRequestDto,
  ): Promise<DefaultResponse<{ deleteTarget: { url: string[] } }>> {
    return this.productService.deleteProductDetailImages(productImageDeleteRequestDto);
  }

  @ApiOperation({
    summary: "상품 삭제",
  })
  @ApiOkResponse({
    description: "작업 성공!",
    type: Promise<DefaultResponse<number>>,
  })
  @ApiBearerAuth()
  @Delete()
  async deleteProduct(@Body() productCheckedIdRequestDto: ProductCheckedIdRequestDto): Promise<DefaultResponse<number>> {
    return this.productService.deleteProduct(productCheckedIdRequestDto);
  }

  @ApiOperation({
    summary: "상품 삭제 복구",
  })
  @ApiOkResponse({
    description: "작업 성공!",
    type: Promise<DefaultResponse<number>>,
  })
  @ApiBearerAuth()
  @Post("/restore")
  async restoreProduct(@Body() productCheckedIdRequestDto: ProductCheckedIdRequestDto): Promise<DefaultResponse<number>> {
    return this.productService.restoreProduct(productCheckedIdRequestDto);
  }
}
//  @UseGuards(JwtAuthenticationGuard)
