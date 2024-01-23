import { ApiProperty } from "@nestjs/swagger";
import { Product } from "../../entity/product.entity";

export class ProductListResponseDto {
  @ApiProperty({ description: "상품 고유 번호" })
  id: number;

  @ApiProperty({ description: "상품 카테고리" })
  category: string;

  @ApiProperty({ description: "상품 구분" })
  division: string;

  @ApiProperty({ description: "상품 이름" })
  name: string;

  @ApiProperty({ description: "상품 가격" })
  price: number;

  @ApiProperty({ description: "상품 메인 사진 URL" })
  mainImageUrl: string;

  constructor(product: Product) {
    this.id = product.productId;
    this.category = product.category.categoryName;
    this.division = product.division.divisionName;
    this.name = product.productName;
    this.price = product.productPrice;
    this.mainImageUrl = product.productMainImageUrl;
  }
}
