import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export abstract class PageRequestDto {
  @ApiProperty({ description: "현재 페이지 위치", default: 1, required: false })
  @IsOptional()
  pageNumber?: number | 1;

  @ApiProperty({ description: "페이지 당 출력 요소 개수", default: 10, required: false })
  @IsOptional()
  perPageSize?: number | 10;

  getOffset(): number {
    return (this.pageNumber - 1) * this.perPageSize;
  }

  getLimit(): number {
    return this.perPageSize;
  }
}
