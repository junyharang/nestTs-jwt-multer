import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category {
  @PrimaryGeneratedColumn("increment", { name: "category_id", type: "int", comment: "카테고리 고유 번호" })
  categoryId: number;

  @Column("varchar", { name: "category_name", length: 10, nullable: false, comment: "카테고리 이름" })
  categoryName: string;
}
