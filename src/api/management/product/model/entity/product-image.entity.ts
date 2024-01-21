import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProductImage {
  @PrimaryGeneratedColumn("increment", { type: "int", comment: "상품 사진 고유 번호" })
  id: number;

  @Column("varchar", { name: "category", length: 20, comment: "이미지 구분 (예: MAIN, THUMBNAIL" })
  category: string;

  @Column("varchar", { name: "urn", length: 255, comment: "이미지 URN" })
  url: string;
}
