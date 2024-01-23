import { ApiProperty } from "@nestjs/swagger";
import { PageRequestDto } from "../../../../../common/constant/page.request.dto";
import { Sort } from "../../../../../common/constant/decorator/sort.decorator";
import { SortDecorator } from "../../../../../common/constant/decorator/sort.decorator";

export class ProductSearchRequestDto extends PageRequestDto {
  @ApiProperty({ description: "정렬 여부", required: false })
  @SortDecorator()
  sort?: Sort;

  @ApiProperty({ description: "상품 카테고리", required: false })
  category?: string;

  @ApiProperty({ description: "상품 구분", required: false })
  division?: string;
}
