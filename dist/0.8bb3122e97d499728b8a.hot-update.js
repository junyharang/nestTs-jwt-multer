"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductServiceImpl = void 0;
const common_1 = __webpack_require__(6);
const typeorm_1 = __webpack_require__(14);
const typeorm_2 = __webpack_require__(17);
const default_response_1 = __webpack_require__(20);
const product_entity_1 = __webpack_require__(55);
const product_additional_image_entity_1 = __webpack_require__(62);
const configuration_1 = __importDefault(__webpack_require__(8));
const product_edit_image_response_dto_1 = __webpack_require__(68);
const product_image_request_dto_1 = __webpack_require__(69);
const product_detail_image_entity_1 = __webpack_require__(63);
let ProductServiceImpl = class ProductServiceImpl {
    constructor(productRepository, productAdditionalImageRepository, productDetailImageRepository) {
        this.productRepository = productRepository;
        this.productAdditionalImageRepository = productAdditionalImageRepository;
        this.productDetailImageRepository = productDetailImageRepository;
    }
    async createProductMainImages(mainImage) {
        if (!mainImage) {
            throw new common_1.BadRequestException({ statusCode: 400, message: "업로드할 파일을 확인해 주세요." });
        }
        const imageContent = {
            imageUrl: `${(0, configuration_1.default)().server.url}:${(0, configuration_1.default)().server.port}/product/images/main/${mainImage.filename}`,
        };
        return default_response_1.DefaultResponse.responseWithData(common_1.HttpStatus.OK, "작업 성공!", imageContent);
    }
    async createProductAdditionalImages(additionalImages, productId) {
        if (!productId || !additionalImages || additionalImages.length === 0) {
            throw new common_1.BadRequestException({ statusCode: 400, message: "업로드할 파일을 확인해 주세요." });
        }
        console.log("createProductAdditionalImages()-productId 값: ");
        console.log(typeof productId);
        console.log(productId);
        const hoho = productId["productId"];
        console.log("createProductAdditionalImages()-productIdElement 값: ");
        console.log(typeof hoho);
        console.log(hoho);
        const number = parseInt(hoho);
        console.log("createProductAdditionalImages()-number 값: ");
        console.log(typeof number);
        console.log(number);
        return default_response_1.DefaultResponse.responseWithData(common_1.HttpStatus.OK, "작업 성공!", new product_edit_image_response_dto_1.ProductEditImageResponseDto(await this.imageStorageProcessors(number, additionalImages, "additional")));
    }
    async createProductDetailImages(detailImages, productId) {
        if (productId <= 0 || !detailImages || detailImages.length === 0) {
            throw new common_1.BadRequestException({ statusCode: 400, message: "업로드할 파일을 확인해 주세요." });
        }
        return default_response_1.DefaultResponse.responseWithData(common_1.HttpStatus.OK, "작업 성공!", new product_edit_image_response_dto_1.ProductEditImageResponseDto(await this.imageStorageProcessors(productId, detailImages, "detail")));
    }
    async createProduct(productEditRequestDto) {
        console.log("createProduct()-productEditRequestDto 값: ");
        console.log(productEditRequestDto);
        if (!productEditRequestDto) {
            throw new common_1.BadRequestException({ statusCode: 400, message: "상품 정보를 확인해 주세요." });
        }
        const product = await this.productRepository.save(productEditRequestDto.toEntity(productEditRequestDto));
        console.log("createProduct()-product 값: ");
        console.log(product);
        if (!product) {
            throw new common_1.InternalServerErrorException({ statusCode: 500, message: "상품 등록에 실패하였어요." });
        }
        return default_response_1.DefaultResponse.responseWithData(common_1.HttpStatus.OK, "작업 성공!", product.id);
    }
    async imageStorageProcessors(productId, images, category) {
        if (!images || images.length === 0) {
            throw new common_1.BadRequestException({ statusCode: 400, message: "업로드할 파일을 확인해 주세요." });
        }
        const result = [];
        for (const image of images) {
            if (category === "additional") {
                const saveImage = await this.productAdditionalImageRepository.save(product_image_request_dto_1.ProductImageRequestDto.toAdditionalImageEntity(productId, category, `${(0, configuration_1.default)().server.url}:${(0, configuration_1.default)().server.port}/product/images/additional/${image.filename}`));
                if (!saveImage) {
                    throw new common_1.InternalServerErrorException({ statusCode: 500, message: "상품 추가 이미지 등록에 실패하였어요. 관리자에게 문의해 주세요." });
                }
                const imageContent = {
                    imageId: saveImage.id,
                    imageCategory: saveImage.category,
                    imageUrl: saveImage.url,
                };
                result.push(imageContent);
            }
            else {
                const saveImage = await this.productDetailImageRepository.save(product_image_request_dto_1.ProductImageRequestDto.toDetailImageEntity(productId, category, `${(0, configuration_1.default)().server.url}:${(0, configuration_1.default)().server.port}/product/images/detail/${image.filename}`));
                if (!saveImage) {
                    throw new common_1.InternalServerErrorException({ statusCode: 500, message: "상품 추가 이미지 등록에 실패하였어요. 관리자에게 문의해 주세요." });
                }
                const imageContent = {
                    imageId: saveImage.id,
                    imageCategory: saveImage.category,
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
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __param(1, (0, typeorm_1.InjectRepository)(product_additional_image_entity_1.ProductAdditionalImage)),
    __param(2, (0, typeorm_1.InjectRepository)(product_detail_image_entity_1.ProductDetailImage)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object, typeof (_c = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _c : Object])
], ProductServiceImpl);


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("1a10b8d995e659dea74f")
/******/ })();
/******/ 
/******/ }
;