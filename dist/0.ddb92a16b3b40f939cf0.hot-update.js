"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 97:
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
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserProductServiceImpl = void 0;
const common_1 = __webpack_require__(6);
const typeorm_1 = __webpack_require__(14);
const typeorm_2 = __webpack_require__(17);
const page_1 = __webpack_require__(79);
const user_entity_1 = __webpack_require__(16);
const role_1 = __webpack_require__(18);
const product_entity_1 = __webpack_require__(55);
const product_repository_1 = __webpack_require__(78);
const default_response_1 = __webpack_require__(20);
const product_list_response_dto_1 = __webpack_require__(77);
const product_detail_response_dto_1 = __webpack_require__(80);
const product_additional_image_entity_1 = __webpack_require__(62);
const product_detail_image_entity_1 = __webpack_require__(63);
const configuration_1 = __importDefault(__webpack_require__(8));
let UserProductServiceImpl = class UserProductServiceImpl {
    constructor(userRepository, productRepository, productAdditionalImageRepository, productDetailImageRepository, productQueryBuilderRepository) {
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.productAdditionalImageRepository = productAdditionalImageRepository;
        this.productDetailImageRepository = productDetailImageRepository;
        this.productQueryBuilderRepository = productQueryBuilderRepository;
    }
    async getUserProductList(productSearchRequestDto) {
        const findByProducts = await this.productQueryBuilderRepository.dynamicQuerySearchAndPagingByDto(productSearchRequestDto);
        if (!findByProducts || findByProducts[0].length === 0) {
            throw new common_1.BadRequestException({ statusCode: 404, message: "상품이 등록되지 않았어요. 상품 정보를 확인해 주세요." });
        }
        return default_response_1.DefaultResponse.responseWithPaginationAndData(common_1.HttpStatus.OK, "작업 성공!", new page_1.Page(findByProducts[0].length, findByProducts[1], findByProducts[0].map((product) => new product_list_response_dto_1.ProductListResponseDto(product))));
    }
    async getUserProductDetail(userTokenRequestDto, productId) {
        if (!productId || productId <= 0) {
            throw new common_1.BadRequestException({ statusCode: 400, message: "상품 정보를 확인해 주세요." });
        }
        this.permissionCheck(userTokenRequestDto);
        const product = await this.productQueryBuilderRepository.findByIdAndJoinOneThing(productId);
        if (!product) {
            throw new common_1.BadRequestException({ statusCode: 404, message: "상품 조회에 실패하였어요. 상품 정보를 확인해 주세요." });
        }
        return default_response_1.DefaultResponse.responseWithData(common_1.HttpStatus.OK, "작업 성공!", new product_detail_response_dto_1.ProductDetailResponseDto(product));
    }
    async viewImage(userTokenRequestDto, urn, response) {
        if (!urn) {
            throw new common_1.BadRequestException({ statusCode: 400, message: "이미지를 확인해 주세요." });
        }
        const fileUrn = urn["urn"];
        this.parsingImageDivision(fileUrn);
        const fileNameMatch = urn.match(/\/([^\/]+)$/);
        const fileName = fileNameMatch ? fileNameMatch[1] : null;
        return default_response_1.DefaultResponse.responseWithData(common_1.HttpStatus.OK, "파일 조회 성공!", response.sendFile(fileName, { root: "./local/storage/images" }));
    }
    parsingImageDivision(fileUrn) {
        console.log(typeof fileUrn);
        console.log("viewImage()의 urn: ", fileUrn);
        const regExpMatchArray = fileUrn.match(/\/product\/images\/([^\/]+)/);
        if (!regExpMatchArray) {
            throw new common_1.BadRequestException({ statusCode: 400, message: "이미지를 확인해 주세요." });
        }
        this.checkImageExistence(fileUrn, regExpMatchArray[1]);
    }
    async checkImageExistence(fileUrn, imageDivision) {
        const fileUrl = `${(0, configuration_1.default)().server.url}:${(0, configuration_1.default)().server.port}${fileUrn}`;
        console.log("viewImage()의 fileUrl: ", fileUrl);
        if (imageDivision === "main") {
            if (!(await this.productRepository.findOne({ where: { productMainImageUrl: fileUrl } }))) {
                throw new common_1.BadRequestException({ statusCode: 404, message: "상품 정보를 확인해 주세요." });
            }
        }
        else if (imageDivision === "additional") {
            if (!(await this.productAdditionalImageRepository.findOne({ where: { url: fileUrl } }))) {
                throw new common_1.BadRequestException({ statusCode: 404, message: "상품 정보를 확인해 주세요." });
            }
        }
        else {
            if (!(await this.productDetailImageRepository.findOne({ where: { url: fileUrl } }))) {
                throw new common_1.BadRequestException({ statusCode: 404, message: "상품 정보를 확인해 주세요." });
            }
        }
    }
    async permissionCheck(userTokenRequestDto) {
        console.log("permissionCheck()의 userTokenRequestDto: ", userTokenRequestDto);
        if (!userTokenRequestDto) {
            throw new common_1.BadRequestException({ statusCode: 400, message: "상품 정보를 확인해 주세요." });
        }
        const user = await this.userRepository.findOne({ where: { email: userTokenRequestDto.email } });
        if (!user || user.userRole !== role_1.Role.USER) {
            throw new common_1.NotFoundException({ statusCode: 404, message: "찾을 수 없어요." });
        }
    }
};
exports.UserProductServiceImpl = UserProductServiceImpl;
exports.UserProductServiceImpl = UserProductServiceImpl = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __param(2, (0, typeorm_1.InjectRepository)(product_additional_image_entity_1.ProductAdditionalImage)),
    __param(3, (0, typeorm_1.InjectRepository)(product_detail_image_entity_1.ProductDetailImage)),
    __param(4, (0, common_1.Inject)("ProductQueryBuilderRepository")),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object, typeof (_c = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _c : Object, typeof (_d = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _d : Object, typeof (_e = typeof product_repository_1.ProductRepository !== "undefined" && product_repository_1.ProductRepository) === "function" ? _e : Object])
], UserProductServiceImpl);


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("c552aa021adecc8e423a")
/******/ })();
/******/ 
/******/ }
;