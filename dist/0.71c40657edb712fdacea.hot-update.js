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


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("97bb6162dfae9a102af3")
/******/ })();
/******/ 
/******/ }
;