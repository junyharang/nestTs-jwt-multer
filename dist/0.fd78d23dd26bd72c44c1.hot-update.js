"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 63:
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
exports.ProductDetailImage = void 0;
const typeorm_1 = __webpack_require__(17);
const product_entity_1 = __webpack_require__(55);
let ProductDetailImage = class ProductDetailImage {
};
exports.ProductDetailImage = ProductDetailImage;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("increment", { type: "int", comment: "상품 사진 고유 번호" }),
    __metadata("design:type", Number)
], ProductDetailImage.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entity_1.Product, (product) => product.productId, { nullable: false, onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)([{ name: "product_id", referencedColumnName: "productId" }]),
    __metadata("design:type", typeof (_a = typeof product_entity_1.Product !== "undefined" && product_entity_1.Product) === "function" ? _a : Object)
], ProductDetailImage.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "url", length: 255, comment: "이미지 URN" }),
    __metadata("design:type", String)
], ProductDetailImage.prototype, "url", void 0);
exports.ProductDetailImage = ProductDetailImage = __decorate([
    (0, typeorm_1.Entity)()
], ProductDetailImage);


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("35b212a52740a2bc0f22")
/******/ })();
/******/ 
/******/ }
;