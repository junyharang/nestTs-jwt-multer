import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./role";

@Entity()
export class User {
  @PrimaryGeneratedColumn("increment", { type: "int", comment: "이용자 고유 번호" })
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column({
    type: "varchar",
    enum: Role,
    default: Role.USER,
  })
  role: Role;

  @Column({ nullable: true, default: "" })
  refreshToken: string;

  @Column({ nullable: true, default: null })
  refreshTokenExpireDateTime: Date;

  updatePassword(password: string) {
    this.password = password;
  }

  setRefreshToken(refreshToken: string) {
    this.refreshToken = refreshToken;
  }

  setRefreshTokenExpireDate(refreshTokenExpireDate: Date) {
    this.refreshTokenExpireDateTime = refreshTokenExpireDate;
  }
}
