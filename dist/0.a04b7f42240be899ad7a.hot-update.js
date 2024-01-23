"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 69:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SortDecorator = exports.Sort = void 0;
const api_property_decorator_1 = __webpack_require__(70);
var Sort;
(function (Sort) {
    Sort["ASC"] = "ASC";
    Sort["DESC"] = "DESC";
})(Sort || (exports.Sort = Sort = {}));
const SortDecorator = () => (0, api_property_decorator_1.createApiPropertyDecorator)({
    type: "enum",
    enum: Sort,
    default: Sort.DESC,
}, false);
exports.SortDecorator = SortDecorator;


/***/ }),

/***/ 68:
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PageRequestDto = void 0;
const swagger_1 = __webpack_require__(22);
const class_validator_1 = __webpack_require__(27);
class PageRequestDto {
    getOffset() {
        return (this.pageNumber - 1) * this.perPageSize;
    }
    getLimit() {
        return this.perPageSize;
    }
}
exports.PageRequestDto = PageRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "현재 페이지 위치", default: 1, required: false }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], PageRequestDto.prototype, "pageNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "페이지 당 출력 요소 개수", default: 10, required: false }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], PageRequestDto.prototype, "perPageSize", void 0);


/***/ }),

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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductController = void 0;
const swagger_1 = __webpack_require__(22);
const common_1 = __webpack_require__(6);
const product_service_1 = __webpack_require__(65);
const product_edit_request_dto_1 = __webpack_require__(66);
const platform_express_1 = __webpack_require__(48);
const multer_options_1 = __webpack_require__(51);
const product_search_request_dto_1 = __webpack_require__(67);
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
    async createProductWithImages(images, productEditRequestDto) {
        return this.productService.createProductWithImages(productEditRequestDto, images.mainImage, images.additionalImages, images.detailImages);
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
        summary: "상품 등록(모든 이미지 한번에 등록)",
    }),
    (0, swagger_1.ApiOkResponse)({
        description: "작업 성공!",
        type: (Promise),
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Post)("/one-cue"),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: "mainImage", maxCount: 1 },
        { name: "additionalImages", maxCount: 5 },
        { name: "detailImages", maxCount: 10 },
    ])),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_g = typeof product_edit_request_dto_1.ProductEditRequestDto !== "undefined" && product_edit_request_dto_1.ProductEditRequestDto) === "function" ? _g : Object]),
    __metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], ProductController.prototype, "createProductWithImages", null);
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
    __metadata("design:paramtypes", [typeof (_j = typeof Array !== "undefined" && Array) === "function" ? _j : Object, String]),
    __metadata("design:returntype", typeof (_k = typeof Promise !== "undefined" && Promise) === "function" ? _k : Object)
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
    __metadata("design:paramtypes", [typeof (_l = typeof Array !== "undefined" && Array) === "function" ? _l : Object, String]),
    __metadata("design:returntype", typeof (_m = typeof Promise !== "undefined" && Promise) === "function" ? _m : Object)
], ProductController.prototype, "createProductDetailImages", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: "상품 목록 조회(페이징 처리) 및 검색 기능",
    }),
    (0, swagger_1.ApiOkResponse)({
        description: "작업 성공!",
        type: (Promise),
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_o = typeof product_search_request_dto_1.ProductSearchRequestDto !== "undefined" && product_search_request_dto_1.ProductSearchRequestDto) === "function" ? _o : Object]),
    __metadata("design:returntype", typeof (_p = typeof Promise !== "undefined" && Promise) === "function" ? _p : Object)
], ProductController.prototype, "getProductList", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: "상품 상세 조회",
    }),
    (0, swagger_1.ApiOkResponse)({
        description: "작업 성공!",
        type: (Promise),
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)("/:productId"),
    __param(0, (0, common_1.Param)("productId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_q = typeof Promise !== "undefined" && Promise) === "function" ? _q : Object)
], ProductController.prototype, "getProductDetail", null);
exports.ProductController = ProductController = __decorate([
    (0, swagger_1.ApiTags)("관리자 상품 관리 서비스"),
    (0, common_1.Controller)("admin/managements/products"),
    __param(0, (0, common_1.Inject)("ProductService")),
    __metadata("design:paramtypes", [typeof (_a = typeof product_service_1.ProductService !== "undefined" && product_service_1.ProductService) === "function" ? _a : Object])
], ProductController);


/***/ }),

/***/ 66:
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductEditRequestDto = void 0;
const swagger_1 = __webpack_require__(22);
const class_validator_1 = __webpack_require__(27);
const product_entity_1 = __webpack_require__(55);
const division_entity_1 = __webpack_require__(57);
const user_entity_1 = __webpack_require__(16);
const category_entity_1 = __webpack_require__(56);
class ProductEditRequestDto {
    toEntity(productCreateRequestDto) {
        const product = new product_entity_1.Product();
        product.user = new user_entity_1.User();
        product.user.userId = productCreateRequestDto.userId;
        product.category = new category_entity_1.Category();
        product.category.categoryId = productCreateRequestDto.categoryId;
        product.division = new division_entity_1.Division();
        product.division.divisionId = productCreateRequestDto.divisionId;
        product.productName = productCreateRequestDto.name;
        product.productCount = productCreateRequestDto.count;
        product.productPrice = productCreateRequestDto.price;
        product.productContent = productCreateRequestDto.content;
        product.productMainImageUrl = productCreateRequestDto.mainImageUrl;
        return product;
    }
}
exports.ProductEditRequestDto = ProductEditRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "이용자 고유 번호" }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], ProductEditRequestDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "구분 고유 번호" }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], ProductEditRequestDto.prototype, "divisionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "카테고리 고유 번호" }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], ProductEditRequestDto.prototype, "categoryId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "상품 이름 100자 이내" }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], ProductEditRequestDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "상품 보유 개수" }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], ProductEditRequestDto.prototype, "count", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "상품 개 당 가격" }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], ProductEditRequestDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "상품 상세 소개" }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    __metadata("design:type", String)
], ProductEditRequestDto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "상품 메인 사진 URL" }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    __metadata("design:type", String)
], ProductEditRequestDto.prototype, "mainImageUrl", void 0);


/***/ }),

/***/ 67:
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductSearchRequestDto = void 0;
const swagger_1 = __webpack_require__(22);
const page_request_dto_1 = __webpack_require__(68);
const sort_decorator_1 = __webpack_require__(69);
const sort_decorator_2 = __webpack_require__(69);
class ProductSearchRequestDto extends page_request_dto_1.PageRequestDto {
}
exports.ProductSearchRequestDto = ProductSearchRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "정렬 여부", required: false }),
    (0, sort_decorator_2.SortDecorator)(),
    __metadata("design:type", typeof (_a = typeof sort_decorator_1.Sort !== "undefined" && sort_decorator_1.Sort) === "function" ? _a : Object)
], ProductSearchRequestDto.prototype, "sort", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "상품 카테고리", required: false }),
    __metadata("design:type", String)
], ProductSearchRequestDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "상품 구분", required: false }),
    __metadata("design:type", String)
], ProductSearchRequestDto.prototype, "division", void 0);


/***/ }),

/***/ 65:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ 70:
/***/ ((module) => {

module.exports = require("@nestjs/swagger/dist/decorators/api-property.decorator");

/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("4c6596b971c332e8a3ff")
/******/ })();
/******/ 
/******/ }
;