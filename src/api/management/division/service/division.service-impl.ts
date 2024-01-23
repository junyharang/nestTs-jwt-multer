import { DivisionService } from "./division.service";
import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Division } from "../model/entity/division.entity";
import { Repository } from "typeorm";
import { DivisionEditRequestDto } from "../model/dto/request/division-edit.request.dto";
import { DefaultResponse } from "../../../common/constant/default.response";

@Injectable()
export class DivisionServiceImpl implements DivisionService {
  constructor(@InjectRepository(Division) private readonly divisionRepository: Repository<Division>) {}

  async createDivision(divisionEditRequestDto: DivisionEditRequestDto): Promise<DefaultResponse<number>> {
    if (!divisionEditRequestDto) {
      throw new BadRequestException({ statusCode: 400, message: "카테고리 정보를 확인해 주세요." });
    }

    const division = await this.divisionRepository.save(divisionEditRequestDto.toEntity(divisionEditRequestDto));

    if (!division) {
      throw new InternalServerErrorException({ statusCode: 500, message: "카테고리 등록에 실패하였어요." });
    }

    return DefaultResponse.responseWithData(200, "작업 성공!", division.divisionId);
  }
}
