import { ApiProperty } from "@nestjs/swagger";
import { User } from "../../entity/user.entity";

export class UserResponseDto {
  @ApiProperty({ description: "이용자 Email 주소(계정 ID) 4 ~ 30자 이내" })
  private email: string;

  @ApiProperty({ description: "이용자 이름" })
  private name: string;

  @ApiProperty({ description: "이용자 나이" })
  private age: number;

  constructor(user: User) {
    this.email = user.email;
    this.name = user.name;
    this.age = user.age;
  }
}
