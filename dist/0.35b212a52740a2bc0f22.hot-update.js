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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y;
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
    async updateProduct(productUpdateRequestDto) {
        return this.productService.updateProduct(productUpdateRequestDto);
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
    (0, common_1.Patch)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_x = typeof product_update_request_dto_1.ProductUpdateRequestDto !== "undefined" && product_update_request_dto_1.ProductUpdateRequestDto) === "function" ? _x : Object]),
    __metadata("design:returntype", typeof (_y = typeof Promise !== "undefined" && Promise) === "function" ? _y : Object)
], ProductController.prototype, "updateProduct", null);
exports.ProductController = ProductController = __decorate([
    (0, swagger_1.ApiTags)("관리자 상품 관리 서비스"),
    (0, common_1.Controller)("admin/managements/products"),
    __param(0, (0, common_1.Inject)("ProductService")),
    __metadata("design:paramtypes", [typeof (_a = typeof product_service_1.ProductService !== "undefined" && product_service_1.ProductService) === "function" ? _a : Object])
], ProductController);


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("78238baf9bcdb322082b")
/******/ })();
/******/ 
/******/ }
;