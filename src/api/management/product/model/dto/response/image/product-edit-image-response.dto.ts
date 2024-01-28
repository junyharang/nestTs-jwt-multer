import { ApiProperty } from "@nestjs/swagger";

export class ProductEditImageResponseDto {
  @ApiProperty({ description: "상품 사진 등록 성공 정보" })
  private saveSuccessImageContents: { imageId: number; imageUrl: string }[];

  @ApiProperty({ description: "상품 사진 등록 실패 정보" })
  private saveFailImageContents: { imageFileName: string; exceptionContent: { statusCode: number; message: string } }[];

  constructor(
    saveSuccessImageContents: { imageId: number; imageUrl: string }[],
    saveFailImageContents: { imageFileName: string; exceptionContent: { statusCode: number; message: string } }[],
  ) {
    this.saveSuccessImageContents = saveSuccessImageContents;
    this.saveFailImageContents = saveFailImageContents;
  }
}
