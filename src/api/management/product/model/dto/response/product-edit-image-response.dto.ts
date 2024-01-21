import { ApiProperty } from "@nestjs/swagger";

export class ProductEditImageResponseDto {
  @ApiProperty({ description: "상품 사진 등록 정보" })
  private images: any[];

  constructor(images: any[]) {
    this.images = images;
  }
}
