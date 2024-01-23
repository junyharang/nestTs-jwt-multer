"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 64:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductController = void 0;
const swagger_1 = __webpack_require__(22);
const common_1 = __webpack_require__(6);
const product_service_1 = __webpack_require__(65);
const product_edit_request_dto_1 = __webpack_require__(66);
const platform_express_1 = __webpack_require__(48);
const multer_options_1 = __webpack_require__(51);
const product_search_request_dto_1 = __webpack_require__(67);
const product_update_request_dto_1 = __webpack_require__(71);
const product_checked_id_request_dto_1 = __webpack_require__(72);
const product_image_delete_request_dto_1 = __webpack_require__(73);
let ProductController = class ProductController {
    constructor(productService) {
        this.productService = productService;
    }
    async createProductMainImages(mainImage) {
        return this.productService.createProductMainImages(mainImage);
    }
    async createProduct(productEditRequestDto) {
        return this.productService.createProduct(productEditRequestDto);
    }
    async createProductAdditionalImages(additionalImages, productId) {
        return this.productService.createProductAdditionalImages(additionalImages, productId);
    }
    async createProductDetailImages(detailImages, productId) {
        return this.productService.createProductDetailImages(detailImages, productId);
    }
    async getProductList(productSearchRequestDto) {
        return this.productService.getProductList(productSearchRequestDto);
    }
    async getProductDetail(productId) {
        return this.productService.getProductDetail(productId);
    }
    async deleteProductMainImages(productCheckedIdRequestDto) {
        return this.productService.deleteProductMainImages(productCheckedIdRequestDto);
    }
    async updateProduct(productUpdateRequestDto) {
        return this.productService.updateProduct(productUpdateRequestDto);
    }
    async deleteProductAdditionalImages(productImageDeleteRequestDto) {
        return this.productService.deleteProductAdditionalImages(productImageDeleteRequestDto);
    }
    async deleteProductDetailImages(productImageDeleteRequestDto) {
        return this.productService.deleteProductDetailImages(productImageDeleteRequestDto);
    }
    async deleteProduct(productCheckedIdRequestDto) {
        return this.productService.deleteProduct(productCheckedIdRequestDto);
    }
    async restoreProduct(productCheckedIdRequestDto) {
        return this.productService.restoreProduct(productCheckedIdRequestDto);
    }
};
exports.ProductController = ProductController;
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: "상품 메인 이미지 등록",
    }),
    (0, swagger_1.ApiOkResponse)({
        description: "작업 성공!",
        type: (Promise),
    }),
    (0, swagger_1.ApiConsumes)("multipart/form-data"),
    (0, swagger_1.ApiBody)({
        schema: {
            type: "object",
            properties: {
                mainImage: {
                    type: "string",
                    format: "binary",
                },
            },
        },
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Post)("/main-images/"),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)("mainImage", null, multer_options_1.mainMulterDiskOptions)),
    (0, common_1.Bind)((0, common_1.UploadedFiles)()),
    __param(0, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof Express !== "undefined" && (_b = Express.Multer) !== void 0 && _b.File) === "function" ? _c : Object]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], ProductController.prototype, "createProductMainImages", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: "상품 등록",
    }),
    (0, swagger_1.ApiOkResponse)({
        description: "작업 성공!",
        type: (Promise),
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof product_edit_request_dto_1.ProductEditRequestDto !== "undefined" && product_edit_request_dto_1.ProductEditRequestDto) === "function" ? _e : Object]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], ProductController.prototype, "createProduct", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: "상품 추가 이미지 등록",
    }),
    (0, swagger_1.ApiOkResponse)({
        description: "작업 성공!",
        type: (Promise),
    }),
    (0, swagger_1.ApiConsumes)("multipart/form-data"),
    (0, swagger_1.ApiBody)({
        schema: {
            type: "object",
            properties: {
                추가_이미지1: {
                    type: "string",
                    format: "binary",
                },
                추가_이미지2: {
                    type: "string",
                    format: "binary",
                },
            },
        },
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Post)("/additional-images"),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)("additionalImages", null, multer_options_1.additionalMulterDiskOptions)),
    (0, common_1.Bind)((0, common_1.UploadedFiles)()),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_g = typeof Array !== "undefined" && Array) === "function" ? _g : Object, String]),
    __metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], ProductController.prototype, "createProductAdditionalImages", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: "상품 상세 이미지 등록",
    }),
    (0, swagger_1.ApiOkResponse)({
        description: "작업 성공!",
        type: (Promise),
    }),
    (0, swagger_1.ApiConsumes)("multipart/form-data"),
    (0, swagger_1.ApiBody)({
        schema: {
            type: "object",
            properties: {
                상세_이미지1: {
                    type: "string",
                    format: "binary",
                },
                상세_이미지2: {
                    type: "string",
                    format: "binary",
                },
            },
        },
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Post)("/detail-images"),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)("detailImages", null, multer_options_1.detailMulterDiskOptions)),
    (0, common_1.Bind)((0, common_1.UploadedFiles)()),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_j = typeof Array !== "undefined" && Array) === "function" ? _j : Object, String]),
    __metadata("design:returntype", typeof (_k = typeof Promise !== "undefined" && Promise) === "function" ? _k : Object)
], ProductController.prototype, "createProductDetailImages", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: "상품 목록 조회(페이징 처리) 및 검색 기능",
    }),
    (0, swagger_1.ApiOkResponse)({
        description: "작업 성공!",
        type: (Promise),
    }),
    (0, swagger_1.ApiQuery)({
        name: "productSearchRequestDto",
        required: true,
        description: "상품 검색 조건 및 페이징 처리 조건",
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_l = typeof product_search_request_dto_1.ProductSearchRequestDto !== "undefined" && product_search_request_dto_1.ProductSearchRequestDto) === "function" ? _l : Object]),
    __metadata("design:returntype", typeof (_m = typeof Promise !== "undefined" && Promise) === "function" ? _m : Object)
], ProductController.prototype, "getProductList", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: "상품 상세 조회",
    }),
    (0, swagger_1.ApiOkResponse)({
        description: "작업 성공!",
        type: (Promise),
    }),
    (0, swagger_1.ApiParam)({
        name: "productId",
        required: true,
        description: "상품 고유 번호",
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)("/:productId"),
    __param(0, (0, common_1.Param)("productId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_o = typeof Promise !== "undefined" && Promise) === "function" ? _o : Object)
], ProductController.prototype, "getProductDetail", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: "상품 메인 이미지 삭제",
    }),
    (0, swagger_1.ApiOkResponse)({
        description: "작업 성공!",
        type: (Promise),
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Delete)("/main-images/"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_p = typeof product_checked_id_request_dto_1.ProductCheckedIdRequestDto !== "undefined" && product_checked_id_request_dto_1.ProductCheckedIdRequestDto) === "function" ? _p : Object]),
    __metadata("design:returntype", typeof (_q = typeof Promise !== "undefined" && Promise) === "function" ? _q : Object)
], ProductController.prototype, "deleteProductMainImages", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: "상품 수정",
    }),
    (0, swagger_1.ApiOkResponse)({
        description: "작업 성공!",
        type: (Promise),
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Patch)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_r = typeof product_update_request_dto_1.ProductUpdateRequestDto !== "undefined" && product_update_request_dto_1.ProductUpdateRequestDto) === "function" ? _r : Object]),
    __metadata("design:returntype", typeof (_s = typeof Promise !== "undefined" && Promise) === "function" ? _s : Object)
], ProductController.prototype, "updateProduct", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: "상품 추가 이미지 삭제",
    }),
    (0, swagger_1.ApiOkResponse)({
        description: "작업 성공!",
        type: (Promise),
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Delete)("/additional-images"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_t = typeof product_image_delete_request_dto_1.ProductImageDeleteRequestDto !== "undefined" && product_image_delete_request_dto_1.ProductImageDeleteRequestDto) === "function" ? _t : Object]),
    __metadata("design:returntype", typeof (_u = typeof Promise !== "undefined" && Promise) === "function" ? _u : Object)
], ProductController.prototype, "deleteProductAdditionalImages", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: "상품 상세 이미지 삭제",
    }),
    (0, swagger_1.ApiOkResponse)({
        description: "작업 성공!",
        type: (Promise),
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Delete)("/detail-images"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_v = typeof product_image_delete_request_dto_1.ProductImageDeleteRequestDto !== "undefined" && product_image_delete_request_dto_1.ProductImageDeleteRequestDto) === "function" ? _v : Object]),
    __metadata("design:returntype", typeof (_w = typeof Promise !== "undefined" && Promise) === "function" ? _w : Object)
], ProductController.prototype, "deleteProductDetailImages", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: "상품 삭제",
    }),
    (0, swagger_1.ApiOkResponse)({
        description: "작업 성공!",
        type: (Promise),
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Delete)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_x = typeof product_checked_id_request_dto_1.ProductCheckedIdRequestDto !== "undefined" && product_checked_id_request_dto_1.ProductCheckedIdRequestDto) === "function" ? _x : Object]),
    __metadata("design:returntype", typeof (_y = typeof Promise !== "undefined" && Promise) === "function" ? _y : Object)
], ProductController.prototype, "deleteProduct", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: "상품 삭제 복구",
    }),
    (0, swagger_1.ApiOkResponse)({
        description: "작업 성공!",
        type: (Promise),
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Post)("/restore"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_z = typeof product_checked_id_request_dto_1.ProductCheckedIdRequestDto !== "undefined" && product_checked_id_request_dto_1.ProductCheckedIdRequestDto) === "function" ? _z : Object]),
    __metadata("design:returntype", typeof (_0 = typeof Promise !== "undefined" && Promise) === "function" ? _0 : Object)
], ProductController.prototype, "restoreProduct", null);
exports.ProductController = ProductController = __decorate([
    (0, swagger_1.ApiTags)("관리자 상품 관리 서비스"),
    (0, common_1.Controller)("admin/managements/products"),
    __param(0, (0, common_1.Inject)("ProductService")),
    __metadata("design:paramtypes", [typeof (_a = typeof product_service_1.ProductService !== "undefined" && product_service_1.ProductService) === "function" ? _a : Object])
], ProductController);


/***/ }),

/***/ 74:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductServiceImpl = void 0;
const common_1 = __webpack_require__(6);
const typeorm_1 = __webpack_require__(14);
const typeorm_2 = __webpack_require__(17);
const default_response_1 = __webpack_require__(20);
const product_entity_1 = __webpack_require__(55);
const product_additional_image_entity_1 = __webpack_require__(62);
const configuration_1 = __importDefault(__webpack_require__(8));
const product_edit_image_response_dto_1 = __webpack_require__(75);
const product_image_request_dto_1 = __webpack_require__(76);
const product_detail_image_entity_1 = __webpack_require__(63);
const product_list_response_dto_1 = __webpack_require__(77);
const product_repository_1 = __webpack_require__(78);
const page_1 = __webpack_require__(79);
const product_detail_response_dto_1 = __webpack_require__(80);
const fs = __importStar(__webpack_require__(9));
const path_1 = __webpack_require__(11);
const user_entity_1 = __webpack_require__(16);
const user_service_1 = __webpack_require__(42);
const role_1 = __webpack_require__(18);
let ProductServiceImpl = class ProductServiceImpl {
    constructor(userService, userRepository, productRepository, productQueryBuilderRepository, productAdditionalImageRepository, productDetailImageRepository) {
        this.userService = userService;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.productQueryBuilderRepository = productQueryBuilderRepository;
        this.productAdditionalImageRepository = productAdditionalImageRepository;
        this.productDetailImageRepository = productDetailImageRepository;
    }
    async createProductMainImages(mainImage) {
        if (!mainImage) {
            throw new common_1.BadRequestException({ statusCode: 400, message: "업로드할 파일을 확인해 주세요." });
        }
        const imageContent = {
            imageUrl: `${(0, configuration_1.default)().server.url}:${(0, configuration_1.default)().server.port}/product/images/main/${mainImage[0].filename}`,
        };
        return default_response_1.DefaultResponse.responseWithData(common_1.HttpStatus.OK, "작업 성공!", imageContent);
    }
    async createProduct(productEditRequestDto) {
        if (!productEditRequestDto) {
            throw new common_1.BadRequestException({ statusCode: 400, message: "상품 정보를 확인해 주세요." });
        }
        const product = await this.productRepository.save(productEditRequestDto.toEntity(productEditRequestDto));
        if (!product) {
            throw new common_1.InternalServerErrorException({ statusCode: 500, message: "상품 등록에 실패하였어요." });
        }
        return default_response_1.DefaultResponse.responseWithData(common_1.HttpStatus.OK, "작업 성공!", product.productId);
    }
    async createProductAdditionalImages(additionalImages, productId) {
        if (!productId || !additionalImages || additionalImages.length === 0) {
            throw new common_1.BadRequestException({ statusCode: 400, message: "업로드할 파일을 확인해 주세요." });
        }
        return default_response_1.DefaultResponse.responseWithData(common_1.HttpStatus.OK, "작업 성공!", new product_edit_image_response_dto_1.ProductEditImageResponseDto(await this.imageCreatedStorageProcessors(parseInt(productId["productId"]), additionalImages, "additional")));
    }
    async createProductDetailImages(detailImages, productId) {
        if (!productId || !detailImages || detailImages.length === 0) {
            throw new common_1.BadRequestException({ statusCode: 400, message: "업로드할 파일을 확인해 주세요." });
        }
        return default_response_1.DefaultResponse.responseWithData(common_1.HttpStatus.OK, "작업 성공!", new product_edit_image_response_dto_1.ProductEditImageResponseDto(await this.imageCreatedStorageProcessors(parseInt(productId["productId"]), detailImages, "detail")));
    }
    async getProductList(productSearchRequestDto) {
        const findByProducts = await this.productQueryBuilderRepository.dynamicQuerySearchAndPagingByDto(productSearchRequestDto);
        if (!findByProducts || findByProducts[0].length === 0) {
            throw new common_1.BadRequestException({ statusCode: 404, message: "상품이 등록되지 않았어요. 상품 정보를 확인해 주세요." });
        }
        return default_response_1.DefaultResponse.responseWithPaginationAndData(common_1.HttpStatus.OK, "작업 성공!", new page_1.Page(findByProducts[0].length, findByProducts[1], findByProducts[0].map((product) => new product_list_response_dto_1.ProductListResponseDto(product))));
    }
    async getProductDetail(productId) {
        if (!productId || productId <= 0) {
            throw new common_1.BadRequestException({ statusCode: 400, message: "상품 정보를 확인해 주세요." });
        }
        const product = await this.productQueryBuilderRepository.findByIdAndJoinOneThing(productId);
        if (!product) {
            throw new common_1.BadRequestException({ statusCode: 404, message: "상품 조회에 실패하였어요. 상품 정보를 확인해 주세요." });
        }
        return default_response_1.DefaultResponse.responseWithData(common_1.HttpStatus.OK, "작업 성공!", new product_detail_response_dto_1.ProductDetailResponseDto(product));
    }
    async deleteProductMainImages(productCheckedIdRequestDto) {
        if (!productCheckedIdRequestDto.userId || !productCheckedIdRequestDto.userId) {
            throw new common_1.BadRequestException({ statusCode: 400, message: "수정할 파일을 확인해 주세요." });
        }
        const user = await this.userRepository.findOne({ where: { userId: productCheckedIdRequestDto.userId } });
        if (!user || user.userRole !== role_1.Role.ADMIN) {
            throw new common_1.NotFoundException({ statusCode: 404, message: "찾을 수 없어요." });
        }
        if (user.userRole !== role_1.Role.ADMIN) {
            throw new common_1.NotFoundException({ statusCode: 403, message: "잘못 된 요청이에요." });
        }
        const product = await this.productQueryBuilderRepository.findByIdAndJoinOneThing(productCheckedIdRequestDto.productId);
        if (product === null) {
            throw new common_1.NotFoundException({ statusCode: 404, message: "상품 정보를 확인해 주세요." });
        }
        try {
            await this.productRepository.update(productCheckedIdRequestDto.productId, {
                productMainImageUrl: null,
            });
        }
        catch (error) {
            throw new common_1.InternalServerErrorException({ statusCode: 500, message: "상품 메인 이미지 삭제에 실패하였어요. 관리자에게 문의해 주세요." });
        }
        this.deleteOriginalImages("main", product.productMainImageUrl);
        return default_response_1.DefaultResponse.response(common_1.HttpStatus.OK, "작업 성공!");
    }
    async updateProduct(productUpdateRequestDto) {
        if (!productUpdateRequestDto.userId) {
            throw new common_1.NotFoundException({ statusCode: 404, message: "찾을 수 없어요." });
        }
        const user = await this.userRepository.findOne({ where: { userId: productUpdateRequestDto.userId } });
        if (!user || user.userRole !== role_1.Role.ADMIN) {
            throw new common_1.NotFoundException({ statusCode: 404, message: "찾을 수 없어요." });
        }
        if (!productUpdateRequestDto) {
            throw new common_1.BadRequestException({ statusCode: 400, message: "상품 정보를 확인해 주세요." });
        }
        const product = await this.productQueryBuilderRepository.findByIdAndJoinOneThing(productUpdateRequestDto.productId);
        if (product === null) {
            throw new common_1.NotFoundException({ statusCode: 404, message: "상품 정보를 확인해 주세요." });
        }
        try {
            if (productUpdateRequestDto.mainImageUrl) {
                await this.productRepository.update(productUpdateRequestDto.productId, {
                    productName: productUpdateRequestDto.name,
                    productCount: productUpdateRequestDto.count,
                    productPrice: productUpdateRequestDto.price,
                    productContent: productUpdateRequestDto.content,
                    productMainImageUrl: productUpdateRequestDto.mainImageUrl,
                });
            }
            else {
                await this.productRepository.update(productUpdateRequestDto.productId, {
                    productName: productUpdateRequestDto.name,
                    productCount: productUpdateRequestDto.count,
                    productPrice: productUpdateRequestDto.price,
                    productContent: productUpdateRequestDto.content,
                });
            }
        }
        catch (error) {
            throw new common_1.InternalServerErrorException({ statusCode: 500, message: "상품 수정에 실패하였어요. 관리자에게 문의해 주세요." });
        }
        return default_response_1.DefaultResponse.responseWithData(common_1.HttpStatus.OK, "작업 성공!", product.productId);
    }
    async deleteProductAdditionalImages(productImageDeleteRequestDto) {
        if (!productImageDeleteRequestDto) {
            throw new common_1.BadRequestException({ statusCode: 400, message: "요청을 확인해 주세요." });
        }
        if (!productImageDeleteRequestDto.userId) {
            throw new common_1.NotFoundException({ statusCode: 404, message: "찾을 수 없어요." });
        }
        const user = await this.userRepository.findOne({ where: { userId: productImageDeleteRequestDto.userId } });
        if (!user || user.userRole !== role_1.Role.ADMIN) {
            throw new common_1.NotFoundException({ statusCode: 404, message: "찾을 수 없어요." });
        }
        if (!productImageDeleteRequestDto.productId) {
            throw new common_1.BadRequestException({ statusCode: 400, message: "상품 정보를 확인해 주세요." });
        }
        const product = await this.productQueryBuilderRepository.findByIdAndJoinOneThing(productImageDeleteRequestDto.productId);
        if (!product) {
            throw new common_1.NotFoundException({ statusCode: 404, message: "상품 정보를 확인해 주세요." });
        }
        const url = [];
        for (const imageUrl of productImageDeleteRequestDto.arrayUrl) {
            const deleteTarget = await this.productAdditionalImageRepository.findOne({ where: { url: imageUrl } });
            if (!deleteTarget) {
                throw new common_1.NotFoundException({ statusCode: 404, message: "삭제 대상을 찾을 수 없어요." });
            }
            try {
                await this.productAdditionalImageRepository.delete(deleteTarget.id);
            }
            catch (error) {
                throw new common_1.InternalServerErrorException({ statusCode: 500, message: "상품 추가 이미지 삭제에 실패하였어요. 관리자에게 문의해 주세요." });
            }
            this.deleteOriginalImages("additional", imageUrl);
            url.push(imageUrl);
        }
        return default_response_1.DefaultResponse.responseWithData(common_1.HttpStatus.OK, "작업 성공!", { deleteTarget: { url: url } });
    }
    async deleteProductDetailImages(productImageDeleteRequestDto) {
        if (!productImageDeleteRequestDto) {
            throw new common_1.BadRequestException({ statusCode: 400, message: "요청을 확인해 주세요." });
        }
        if (!productImageDeleteRequestDto.userId) {
            throw new common_1.NotFoundException({ statusCode: 404, message: "찾을 수 없어요." });
        }
        const user = await this.userRepository.findOne({ where: { userId: productImageDeleteRequestDto.userId } });
        if (!user || user.userRole !== role_1.Role.ADMIN) {
            throw new common_1.NotFoundException({ statusCode: 404, message: "찾을 수 없어요." });
        }
        if (!productImageDeleteRequestDto.productId) {
            throw new common_1.BadRequestException({ statusCode: 400, message: "상품 정보를 확인해 주세요." });
        }
        const product = await this.productQueryBuilderRepository.findByIdAndJoinOneThing(productImageDeleteRequestDto.productId);
        if (!product) {
            throw new common_1.NotFoundException({ statusCode: 404, message: "상품 정보를 확인해 주세요." });
        }
        const url = [];
        for (const imageUrl of productImageDeleteRequestDto.arrayUrl) {
            const deleteTarget = await this.productDetailImageRepository.findOne({ where: { url: imageUrl } });
            if (!deleteTarget) {
                throw new common_1.NotFoundException({ statusCode: 404, message: "삭제 대상을 찾을 수 없어요." });
            }
            try {
                await this.productDetailImageRepository.delete(deleteTarget.id);
            }
            catch (error) {
                throw new common_1.InternalServerErrorException({ statusCode: 500, message: "상품 상세 이미지 삭제에 실패하였어요. 관리자에게 문의해 주세요." });
            }
            this.deleteOriginalImages("detail", imageUrl);
            url.push(imageUrl);
        }
        return default_response_1.DefaultResponse.responseWithData(common_1.HttpStatus.OK, "작업 성공!", { deleteTarget: { url: url } });
    }
    async deleteProduct(productCheckedIdRequestDto) {
        if (!productCheckedIdRequestDto) {
            throw new common_1.NotFoundException({ statusCode: 404, message: "찾을 수 없어요." });
        }
        if (!productCheckedIdRequestDto.userId) {
            throw new common_1.NotFoundException({ statusCode: 404, message: "찾을 수 없어요." });
        }
        const user = await this.userRepository.findOne({ where: { userId: productCheckedIdRequestDto.userId } });
        if (!user || user.userRole !== role_1.Role.ADMIN) {
            throw new common_1.NotFoundException({ statusCode: 404, message: "찾을 수 없어요." });
        }
        if (!productCheckedIdRequestDto.productId) {
            throw new common_1.BadRequestException({ statusCode: 400, message: "상품 정보를 확인해 주세요." });
        }
        const product = await this.productQueryBuilderRepository.findByIdAndJoinOneThing(productCheckedIdRequestDto.productId);
        if (!product) {
            throw new common_1.NotFoundException({ statusCode: 404, message: "상품 정보를 확인해 주세요." });
        }
        try {
            await this.productRepository.softDelete(productCheckedIdRequestDto.productId);
            return default_response_1.DefaultResponse.responseWithData(common_1.HttpStatus.OK, "작업 성공!", product.productId);
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException({ statusCode: 500, message: "상품 삭제에 실패하였어요. 관리자에게 문의해 주세요." });
        }
    }
    async restoreProduct(productCheckedIdRequestDto) {
        if (!productCheckedIdRequestDto) {
            throw new common_1.NotFoundException({ statusCode: 404, message: "찾을 수 없어요." });
        }
        if (!productCheckedIdRequestDto.userId) {
            throw new common_1.NotFoundException({ statusCode: 404, message: "찾을 수 없어요." });
        }
        const user = await this.userRepository.findOne({ where: { userId: productCheckedIdRequestDto.userId } });
        if (!user || user.userRole !== role_1.Role.ADMIN) {
            throw new common_1.NotFoundException({ statusCode: 404, message: "찾을 수 없어요." });
        }
        if (!productCheckedIdRequestDto.productId) {
            throw new common_1.BadRequestException({ statusCode: 400, message: "상품 정보를 확인해 주세요." });
        }
        const product = await this.productQueryBuilderRepository.findByIdAndJoinOneThing(productCheckedIdRequestDto.productId);
        if (!product) {
            throw new common_1.NotFoundException({ statusCode: 404, message: "상품 정보를 확인해 주세요." });
        }
        try {
            await this.productRepository.restore(productCheckedIdRequestDto.productId);
            return default_response_1.DefaultResponse.responseWithData(common_1.HttpStatus.OK, "작업 성공!", product.productId);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException({ statusCode: 500, message: "상품 복구에 실패하였어요. 관리자에게 문의해 주세요." });
        }
    }
    deleteOriginalImages(imageDivision, productMainImageUrl) {
        const directoryPath = productMainImageUrl.replace(/:\d+/, "");
        const imageName = directoryPath.match(/\/([^\/]+)$/)[1];
        let originalImageDirectoryPath;
        if (imageDivision === "main") {
            originalImageDirectoryPath = "./local/storage/product/main/images/" + imageName;
        }
        else if (imageDivision === "additional") {
            originalImageDirectoryPath = "./local/storage/product/additional/images/" + imageName;
        }
        else {
            originalImageDirectoryPath = "./local/storage/product/detail/images/" + imageName;
        }
        if (fs.existsSync(originalImageDirectoryPath)) {
            fs.unlink(originalImageDirectoryPath, (error) => {
                if (error) {
                    throw new common_1.InternalServerErrorException({ statusCode: 500, message: "파일 삭제에 실패하였어요. 관리자에게 문의해 주세요." });
                }
                else {
                    (0, path_1.resolve)();
                }
            });
        }
        else {
            (0, path_1.resolve)();
            throw new common_1.InternalServerErrorException({ statusCode: 500, message: "삭제 대상 파일이 존재하지 않아요. 관리자에게 문의해 주세요." });
        }
    }
    async imageCreatedStorageProcessors(productId, images, category) {
        if (!images || images.length === 0) {
            throw new common_1.BadRequestException({ statusCode: 400, message: "업로드할 파일을 확인해 주세요." });
        }
        const result = [];
        for (const image of images) {
            if (category === "additional") {
                const saveImage = await this.productAdditionalImageRepository.save(product_image_request_dto_1.ProductImageRequestDto.toAdditionalImageEntity(productId, `${(0, configuration_1.default)().server.url}:${(0, configuration_1.default)().server.port}/product/images/additional/${image.filename}`));
                if (!saveImage) {
                    throw new common_1.InternalServerErrorException({ statusCode: 500, message: "상품 추가 이미지 등록에 실패하였어요. 관리자에게 문의해 주세요." });
                }
                const imageContent = {
                    imageId: saveImage.id,
                    imageUrl: saveImage.url,
                };
                result.push(imageContent);
            }
            else {
                const saveImage = await this.productDetailImageRepository.save(product_image_request_dto_1.ProductImageRequestDto.toDetailImageEntity(productId, `${(0, configuration_1.default)().server.url}:${(0, configuration_1.default)().server.port}/product/images/detail/${image.filename}`));
                if (!saveImage) {
                    throw new common_1.InternalServerErrorException({ statusCode: 500, message: "상품 추가 이미지 등록에 실패하였어요. 관리자에게 문의해 주세요." });
                }
                const imageContent = {
                    imageId: saveImage.id,
                    imageUrl: saveImage.url,
                };
                result.push(imageContent);
            }
        }
        return result;
    }
};
exports.ProductServiceImpl = ProductServiceImpl;
exports.ProductServiceImpl = ProductServiceImpl = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)("UserService")),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __param(3, (0, common_1.Inject)("ProductQueryBuilderRepository")),
    __param(4, (0, typeorm_1.InjectRepository)(product_additional_image_entity_1.ProductAdditionalImage)),
    __param(5, (0, typeorm_1.InjectRepository)(product_detail_image_entity_1.ProductDetailImage)),
    __metadata("design:paramtypes", [typeof (_a = typeof user_service_1.UserService !== "undefined" && user_service_1.UserService) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object, typeof (_c = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _c : Object, typeof (_d = typeof product_repository_1.ProductRepository !== "undefined" && product_repository_1.ProductRepository) === "function" ? _d : Object, typeof (_e = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _e : Object, typeof (_f = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _f : Object])
], ProductServiceImpl);


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("cbdd991b485c768f60b6")
/******/ })();
/******/ 
/******/ }
;