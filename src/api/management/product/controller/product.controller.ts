import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Controller, Inject, Post, UseGuards } from "@nestjs/common";
import { DefaultResponse } from "../../../common/constant/default.response";
import { JwtAuthenticationGuard } from "../../../common/authentication/guard/jwt.authentication.guard";
import { ProductService } from "../service/product.service";

@ApiTags("관리자 상품 관리 서비스")
@Controller("managements/products")
export class ProductController {
  constructor(@Inject("ProductService") private readonly productService: ProductService) {}

  @ApiOperation({
    summary: "상품 등록",
  })
  @ApiOkResponse({
    description: "작업 성공!",
    type: DefaultResponse<number>,
  })
  @ApiBearerAuth()
  @Post()
  @UseGuards(JwtAuthenticationGuard)
  async createProduct(productCreateRequestDto: ProductCreateRequestDto): Promise<DefaultResponse<number>> {
    return this.productService.createProduct(productCreateRequestDto);
  }
}
