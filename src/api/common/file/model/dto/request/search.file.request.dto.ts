import { IsString } from "class-validator";
import { Transform } from "class-transformer";

export class SearchFileRequestDto {
  @Transform(({ value }) => value.split(","))
  @IsString()
  // @Length(1, 5, { each: true })
  readonly imageIds: string[];
}
