import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsNumber, Min } from "class-validator";

export class ProductImageDeleteRequestDto {
  @ApiProperty({ description: "상품 고유 번호" })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  productId: number;

  @ApiProperty({ description: "상품 추가 삭제 대상 이미지 URL" })
  @IsNotEmpty()
  @IsArray()
  arrayUrl: string[];
}
