import { Role } from "../../../../user/model/entity/role";
import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export class UserTokenRequestDto {
  email: string;
  role: Role;
}

export const GetUserInfo = createParamDecorator((date, executionContext: ExecutionContext) => {
  const request = executionContext.switchToHttp().getRequest();

  return request.user as UserTokenRequestDto;
});
