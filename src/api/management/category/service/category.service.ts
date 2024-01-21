import { DefaultResponse } from "../../../common/constant/default.response";
import { CategoryEditRequestDto } from "../model/dto/request/category-edit.request.dto";

export interface CategoryService {
  createCategory(categoryEditRequestDto: CategoryEditRequestDto): Promise<DefaultResponse<number>>;
}
