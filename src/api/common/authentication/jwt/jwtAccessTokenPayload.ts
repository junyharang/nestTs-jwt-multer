import { Role } from "../../user/model/entity/role";

export interface JwtAccessTokenPayload {
  email: string;
  role: Role;
}

export interface JwtRefreshTokenPayload {
  email: string;
}
