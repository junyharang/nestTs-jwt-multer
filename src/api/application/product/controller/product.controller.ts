import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiTags } from "@nestjs/swagger";
import { Controller, Get, Inject, Param, Query, UseGuards } from "@nestjs/common";
import { DefaultResponse } from "../../../common/constant/default.response";
import { ProductListResponseDto } from "../../../management/product/model/dto/response/product-list.response.dto";
import { ProductSearchRequestDto } from "../../../management/product/model/dto/request/product-search.request.dto";
import { ProductDetailResponseDto } from "../../../management/product/model/dto/response/product-detail.response.dto";
import { JwtAuthenticationGuard } from "../../../common/authentication/guard/jwt.authentication.guard";
import { GetUserInfo, UserTokenRequestDto } from "../../../common/authentication/model/dto/request/user-token-request.dto";
import { UserProductService } from "../service/user-product.service";

@ApiTags("이용자 상품 조회 서비스")
@Controller("products")
export class UserProductController {
  constructor(@Inject("UserProductService") private readonly userProductService: UserProductService) {}

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
  async getUserProductList(@Query() productSearchRequestDto: ProductSearchRequestDto): Promise<DefaultResponse<ProductListResponseDto>> {
    return this.userProductService.getUserProductList(productSearchRequestDto);
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
  @Get()
  @UseGuards(JwtAuthenticationGuard)
  async getUserProductDetail(
    @GetUserInfo() userTokenRequestDto: UserTokenRequestDto,
    @Param("productId") productId: number,
  ): Promise<DefaultResponse<ProductDetailResponseDto>> {
    return this.userProductService.getUserProductDetail(userTokenRequestDto, productId);
  }
}
