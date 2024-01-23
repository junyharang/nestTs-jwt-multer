import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./role";
import { number, string } from "joi";

@Entity()
export class User {
  @PrimaryGeneratedColumn("increment", { name: "user_id", type: "int", comment: "이용자 고유 번호" })
  userId: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ name: "user_name" })
  userName: string;

  @Column({ name: "user_age" })
  userAge: number;

  @Column({
    name: "user_role",
    type: "varchar",
    enum: Role,
    default: Role.USER,
  })
  userRole: Role;

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
