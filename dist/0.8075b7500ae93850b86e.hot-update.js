"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 95:
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
var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserProductController = void 0;
const swagger_1 = __webpack_require__(22);
const common_1 = __webpack_require__(6);
const default_response_1 = __webpack_require__(20);
const product_search_request_dto_1 = __webpack_require__(67);
const jwt_authentication_guard_1 = __webpack_require__(30);
const user_token_request_dto_1 = __webpack_require__(33);
const user_product_service_1 = __webpack_require__(96);
const express_1 = __webpack_require__(32);
let UserProductController = class UserProductController {
    constructor(userProductService) {
        this.userProductService = userProductService;
    }
    async getUserProductList(productSearchRequestDto) {
        return this.userProductService.getUserProductList(productSearchRequestDto);
    }
    async getUserProductDetail(userTokenRequestDto, productId) {
        return this.userProductService.getUserProductDetail(userTokenRequestDto, productId);
    }
    viewImage(userTokenRequestDto, urn, response) {
        return this.userProductService.viewImage(userTokenRequestDto, urn, response);
    }
};
exports.UserProductController = UserProductController;
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
    __metadata("design:paramtypes", [typeof (_b = typeof product_search_request_dto_1.ProductSearchRequestDto !== "undefined" && product_search_request_dto_1.ProductSearchRequestDto) === "function" ? _b : Object]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], UserProductController.prototype, "getUserProductList", null);
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
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_authentication_guard_1.JwtAuthenticationGuard),
    __param(0, (0, user_token_request_dto_1.GetUserInfo)()),
    __param(1, (0, common_1.Param)("productId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof user_token_request_dto_1.UserTokenRequestDto !== "undefined" && user_token_request_dto_1.UserTokenRequestDto) === "function" ? _d : Object, Number]),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], UserProductController.prototype, "getUserProductDetail", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: "이미지 배열 출력 기능",
    }),
    (0, swagger_1.ApiOkResponse)({
        description: "성공!",
        type: (default_response_1.DefaultResponse),
    }),
    (0, swagger_1.ApiQuery)({
        name: "urn",
        required: true,
        description: "조회할 상품 이미지 URN",
    }),
    (0, common_1.Get)("/image"),
    __param(0, (0, user_token_request_dto_1.GetUserInfo)()),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_f = typeof user_token_request_dto_1.UserTokenRequestDto !== "undefined" && user_token_request_dto_1.UserTokenRequestDto) === "function" ? _f : Object, String, typeof (_g = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _g : Object]),
    __metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], UserProductController.prototype, "viewImage", null);
exports.UserProductController = UserProductController = __decorate([
    (0, swagger_1.ApiTags)("이용자 상품 조회 서비스"),
    (0, common_1.Controller)("products"),
    __param(0, (0, common_1.Inject)("UserProductService")),
    __metadata("design:paramtypes", [typeof (_a = typeof user_product_service_1.UserProductService !== "undefined" && user_product_service_1.UserProductService) === "function" ? _a : Object])
], UserProductController);


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("0f933477932fe6a0b00a")
/******/ })();
/******/ 
/******/ }
;