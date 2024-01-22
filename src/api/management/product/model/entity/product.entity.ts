import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../../../common/user/model/entity/user.entity";
import { Category } from "../../../category/model/entity/category.entity";
import { Division } from "../../../division/model/entity/division.entity";
import { BaseDateTime } from "../../../../common/date/entity/base-date-time.entity";
import { ProductAdditionalImage } from "./product-additional-image.entity";
import { ProductDetailImage } from "./product-detail-image.entity";

@Entity()
export class Product extends BaseDateTime {
  @PrimaryGeneratedColumn("increment", { name: "id", type: "int", comment: "상품 고유 번호" })
  id: number;

  @ManyToOne(() => User, (user: User) => user.id)
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: User;

  @ManyToOne(() => Category, (category: Category) => category.id)
  @JoinColumn([{ name: "category_id", referencedColumnName: "id" }])
  category: Category;

  @ManyToOne(() => Division, (division: Division) => division.id)
  @JoinColumn([{ name: "division_id", referencedColumnName: "id" }])
  division: Division;

  @Column({ type: "varchar", length: 100, nullable: false, comment: "상품 이름" })
  name: string;

  @Column({ type: "int", default: 1, nullable: false, comment: "상품 개수" })
  count: number;

  @Column({ type: "int", nullable: false, comment: "상품 가격" })
  price: number;

  @Column({ type: "text", nullable: false, comment: "상품 상세 내용" })
  content: string;

  @Column({ type: "varchar", length: 255, nullable: false, comment: "상품 대표 이미지" })
  mainImageUrn: string;

  @OneToMany(() => ProductAdditionalImage, (productAdditionalImage: ProductAdditionalImage) => productAdditionalImage.id, {
    cascade: true,
  })
  productAdditionalImages: ProductAdditionalImage[];

  @OneToMany(() => ProductDetailImage, (productDetailImage: ProductDetailImage) => productDetailImage.id, {
    cascade: true,
  })
  productDetailImages: ProductDetailImage[];
}
