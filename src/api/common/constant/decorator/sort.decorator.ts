import { createApiPropertyDecorator } from "@nestjs/swagger/dist/decorators/api-property.decorator";

export enum Sort {
  ASC = "ASC",
  DESC = "DESC",
}

export const SortDecorator = () =>
  createApiPropertyDecorator(
    {
      type: "enum",
      enum: Sort,
      default: Sort.DESC,
    },
    false,
  );
