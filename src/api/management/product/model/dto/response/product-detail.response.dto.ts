import { ApiProperty } from "@nestjs/swagger";
import { Product } from "../../entity/product.entity";
import { ProductAdditionalImageResponseDto } from "./image/product-additional-image.response.dto";
import { ProductDetailImageResponseDto } from "./image/product-detail-image.response.dto";

export class ProductDetailResponseDto {
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

  @ApiProperty({ description: "상품 상세 소개" })
  content: string;

  @ApiProperty({ description: "상품 메인 사진 URL" })
  mainImageUrl: string;

  @ApiProperty({ description: "상품 추가 사진 URL" })
  additionalImages: ProductAdditionalImageResponseDto[];

  @ApiProperty({ description: "상품 상세 사진 URL" })
  detailImages: ProductDetailImageResponseDto[];

  constructor(product: Product) {
    this.id = product.productId;
    this.category = product.category.categoryName;
    this.division = product.division.divisionName;
    this.name = product.productName;
    this.price = product.productPrice;
    this.content = product.productContent;
    this.mainImageUrl = product.productMainImageUrl;
    this.additionalImages = Array.isArray(product.productAdditionalImages)
      ? product.productAdditionalImages.map((image) => new ProductAdditionalImageResponseDto(image.url))
      : [];
    this.detailImages = Array.isArray(product.productDetailImages)
      ? product.productDetailImages.map((image) => new ProductDetailImageResponseDto(image.url))
      : [];
  }
}
