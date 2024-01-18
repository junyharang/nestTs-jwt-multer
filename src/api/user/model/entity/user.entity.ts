import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./Role";

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

  updatePassword(password: string) {
    this.password = password;
  }

  setRefreshToken(refreshToken: string) {
    this.refreshToken = refreshToken;
  }
}
