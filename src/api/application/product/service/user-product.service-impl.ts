import { BadRequestException, HttpStatus, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Page } from "../../../common/constant/page";
import { User } from "../../../common/user/model/entity/user.entity";
import { Role } from "../../../common/user/model/entity/role";
import { UserTokenRequestDto } from "../../../common/authentication/model/dto/request/user-token-request.dto";
import { UserProductService } from "./user-product.service";
import { Product } from "../../../management/product/model/entity/product.entity";
import { ProductRepository } from "../../../management/product/repository/product.repository";
import { DefaultResponse } from "../../../common/constant/default.response";
import { ProductSearchRequestDto } from "../../../management/product/model/dto/request/product-search.request.dto";
import { ProductListResponseDto } from "../../../management/product/model/dto/response/product-list.response.dto";
import { ProductDetailResponseDto } from "../../../management/product/model/dto/response/product-detail.response.dto";

@Injectable()
export class UserProductServiceImpl implements UserProductService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @Inject("ProductQueryBuilderRepository") private readonly productQueryBuilderRepository: ProductRepository,
  ) {}

  async getUserProductList(productSearchRequestDto: ProductSearchRequestDto): Promise<DefaultResponse<ProductListResponseDto>> {
    const findByProducts: [Product[], number] = await this.productQueryBuilderRepository.dynamicQuerySearchAndPagingByDto(productSearchRequestDto);

    if (!findByProducts || findByProducts[0].length === 0) {
      throw new BadRequestException({ statusCode: 404, message: "상품이 등록되지 않았어요. 상품 정보를 확인해 주세요." });
    }

    return DefaultResponse.responseWithPaginationAndData(
      HttpStatus.OK,
      "작업 성공!",
      new Page(
        findByProducts[0].length,
        findByProducts[1],
        findByProducts[0].map((product: Product) => new ProductListResponseDto(product)),
      ),
    );
  }

  async getUserProductDetail(userTokenRequestDto: UserTokenRequestDto, productId: number): Promise<DefaultResponse<ProductDetailResponseDto>> {
    if (!userTokenRequestDto || !productId || productId <= 0) {
      throw new BadRequestException({ statusCode: 400, message: "상품 정보를 확인해 주세요." });
    }

    const user = await this.userRepository.findOne({ where: { email: userTokenRequestDto.email } });

    if (!user || user.userRole !== Role.USER) {
      throw new NotFoundException({ statusCode: 404, message: "찾을 수 없어요." });
    }

    const product: Product = await this.productQueryBuilderRepository.findByIdAndJoinOneThing(productId);

    if (!product) {
      throw new BadRequestException({ statusCode: 404, message: "상품 조회에 실패하였어요. 상품 정보를 확인해 주세요." });
    }

    return DefaultResponse.responseWithData(HttpStatus.OK, "작업 성공!", new ProductDetailResponseDto(product));
  }
}
