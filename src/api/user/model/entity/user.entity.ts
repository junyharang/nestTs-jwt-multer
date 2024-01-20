import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./role";

@Entity()
export class User {
  @PrimaryGeneratedColumn("increment")
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

  @Column({ default: "" })
  refreshToken: string;

  @Column({ default: "" })
  refreshTokenExpireDate: Date;

  updatePassword(password: string) {
    this.password = password;
  }

  setRefreshToken(refreshToken: string) {
    this.refreshToken = refreshToken;
  }

  setRefreshTokenExpireDate(refreshTokenExpireDate: Date) {
    this.refreshTokenExpireDate = refreshTokenExpireDate;
  }
}
