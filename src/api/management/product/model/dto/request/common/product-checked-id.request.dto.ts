import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, Min } from "class-validator";

export class ProductCheckedIdRequestDto {
  @ApiProperty({ description: "이용자 고유 번호" })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  userId: number;

  @ApiProperty({ description: "상품 고유 번호" })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  productId: number;
}
