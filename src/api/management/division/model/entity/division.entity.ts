import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Division {
  @PrimaryGeneratedColumn("increment", { name: "division_id", type: "int", comment: "분류 고유 번호" })
  divisionId: number;

  @Column("varchar", { name: "division_name", length: 10, nullable: false, comment: "분류 이름" })
  divisionName: string;
}
