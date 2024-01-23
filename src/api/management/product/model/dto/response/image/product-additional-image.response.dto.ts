import { ApiProperty } from "@nestjs/swagger";

export class ProductAdditionalImageResponseDto {
  @ApiProperty({ description: "상품 추가 사진 URL" })
  url: string;

  constructor(url: string) {
    this.url = url;
  }
}
