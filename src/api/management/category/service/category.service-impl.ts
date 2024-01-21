import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { DefaultResponse } from "../../../common/constant/default.response";
import { CategoryService } from "./category.service";
import { Category } from "../model/entity/category.entity";
import { CategoryEditRequestDto } from "../model/dto/request/category-edit.request.dto";

@Injectable()
export class CategoryServiceImpl implements CategoryService {
  constructor(@InjectRepository(Category) private readonly categoryRepository: Repository<Category>) {}

  async createCategory(categoryEditRequestDto: CategoryEditRequestDto): Promise<DefaultResponse<number>> {
    if (!categoryEditRequestDto) {
      throw new BadRequestException({ statusCode: 400, message: "카테고리 정보를 확인해 주세요." });
    }

    const division = await this.categoryRepository.save(categoryEditRequestDto.toEntity(categoryEditRequestDto));

    if (!division) {
      throw new InternalServerErrorException({ statusCode: 500, message: "카테고리 등록에 실패하였어요." });
    }

    return DefaultResponse.responseWithData(200, "작업 성공!", division.id);
  }
}
