"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

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


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("638d5a6be31a0e8ea453")
/******/ })();
/******/ 
/******/ }
;