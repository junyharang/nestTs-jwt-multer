import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";

@Entity()
export class ProductDetailImage {
  @PrimaryGeneratedColumn("increment", { type: "int", comment: "상품 사진 고유 번호" })
  id: number;

  @ManyToOne(() => Product, (product: Product) => product.id, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn([{ name: "product_id", referencedColumnName: "id" }])
  product: Product;

  @Column("varchar", { name: "category", length: 20, comment: "이미지 구분 (예: MAIN, THUMBNAIL" })
  category: string;

  @Column("varchar", { name: "urn", length: 255, comment: "이미지 URN" })
  url: string;
}
