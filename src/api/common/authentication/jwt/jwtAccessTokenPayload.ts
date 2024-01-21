import { Role } from "../../user/model/entity/role";

export interface JwtAccessTokenPayload {
  email: string;
  name: string;
  age: number;
  role: Role;
}

export interface JwtRefreshTokenPayload {
  email: string;
}
