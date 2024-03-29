import { UserService } from "./user.service";
import { HttpStatus, Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../model/entity/user.entity";
import { Repository } from "typeorm";
import { DefaultResponse } from "../../constant/default.response";
import { UserResponseDto } from "../model/dto/response/user.response.dto";
import * as console from "console";

@Injectable()
export class UserServiceImpl implements UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  async getProfile(userId: number): Promise<DefaultResponse<UserResponseDto>> {
    const user = await this.findById(userId);

    if (!user) {
      return DefaultResponse.response(HttpStatus.FORBIDDEN, "등록되지 않은 이용자에요.");
    }

    return DefaultResponse.responseWithData(HttpStatus.OK, "작업 성공!", new UserResponseDto(user));
  }

  async findById(userId: number): Promise<User> {
    if (!userId) {
      throw new InternalServerErrorException({ statusCode: 500, message: "인증 처리 중 문제가 발생하였어요." });
    }

    return await this.userRepository.findOne({ where: { userId } });
  }

  async findByEmail(email: string): Promise<User> {
    console.log(`findById() Id: ${email}`);

    if (!email) {
      throw new InternalServerErrorException({ statusCode: 500, message: "인증 처리 중 문제가 발생하였어요." });
    }

    return await this.userRepository.findOne({ where: { email } });
  }
}
