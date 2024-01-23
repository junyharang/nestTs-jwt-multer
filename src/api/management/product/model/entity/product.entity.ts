import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../../../common/user/model/entity/user.entity";
import { Category } from "../../../category/model/entity/category.entity";
import { Division } from "../../../division/model/entity/division.entity";
import { BaseDateTime } from "../../../../common/date/entity/base-date-time.entity";
import { ProductAdditionalImage } from "./product-additional-image.entity";
import { ProductDetailImage } from "./product-detail-image.entity";

@Entity()
export class Product extends BaseDateTime {
  @PrimaryGeneratedColumn("increment", { name: "product_id", type: "int", comment: "상품 고유 번호" })
  productId: number;

  @ManyToOne(() => User, (user: User) => user.userId)
  @JoinColumn([{ name: "user_id", referencedColumnName: "userId" }])
  user: User;

  @ManyToOne(() => Category, (category: Category) => category.categoryId)
  @JoinColumn([{ name: "category_id", referencedColumnName: "categoryId" }])
  category: Category;

  @ManyToOne(() => Division, (division: Division) => division.divisionId)
  @JoinColumn([{ name: "division_id", referencedColumnName: "divisionId" }])
  division: Division;

  @Column({ name: "product_name", type: "varchar", length: 100, nullable: false, comment: "상품 이름" })
  productName: string;

  @Column({ name: "product_count", type: "int", default: 1, nullable: false, comment: "상품 개수" })
  productCount: number;

  @Column({ name: "product_price", type: "int", nullable: false, comment: "상품 가격" })
  productPrice: number;

  @Column({ name: "product_content", type: "text", nullable: false, comment: "상품 상세 내용" })
  productContent: string;

  @Column({ name: "product_main_image_url", type: "varchar", length: 255, nullable: true, comment: "상품 대표 이미지" })
  productMainImageUrl: string;

  @OneToMany(() => ProductAdditionalImage, (productAdditionalImage: ProductAdditionalImage) => productAdditionalImage.product, {
    cascade: true,
  })
  productAdditionalImages: ProductAdditionalImage[];

  @OneToMany(() => ProductDetailImage, (productDetailImage: ProductDetailImage) => productDetailImage.product, {
    cascade: true,
  })
  productDetailImages: ProductDetailImage[];
}
