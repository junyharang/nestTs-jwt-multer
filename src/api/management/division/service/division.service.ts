import { DivisionEditRequestDto } from "../model/dto/request/division-edit.request.dto";
import { DefaultResponse } from "../../../common/constant/default.response";

export interface DivisionService {
  createDivision(divisionEditRequestDto: DivisionEditRequestDto): Promise<DefaultResponse<number>>;
}