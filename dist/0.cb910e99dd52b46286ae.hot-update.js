"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 69:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductImageRequestDto = void 0;
const product_additional_image_entity_1 = __webpack_require__(62);
const product_detail_image_entity_1 = __webpack_require__(63);
const product_entity_1 = __webpack_require__(55);
class ProductImageRequestDto {
    static toAdditionalImageEntity(productId, category, imageUrl) {
        const productAdditionalImage = new product_additional_image_entity_1.ProductAdditionalImage();
        productAdditionalImage.product = new product_entity_1.Product();
        productAdditionalImage.product.id = productId;
        productAdditionalImage.category = category;
        productAdditionalImage.url = imageUrl;
        return productAdditionalImage;
    }
    static toDetailImageEntity(productId, category, imageUrl) {
        const productDetailImage = new product_detail_image_entity_1.ProductDetailImage();
        productDetailImage.product = new product_entity_1.Product();
        productDetailImage.product.id = productId;
        productDetailImage.category = category;
        productDetailImage.url = imageUrl;
        return productDetailImage;
    }
}
exports.ProductImageRequestDto = ProductImageRequestDto;


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("f90812deb0683b15199c")
/******/ })();
/******/ 
/******/ }
;