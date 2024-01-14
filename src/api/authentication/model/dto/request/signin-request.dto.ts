import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class SigninRequestDto {
  @ApiProperty({ description: "이용자 Email 주소(계정 ID) 4 ~ 30자 이내" })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
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
}
