import { Controller, Get, Inject, Param, UseGuards } from "@nestjs/common";
import { JwtAuthenticationGuard } from "../../authentication/guard/jwt.authentication.guard";
import { DefaultResponse } from "../../common/constant/default.response";
import { UserService } from "../service/user.service";
import { UserResponseDto } from "../model/dto/response/user.response.dto";
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags("이용자 서비스")
@Controller("user")
export class UserController {
  constructor(@Inject("UserService") private readonly userService: UserService) {}

  @ApiOperation({
    summary: "회원 정보 조회",
  })
  @ApiOkResponse({
    description: "작업 성공!",
    type: DefaultResponse<number>,
  })
  @ApiBearerAuth()
  @Get("/profile/:id")
  @UseGuards(JwtAuthenticationGuard)
  async getProfile(@Param("id") id: number): Promise<DefaultResponse<UserResponseDto>> {
    return this.userService.getProfile(id);
  }
}
