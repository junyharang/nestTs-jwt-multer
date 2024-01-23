import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { Division } from "../../entity/division.entity";

export class DivisionEditRequestDto {
  @ApiProperty({ description: "분류 이름 10자 이내" })
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(10)
  name: string;

  toEntity(divisionEditRequestDto: DivisionEditRequestDto): Division {
    const division = new Division();
    division.divisionName = divisionEditRequestDto.name;
    return division;
  }
}
