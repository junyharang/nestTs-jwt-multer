import { ProductImage } from "../../entity/product-image.entity";

export class ProductImageRequestDto {
  category: string;

  imageUrl: string;

  static toEntity(category: string, imageUrl: string): ProductImage {
    const productImage: ProductImage = new ProductImage();
    productImage.category = category;
    productImage.url = imageUrl;
    return productImage;
  }
}
