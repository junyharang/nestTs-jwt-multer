import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";
import { Product } from "../../entity/product.entity";
import { User } from "../../../../../common/user/model/entity/user.entity";
import { ProductEditRequestDto } from "./product-edit.request.dto";

export class ProductUpdateRequestDto {
  @ApiProperty({ description: "상품 고유 번호" })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  productId: number;

  @ApiProperty({ description: "상품 이름 100자 이내" })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({ description: "상품 보유 개수" })
  @IsOptional()
  @IsNumber()
  count: number;

  @ApiProperty({ description: "상품 개 당 가격" })
  @IsOptional()
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({ description: "상품 상세 소개" })
  @IsOptional()
  @IsString()
  content: string;

  @ApiProperty({ description: "상품 메인 사진 URL" })
  @IsOptional()
  @IsString()
  mainImageUrl: string;

  toEntity(productEditRequestDto: ProductEditRequestDto): Product {
    const product: Product = new Product();
    product.productName = productEditRequestDto.name;
    product.productCount = productEditRequestDto.count;
    product.productPrice = productEditRequestDto.price;
    product.productContent = productEditRequestDto.content;
    product.productMainImageUrl = productEditRequestDto.mainImageUrl;
    return product;
  }
}
