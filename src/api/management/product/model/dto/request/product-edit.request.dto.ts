import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsNumber, IsString, MaxLength, Min, MinLength, ValidateNested } from "class-validator";
import { Product } from "../../entity/product.entity";
import { Division } from "../../../../division/model/entity/division.entity";
import { User } from "../../../../../common/user/model/entity/user.entity";
import { Category } from "../../../../category/model/entity/category.entity";
import { ProductImage } from "../../entity/product-image.entity";
import { Type } from "class-transformer";

class ImageRequestDto {
  @ApiProperty({ description: "이미지 고유 번호" })
  @IsNotEmpty()
  @Min(0)
  id: number;

  @ApiProperty({ description: "이미지 구분" })
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  catetory: string;

  @ApiProperty({ description: "이미지 URL" })
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  url: string;
}

export class ProductEditRequestDto {
  @ApiProperty({ description: "이용자 고유 번호" })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  userId: number;

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
  productName: string;

  @ApiProperty({ description: "상품 보유 개수" })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  productCount: number;

  @ApiProperty({ description: "상품 개 당 가격" })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  productPrice: number;

  @ApiProperty({ description: "상품 상세 소개" })
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  productContent: string;

  @ApiProperty({ description: "상품 메인 사진 정보들", type: [ImageRequestDto] })
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  // @Type(() => ImageRequestDto)
  mainImages: ImageRequestDto[];

  // @ApiProperty({ description: "상품 추가 사진 정보들", type: [ImageRequestDto] })
  // @IsNotEmpty()
  // @IsArray()
  // @ValidateNested({ each: true })
  // @Type(() => ImageRequestDto)
  // additionalImages: ImageRequestDto[];

  // @ApiProperty({ description: "상품 상세 사진 정보들", type: [ImageRequestDto] })
  // @IsNotEmpty()
  // @IsArray()
  // @ValidateNested({ each: true })
  // @Type(() => ImageRequestDto)
  // detailImages: ImageRequestDto[];

  toEntity(productCreateRequestDto: ProductEditRequestDto): Product {
    const product: Product = new Product();
    product.user = new User();
    product.user.id = productCreateRequestDto.userId;
    product.category = new Category();
    product.category.id = productCreateRequestDto.categoryId;
    product.division = new Division();
    product.division.id = productCreateRequestDto.divisionId;
    product.name = productCreateRequestDto.productName;
    product.count = productCreateRequestDto.productCount;
    product.price = productCreateRequestDto.productPrice;
    product.content = productCreateRequestDto.productContent;

    // 메인 이미지들 초기화
    product.mainImages = productCreateRequestDto.mainImages.map((imageDto) => {
      const mainImage: ProductImage = new ProductImage();
      mainImage.id = imageDto.id;
      mainImage.category = imageDto.catetory;
      mainImage.url = imageDto.url;
      return mainImage;
    });

    // 추가 이미지들 초기화
    // product.additionalImages = productCreateRequestDto.additionalImages.map((imageDto) => {
    //   const additionalImage = new ProductImage();
    //   additionalImage.id = imageDto.imageId;
    //   additionalImage.url = imageDto.imageUrl;
    //   return additionalImage;
    // }, []);

    // 상세 이미지들 초기화
    // product.detailImages = productCreateRequestDto.detailImages.map((imageDto) => {
    //   const detailImage = new ProductImage();
    //   detailImage.id = imageDto.imageId;
    //   detailImage.url = imageDto.imageUrl;
    //   return detailImage;
    // }, []);

    return product;
  }
}
