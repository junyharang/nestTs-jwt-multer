import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../../../common/user/model/entity/user.entity";
import { Category } from "../../../category/model/entity/category.entity";
import { Division } from "../../../division/model/entity/division.entity";
import { BaseDateTime } from "../../../../common/date/entity/base-date-time.entity";
import { ProductImage } from "./product-image.entity";

@Entity()
export class Product extends BaseDateTime {
  @PrimaryGeneratedColumn("increment", { type: "int", comment: "상품 고유 번호" })
  id: number;

  @ManyToOne(() => User, (user: User) => user.id)
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: User;

  @ManyToOne(() => Category, (category) => category.id)
  @JoinColumn([{ name: "category_id", referencedColumnName: "id" }])
  category: Category;

  @ManyToOne(() => Division, (division) => division.id)
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

  @OneToMany(() => ProductImage, (productImage: ProductImage) => productImage.id, {
    cascade: true,
  })
  mainImages: ProductImage[];

  // @OneToMany(() => ProductImage, (productImage: ProductImage) => productImage.id, {
  //   cascade: true,
  // })
  // additionalImages: ProductImage[];
  //
  // @OneToMany(() => ProductImage, (productImage: ProductImage) => productImage.id, {
  //   cascade: true,
  // })
  // detailImages: ProductImage[];
}
