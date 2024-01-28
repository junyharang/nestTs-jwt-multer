import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, MaxLength, Min, MinLength } from "class-validator";
import { Product } from "../../entity/product.entity";
import { Division } from "../../../../division/model/entity/division.entity";
import { User } from "../../../../../common/user/model/entity/user.entity";
import { Category } from "../../../../category/model/entity/category.entity";
import { UserTokenRequestDto } from "../../../../../common/authentication/model/dto/request/user-token-request.dto";

export class ProductEditRequestDto {
  @ApiProperty({ description: "구분 고유 번호" })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  divisionId: number;

  @ApiProperty({ description: "카테고리 고유 번호" })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  categoryId: number;

  @ApiProperty({ description: "상품 이름 100자 이내" })
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  name: string;

  @ApiProperty({ description: "상품 보유 개수" })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  count: number;

  @ApiProperty({ description: "상품 개 당 가격" })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({ description: "상품 상세 소개" })
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  content: string;

  @ApiProperty({ description: "상품 메인 사진 URL" })
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  mainImageUrl: string;

  toEntity(requestUser: User, productCreateRequestDto: ProductEditRequestDto): Product {
    const product: Product = new Product();
    product.user = new User();
    product.user.userId = requestUser.userId;
    product.category = new Category();
    product.category.categoryId = productCreateRequestDto.categoryId;
    product.division = new Division();
    product.division.divisionId = productCreateRequestDto.divisionId;
    product.productName = productCreateRequestDto.name;
    product.productCount = productCreateRequestDto.count;
    product.productPrice = productCreateRequestDto.price;
    product.productContent = productCreateRequestDto.content;
    product.productMainImageUrl = productCreateRequestDto.mainImageUrl;
    return product;
  }
}
