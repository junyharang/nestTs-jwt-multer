import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { Category } from "../../entity/category.entity";

export class CategoryEditRequestDto {
  @ApiProperty({ description: "카테고리 이름 10자 이내" })
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(10)
  name: string;

  toEntity(categoryEditRequestDto: CategoryEditRequestDto): Category {
    const category = new Category();
    category.categoryName = categoryEditRequestDto.name;
    return category;
  }
}
