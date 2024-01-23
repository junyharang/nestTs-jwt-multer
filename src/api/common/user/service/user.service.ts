import { User } from "../model/entity/user.entity";
import { DefaultResponse } from "../../constant/default.response";
import { UserResponseDto } from "../model/dto/response/user.response.dto";

export interface UserService {
  findByEmail(email: string): Promise<User>;
  findById(userId: number): Promise<User>;
  getProfile(userId: number): Promise<DefaultResponse<UserResponseDto>>;
}
