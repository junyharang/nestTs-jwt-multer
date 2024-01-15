import { User } from "../model/entity/user.entity";
import { DefaultResponse } from "../../common/constant/default.response";
import { UserResponseDto } from "../model/dto/response/user.response.dto";

export interface UserService {
  findByEmail(email: string): Promise<User>;
  findById(id: number): Promise<User>;
  getProfile(id: number): Promise<DefaultResponse<UserResponseDto>>;
}
