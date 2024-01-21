import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Body, Controller, Inject, Post } from "@nestjs/common";
import { DefaultResponse } from "../../../common/constant/default.response";
import { CategoryService } from "../service/category.service";
import { CategoryEditRequestDto } from "../model/dto/request/category-edit.request.dto";

@ApiTags("관리자 분류 관리 서비스")
@Controller("admin/managements/categories")
export class CategoryController {
  constructor(@Inject("CategoryService") private readonly categoryService: CategoryService) {}

  @ApiOperation({
    summary: "상품 카테고리 등록",
  })
  @ApiOkResponse({
    description: "작업 성공!",
    type: Promise<DefaultResponse<number>>,
  })
  @Post()
  async createCategory(@Body() categoryEditRequestDto: CategoryEditRequestDto): Promise<DefaultResponse<number>> {
    return this.categoryService.createCategory(categoryEditRequestDto);
  }
}
