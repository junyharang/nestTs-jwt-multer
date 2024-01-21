import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Body, Controller, Inject, Post } from "@nestjs/common";
import { DefaultResponse } from "../../../common/constant/default.response";
import { DivisionEditRequestDto } from "../model/dto/request/division-edit.request.dto";
import { DivisionService } from "../service/division.service";

@ApiTags("관리자 분류 관리 서비스")
@Controller("admin/managements/divisions")
export class DivisionController {
  constructor(@Inject("DivisionService") private readonly divisionService: DivisionService) {}

  @ApiOperation({
    summary: "상품 구분 등록",
  })
  @ApiOkResponse({
    description: "작업 성공!",
    type: Promise<DefaultResponse<number>>,
  })
  @Post()
  async createDivision(@Body() divisionEditRequestDto: DivisionEditRequestDto): Promise<DefaultResponse<number>> {
    return this.divisionService.createDivision(divisionEditRequestDto);
  }
}
