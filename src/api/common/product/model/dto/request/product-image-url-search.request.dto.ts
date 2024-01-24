import { Transform } from "class-transformer";
import { IsString, Length } from "class-validator";

export class ProductImageUrlSearchRequestDto {
  @Transform(({ value }) => value.split(","))
  @IsString({ each: true })
  @Length(1, 100, { each: true })
  readonly url: string[];
}
