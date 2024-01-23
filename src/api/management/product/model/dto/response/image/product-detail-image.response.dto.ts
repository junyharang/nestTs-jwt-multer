import { ApiProperty } from "@nestjs/swagger";

export class ProductDetailImageResponseDto {
  @ApiProperty({ description: "상품 상세 사진 URL" })
  url: string;

  constructor(url: string) {
    this.url = url;
  }
}
