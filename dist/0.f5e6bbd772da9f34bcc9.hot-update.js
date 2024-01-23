"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 83:
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductQueryBuilderRepository = void 0;
const common_1 = __webpack_require__(6);
const typeorm_1 = __webpack_require__(14);
const product_entity_1 = __webpack_require__(55);
const typeorm_2 = __webpack_require__(17);
let ProductQueryBuilderRepository = class ProductQueryBuilderRepository {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    async dynamicQuerySearchAndPagingByDto(productSearchRequestDto) {
        const selectQueryBuilder = this.productRepository
            .createQueryBuilder("product")
            .leftJoinAndSelect("product.user", "author")
            .leftJoinAndSelect("product.category", "category")
            .leftJoinAndSelect("product.division", "division")
            .take(productSearchRequestDto.getLimit())
            .skip(productSearchRequestDto.getOffset());
        if (productSearchRequestDto.category) {
            selectQueryBuilder.andWhere("category.categoryName LIKE :category", { category: `%${productSearchRequestDto.category}%` });
        }
        if (productSearchRequestDto.division) {
            selectQueryBuilder.andWhere("division.divisionName LIKE :division", { division: `%${productSearchRequestDto.division}%` });
        }
        selectQueryBuilder.orderBy("product.productId", productSearchRequestDto.sort);
        return await selectQueryBuilder.getManyAndCount();
    }
    findByIdAndJoinOneThing(productId) {
        return this.productRepository
            .createQueryBuilder("product")
            .leftJoinAndSelect("product.user", "author")
            .leftJoinAndSelect("product.category", "category")
            .leftJoinAndSelect("product.division", "division")
            .leftJoinAndSelect("product.productAdditionalImages", "productAdditionalImages")
            .leftJoinAndSelect("product.productDetailImages", "productDetailImages")
            .where("product.productId = :productId", { productId })
            .getOne();
    }
    isDeletedFindByIdAndJoinOneThing(productId) {
        return this.productRepository
            .createQueryBuilder("product")
            .leftJoinAndSelect("product.user", "author")
            .leftJoinAndSelect("product.category", "category")
            .leftJoinAndSelect("product.division", "division")
            .leftJoinAndSelect("product.productAdditionalImages", "productAdditionalImages")
            .leftJoinAndSelect("product.productDetailImages", "productDetailImages")
            .where("product.productId = :productId", { productId })
            .andWhere("product.deletedDateTime IS NOT NULL")
            .getOne();
    }
};
exports.ProductQueryBuilderRepository = ProductQueryBuilderRepository;
exports.ProductQueryBuilderRepository = ProductQueryBuilderRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], ProductQueryBuilderRepository);


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("31bc41d96bf919621460")
/******/ })();
/******/ 
/******/ }
;