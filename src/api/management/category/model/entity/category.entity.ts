import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category {
  @PrimaryGeneratedColumn("increment", { type: "int", comment: "카테고리 고유 번호" })
  id: number;

  @Column("varchar", { length: 10, nullable: false, comment: "카테고리 이름" })
  name: string;
}
