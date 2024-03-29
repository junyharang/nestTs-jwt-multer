import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsString, Matches, Max, MaxLength, Min, MinLength } from "class-validator";
import { User } from "../../../../user/model/entity/user.entity";
import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export class SignoutRequestDto {
  @ApiProperty({ description: "이용자 고유 번호" })
  @IsNotEmpty()
  @IsEmail()
  @IsNumber()
  @Min(1)
  id: number;

  @ApiProperty({ description: "이용자 Email 주소(계정 ID) 4 ~ 30자 이내" })
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  @MinLength(4)
  @MaxLength(30)
  email: string;

  @ApiProperty({ description: "계정 비밀번호" })
  @IsNotEmpty()
  @IsString()
  @Matches(/^[A-Za-z\d$@!%*?&]{8,15}$/, {
    message: "비밀번호는 영(대, 소)문자, 특수문자($@!%*?&)만 입력 가능하고, 8 ~ 15글자 이내에 입력해야 해요.",
  })
  password: string;

  @ApiProperty({ description: "이용자 이름" })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: "이용자 나이" })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(110)
  age: number;

  toEntity(signoutRequestDto: SignoutRequestDto): User {
    const user = new User();
    user.email = signoutRequestDto.email;
    user.password = signoutRequestDto.password;
    user.userName = signoutRequestDto.name;
    user.userAge = signoutRequestDto.age;

    return user;
  }
}
