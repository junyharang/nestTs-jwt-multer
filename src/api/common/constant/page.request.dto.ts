import { ApiProperty } from "@nestjs/swagger";

export abstract class PageRequestDto {
  @ApiProperty({ description: "현재 페이지 위치", default: 1 })
  // @Type(() => Number)
  pageNumber: number | 1;

  @ApiProperty({ description: "페이지 당 출력 요소 개수", default: 10 })
  // @Type(() => Number)
  perPageSize: number | 10;

  getOffset(): number {
    return (this.pageNumber - 1) * this.perPageSize;
  }

  getLimit(): number {
    return this.perPageSize;
  }
}
