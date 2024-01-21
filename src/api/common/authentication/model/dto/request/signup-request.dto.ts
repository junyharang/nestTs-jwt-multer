import { IsEmail, IsNotEmpty, IsNumber, IsString, Matches, Max, MaxLength, Min, MinLength } from "class-validator";
import { User } from "../../../../user/model/entity/user.entity";
import { ApiProperty } from "@nestjs/swagger";
import { Role } from "../../../../user/model/entity/role";

export class SignupRequestDto {
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

  @ApiProperty({ description: "이용자 역할" })
  role?: Role;

  toEntity(signupRequestDto: SignupRequestDto): User {
    const user = new User();
    user.email = signupRequestDto.email;
    user.password = signupRequestDto.password;
    user.name = signupRequestDto.name;
    user.age = signupRequestDto.age;

    return user;
  }
}
