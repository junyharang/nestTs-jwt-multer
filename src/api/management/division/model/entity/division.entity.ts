import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Division {
  @PrimaryGeneratedColumn("increment", { type: "int", comment: "분류 고유 번호" })
  id: number;

  @Column("varchar", { length: 10, nullable: false, comment: "분류 이름" })
  name: string;
}
