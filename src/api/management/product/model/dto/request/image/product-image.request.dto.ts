import { ProductAdditionalImage } from "../../../entity/product-additional-image.entity";
import { ProductDetailImage } from "../../../entity/product-detail-image.entity";
import { Product } from "../../../entity/product.entity";

export class ProductImageRequestDto {
  url: string;

  static toAdditionalImageEntity(productId: number, imageUrl: string): ProductAdditionalImage {
    const productAdditionalImage: ProductAdditionalImage = new ProductAdditionalImage();
    productAdditionalImage.product = new Product();
    productAdditionalImage.product.productId = productId;
    productAdditionalImage.url = imageUrl;
    return productAdditionalImage;
  }

  static toDetailImageEntity(productId: number, imageUrl: string): ProductDetailImage {
    const productDetailImage: ProductDetailImage = new ProductDetailImage();
    productDetailImage.product = new Product();
    productDetailImage.product.productId = productId;
    productDetailImage.url = imageUrl;
    return productDetailImage;
  }
}
