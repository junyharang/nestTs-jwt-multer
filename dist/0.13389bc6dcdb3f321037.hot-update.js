"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 65:
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
const product_image_entity_1 = __webpack_require__(62);
class ImageRequestDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: "이미지 고유 번호" }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], ImageRequestDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "이미지 구분" }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    __metadata("design:type", String)
], ImageRequestDto.prototype, "catetory", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "이미지 URL" }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    __metadata("design:type", String)
], ImageRequestDto.prototype, "url", void 0);
class ProductEditRequestDto {
    static toEntity(productCreateRequestDto) {
        const product = new product_entity_1.Product();
        product.user = new user_entity_1.User();
        product.user.id = productCreateRequestDto.userId;
        product.category = new category_entity_1.Category();
        product.category.id = productCreateRequestDto.categoryId;
        product.division = new division_entity_1.Division();
        product.division.id = productCreateRequestDto.divisionId;
        product.name = productCreateRequestDto.productName;
        product.count = productCreateRequestDto.productCount;
        product.price = productCreateRequestDto.productPrice;
        product.content = productCreateRequestDto.productContent;
        product.mainImages = productCreateRequestDto.mainImages.map((imageDto) => {
            const mainImage = new product_image_entity_1.ProductImage();
            mainImage.id = imageDto.id;
            mainImage.category = imageDto.catetory;
            mainImage.url = imageDto.url;
            return mainImage;
        });
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
], ProductEditRequestDto.prototype, "productName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "상품 보유 개수" }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], ProductEditRequestDto.prototype, "productCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "상품 개 당 가격" }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], ProductEditRequestDto.prototype, "productPrice", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "상품 상세 소개" }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    __metadata("design:type", String)
], ProductEditRequestDto.prototype, "productContent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "상품 메인 사진 정보들", type: [ImageRequestDto] }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    __metadata("design:type", Array)
], ProductEditRequestDto.prototype, "mainImages", void 0);


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("7ba69d5b2288f209751b")
/******/ })();
/******/ 
/******/ }
;