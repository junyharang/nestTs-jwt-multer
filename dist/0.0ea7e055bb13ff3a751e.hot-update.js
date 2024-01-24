"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 74:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
exports.ProductServiceImpl = void 0;
const common_1 = __webpack_require__(6);
const typeorm_1 = __webpack_require__(14);
const typeorm_2 = __webpack_require__(17);
const default_response_1 = __webpack_require__(20);
const product_entity_1 = __webpack_require__(55);
const product_additional_image_entity_1 = __webpack_require__(62);
const configuration_1 = __importDefault(__webpack_require__(8));
const product_edit_image_response_dto_1 = __webpack_require__(75);
const product_image_request_dto_1 = __webpack_require__(76);
const product_detail_image_entity_1 = __webpack_require__(63);
const product_list_response_dto_1 = __webpack_require__(77);
const product_repository_1 = __webpack_require__(78);
const page_1 = __webpack_require__(79);
const product_detail_response_dto_1 = __webpack_require__(80);
const fs = __importStar(__webpack_require__(9));
const path_1 = __webpack_require__(11);
const user_entity_1 = __webpack_require__(16);
const role_1 = __webpack_require__(18);
let ProductServiceImpl = class ProductServiceImpl {
    constructor(userRepository, productRepository, productQueryBuilderRepository, productAdditionalImageRepository, productDetailImageRepository) {
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.productQueryBuilderRepository = productQueryBuilderRepository;
        this.productAdditionalImageRepository = productAdditionalImageRepository;
        this.productDetailImageRepository = productDetailImageRepository;
    }
    async createProductMainImages(userTokenRequestDto, mainImage) {
        await this.permissionCheck(userTokenRequestDto);
        if (!mainImage) {
            throw new common_1.BadRequestException({ statusCode: 400, message: "업로드할 파일을 확인해 주세요." });
        }
        const imageContent = {
            imageUrl: `${(0, configuration_1.default)().server.url}:${(0, configuration_1.default)().server.port}/product/images/main/${mainImage[0].filename}`,
        };
        return default_response_1.DefaultResponse.responseWithData(common_1.HttpStatus.OK, "작업 성공!", imageContent);
    }
    async createProduct(userTokenRequestDto, productEditRequestDto) {
        await this.permissionCheck(userTokenRequestDto);
        if (!productEditRequestDto) {
            throw new common_1.BadRequestException({ statusCode: 400, message: "상품 정보를 확인해 주세요." });
        }
        const product = await this.productRepository.save(productEditRequestDto.toEntity(productEditRequestDto));
        if (!product) {
            throw new common_1.InternalServerErrorException({ statusCode: 500, message: "상품 등록에 실패하였어요." });
        }
        return default_response_1.DefaultResponse.responseWithData(common_1.HttpStatus.OK, "작업 성공!", product.productId);
    }
    async createProductAdditionalImages(userTokenRequestDto, additionalImages, productId) {
        await this.permissionCheck(userTokenRequestDto);
        if (!productId || !additionalImages || additionalImages.length === 0) {
            throw new common_1.BadRequestException({ statusCode: 400, message: "업로드할 파일을 확인해 주세요." });
        }
        return default_response_1.DefaultResponse.responseWithData(common_1.HttpStatus.OK, "작업 성공!", new product_edit_image_response_dto_1.ProductEditImageResponseDto(await this.imageCreatedStorageProcessors(parseInt(productId["productId"]), additionalImages, "additional")));
    }
    async createProductDetailImages(userTokenRequestDto, detailImages, productId) {
        await this.permissionCheck(userTokenRequestDto);
        if (!productId || !detailImages || detailImages.length === 0) {
            throw new common_1.BadRequestException({ statusCode: 400, message: "업로드할 파일을 확인해 주세요." });
        }
        return default_response_1.DefaultResponse.responseWithData(common_1.HttpStatus.OK, "작업 성공!", new product_edit_image_response_dto_1.ProductEditImageResponseDto(await this.imageCreatedStorageProcessors(parseInt(productId["productId"]), detailImages, "detail")));
    }
    async getProductList(userTokenRequestDto, productSearchRequestDto) {
        await this.permissionCheck(userTokenRequestDto);
        const findByProducts = await this.productQueryBuilderRepository.dynamicQuerySearchAndPagingByDto(productSearchRequestDto);
        if (!findByProducts || findByProducts[0].length === 0) {
            throw new common_1.BadRequestException({ statusCode: 404, message: "상품이 등록되지 않았어요. 상품 정보를 확인해 주세요." });
        }
        return default_response_1.DefaultResponse.responseWithPaginationAndData(common_1.HttpStatus.OK, "작업 성공!", new page_1.Page(findByProducts[0].length, findByProducts[1], findByProducts[0].map((product) => new product_list_response_dto_1.ProductListResponseDto(product))));
    }
    async getProductDetail(userTokenRequestDto, productId) {
        await this.permissionCheck(userTokenRequestDto);
        if (!userTokenRequestDto || !productId || productId <= 0) {
            throw new common_1.BadRequestException({ statusCode: 400, message: "상품 정보를 확인해 주세요." });
        }
        const product = await this.productQueryBuilderRepository.findByIdAndJoinOneThing(productId);
        if (!product) {
            throw new common_1.BadRequestException({ statusCode: 404, message: "상품 조회에 실패하였어요. 상품 정보를 확인해 주세요." });
        }
        return default_response_1.DefaultResponse.responseWithData(common_1.HttpStatus.OK, "작업 성공!", new product_detail_response_dto_1.ProductDetailResponseDto(product));
    }
    async viewImage(userTokenRequestDto, urn, response) {
        await this.permissionCheck(userTokenRequestDto);
        if (!urn) {
            throw new common_1.BadRequestException({ statusCode: 400, message: "이미지를 확인해 주세요." });
        }
        const fileUrn = urn["urn"];
        const storagePath = await this.parsingImageDivision(fileUrn);
        const fileNameMatch = fileUrn.match(/\/([^\/]+)$/);
        const fileName = fileNameMatch ? fileNameMatch[1] : null;
        console.log("viewImage()의 fileName: ", fileName);
        return default_response_1.DefaultResponse.responseWithData(common_1.HttpStatus.OK, "파일 조회 성공!", response.sendFile(fileName, { root: storagePath }));
    }
    async deleteProductMainImages(userTokenRequestDto, productCheckedIdRequestDto) {
        await this.permissionCheck(userTokenRequestDto);
        if (!userTokenRequestDto.email) {
            throw new common_1.NotFoundException({ statusCode: 404, message: "찾을 수 없어요." });
        }
        const product = await this.productQueryBuilderRepository.findByIdAndJoinOneThing(productCheckedIdRequestDto.productId);
        if (product === null) {
            throw new common_1.NotFoundException({ statusCode: 404, message: "상품 정보를 확인해 주세요." });
        }
        try {
            await this.productRepository.update(productCheckedIdRequestDto.productId, {
                productMainImageUrl: null,
            });
        }
        catch (error) {
            throw new common_1.InternalServerErrorException({ statusCode: 500, message: "상품 메인 이미지 삭제에 실패하였어요. 관리자에게 문의해 주세요." });
        }
        this.deleteOriginalImages("main", product.productMainImageUrl);
        return default_response_1.DefaultResponse.response(common_1.HttpStatus.OK, "작업 성공!");
    }
    async updateProduct(userTokenRequestDto, productUpdateRequestDto) {
        await this.permissionCheck(userTokenRequestDto);
        if (!productUpdateRequestDto) {
            throw new common_1.BadRequestException({ statusCode: 400, message: "상품 정보를 확인해 주세요." });
        }
        const product = await this.productQueryBuilderRepository.findByIdAndJoinOneThing(productUpdateRequestDto.productId);
        if (product === null) {
            throw new common_1.NotFoundException({ statusCode: 404, message: "상품 정보를 확인해 주세요." });
        }
        try {
            if (productUpdateRequestDto.mainImageUrl) {
                await this.productRepository.update(productUpdateRequestDto.productId, {
                    productName: productUpdateRequestDto.name,
                    productCount: productUpdateRequestDto.count,
                    productPrice: productUpdateRequestDto.price,
                    productContent: productUpdateRequestDto.content,
                    productMainImageUrl: productUpdateRequestDto.mainImageUrl,
                });
            }
            else {
                await this.productRepository.update(productUpdateRequestDto.productId, {
                    productName: productUpdateRequestDto.name,
                    productCount: productUpdateRequestDto.count,
                    productPrice: productUpdateRequestDto.price,
                    productContent: productUpdateRequestDto.content,
                });
            }
        }
        catch (error) {
            throw new common_1.InternalServerErrorException({ statusCode: 500, message: "상품 수정에 실패하였어요. 관리자에게 문의해 주세요." });
        }
        return default_response_1.DefaultResponse.responseWithData(common_1.HttpStatus.OK, "작업 성공!", product.productId);
    }
    async deleteProductAdditionalImages(userTokenRequestDto, productImageDeleteRequestDto) {
        await this.permissionCheck(userTokenRequestDto);
        if (!productImageDeleteRequestDto) {
            throw new common_1.BadRequestException({ statusCode: 400, message: "요청을 확인해 주세요." });
        }
        if (!userTokenRequestDto.email) {
            throw new common_1.NotFoundException({ statusCode: 404, message: "찾을 수 없어요." });
        }
        if (!productImageDeleteRequestDto.productId) {
            throw new common_1.BadRequestException({ statusCode: 400, message: "상품 정보를 확인해 주세요." });
        }
        const product = await this.productQueryBuilderRepository.findByIdAndJoinOneThing(productImageDeleteRequestDto.productId);
        if (!product) {
            throw new common_1.NotFoundException({ statusCode: 404, message: "상품 정보를 확인해 주세요." });
        }
        const url = [];
        for (const imageUrl of productImageDeleteRequestDto.arrayUrl) {
            const deleteTarget = await this.productAdditionalImageRepository.findOne({ where: { url: imageUrl } });
            if (!deleteTarget) {
                throw new common_1.NotFoundException({ statusCode: 404, message: "삭제 대상을 찾을 수 없어요." });
            }
            try {
                await this.productAdditionalImageRepository.delete(deleteTarget.id);
            }
            catch (error) {
                throw new common_1.InternalServerErrorException({ statusCode: 500, message: "상품 추가 이미지 삭제에 실패하였어요. 관리자에게 문의해 주세요." });
            }
            this.deleteOriginalImages("additional", imageUrl);
            url.push(imageUrl);
        }
        return default_response_1.DefaultResponse.responseWithData(common_1.HttpStatus.OK, "작업 성공!", { deleteTarget: { url: url } });
    }
    async deleteProductDetailImages(userTokenRequestDto, productImageDeleteRequestDto) {
        await this.permissionCheck(userTokenRequestDto);
        if (!productImageDeleteRequestDto) {
            throw new common_1.BadRequestException({ statusCode: 400, message: "요청을 확인해 주세요." });
        }
        if (!productImageDeleteRequestDto.productId) {
            throw new common_1.BadRequestException({ statusCode: 400, message: "상품 정보를 확인해 주세요." });
        }
        const product = await this.productQueryBuilderRepository.findByIdAndJoinOneThing(productImageDeleteRequestDto.productId);
        if (!product) {
            throw new common_1.NotFoundException({ statusCode: 404, message: "상품 정보를 확인해 주세요." });
        }
        const url = [];
        for (const imageUrl of productImageDeleteRequestDto.arrayUrl) {
            const deleteTarget = await this.productDetailImageRepository.findOne({ where: { url: imageUrl } });
            if (!deleteTarget) {
                throw new common_1.NotFoundException({ statusCode: 404, message: "삭제 대상을 찾을 수 없어요." });
            }
            try {
                await this.productDetailImageRepository.delete(deleteTarget.id);
            }
            catch (error) {
                throw new common_1.InternalServerErrorException({ statusCode: 500, message: "상품 상세 이미지 삭제에 실패하였어요. 관리자에게 문의해 주세요." });
            }
            this.deleteOriginalImages("detail", imageUrl);
            url.push(imageUrl);
        }
        return default_response_1.DefaultResponse.responseWithData(common_1.HttpStatus.OK, "작업 성공!", { deleteTarget: { url: url } });
    }
    async deleteProduct(userTokenRequestDto, productCheckedIdRequestDto) {
        await this.permissionCheck(userTokenRequestDto);
        if (!productCheckedIdRequestDto) {
            throw new common_1.NotFoundException({ statusCode: 404, message: "찾을 수 없어요." });
        }
        if (!productCheckedIdRequestDto.productId) {
            throw new common_1.BadRequestException({ statusCode: 400, message: "상품 정보를 확인해 주세요." });
        }
        const product = await this.productQueryBuilderRepository.findByIdAndJoinOneThing(productCheckedIdRequestDto.productId);
        if (!product) {
            throw new common_1.NotFoundException({ statusCode: 404, message: "상품 정보를 확인해 주세요." });
        }
        try {
            await this.productRepository.softDelete(productCheckedIdRequestDto.productId);
            return default_response_1.DefaultResponse.responseWithData(common_1.HttpStatus.OK, "작업 성공!", product.productId);
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException({ statusCode: 500, message: "상품 삭제에 실패하였어요. 관리자에게 문의해 주세요." });
        }
    }
    async restoreProduct(userTokenRequestDto, productCheckedIdRequestDto) {
        await this.permissionCheck(userTokenRequestDto);
        if (!productCheckedIdRequestDto) {
            throw new common_1.NotFoundException({ statusCode: 404, message: "찾을 수 없어요." });
        }
        if (!productCheckedIdRequestDto.productId) {
            throw new common_1.BadRequestException({ statusCode: 400, message: "상품 정보를 확인해 주세요." });
        }
        const product = await this.productRepository.findOne({
            where: { productId: productCheckedIdRequestDto.productId },
            withDeleted: true,
        });
        if (!product) {
            throw new common_1.NotFoundException({ statusCode: 404, message: "상품 정보를 확인해 주세요." });
        }
        try {
            await this.productRepository.restore(productCheckedIdRequestDto.productId);
            return default_response_1.DefaultResponse.responseWithData(common_1.HttpStatus.OK, "작업 성공!", product.productId);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException({ statusCode: 500, message: "상품 복구에 실패하였어요. 관리자에게 문의해 주세요." });
        }
    }
    deleteOriginalImages(imageDivision, productMainImageUrl) {
        const directoryPath = productMainImageUrl.replace(/:\d+/, "");
        const imageName = directoryPath.match(/\/([^\/]+)$/)[1];
        let originalImageDirectoryPath;
        if (imageDivision === "main") {
            originalImageDirectoryPath = "./local/storage/product/main/images/" + imageName;
        }
        else if (imageDivision === "additional") {
            originalImageDirectoryPath = "./local/storage/product/additional/images/" + imageName;
        }
        else {
            originalImageDirectoryPath = "./local/storage/product/detail/images/" + imageName;
        }
        if (fs.existsSync(originalImageDirectoryPath)) {
            fs.unlink(originalImageDirectoryPath, (error) => {
                if (error) {
                    throw new common_1.InternalServerErrorException({ statusCode: 500, message: "파일 삭제에 실패하였어요. 관리자에게 문의해 주세요." });
                }
                else {
                    (0, path_1.resolve)();
                }
            });
        }
        else {
            (0, path_1.resolve)();
            throw new common_1.InternalServerErrorException({ statusCode: 500, message: "삭제 대상 파일이 존재하지 않아요. 관리자에게 문의해 주세요." });
        }
    }
    async imageCreatedStorageProcessors(productId, images, category) {
        if (!images || images.length === 0) {
            throw new common_1.BadRequestException({ statusCode: 400, message: "업로드할 파일을 확인해 주세요." });
        }
        const result = [];
        for (const image of images) {
            if (category === "additional") {
                const saveImage = await this.productAdditionalImageRepository.save(product_image_request_dto_1.ProductImageRequestDto.toAdditionalImageEntity(productId, `${(0, configuration_1.default)().server.url}:${(0, configuration_1.default)().server.port}/product/images/additional/${image.filename}`));
                if (!saveImage) {
                    throw new common_1.InternalServerErrorException({ statusCode: 500, message: "상품 추가 이미지 등록에 실패하였어요. 관리자에게 문의해 주세요." });
                }
                const imageContent = {
                    imageId: saveImage.id,
                    imageUrl: saveImage.url,
                };
                result.push(imageContent);
            }
            else {
                const saveImage = await this.productDetailImageRepository.save(product_image_request_dto_1.ProductImageRequestDto.toDetailImageEntity(productId, `${(0, configuration_1.default)().server.url}:${(0, configuration_1.default)().server.port}/product/images/detail/${image.filename}`));
                if (!saveImage) {
                    throw new common_1.InternalServerErrorException({ statusCode: 500, message: "상품 추가 이미지 등록에 실패하였어요. 관리자에게 문의해 주세요." });
                }
                const imageContent = {
                    imageId: saveImage.id,
                    imageUrl: saveImage.url,
                };
                result.push(imageContent);
            }
        }
        return result;
    }
    async parsingImageDivision(fileUrn) {
        const regExpMatchArray = fileUrn.match(/\/product\/images\/([^\/]+)/);
        if (!regExpMatchArray) {
            throw new common_1.BadRequestException({ statusCode: 400, message: "이미지를 확인해 주세요." });
        }
        return await this.checkImageExistence(fileUrn, regExpMatchArray[1]);
    }
    async checkImageExistence(fileUrn, imageDivision) {
        const fileUrl = `${(0, configuration_1.default)().server.url}:${(0, configuration_1.default)().server.port}${fileUrn}`;
        console.log("viewImage()의 fileUrl: ", fileUrl);
        if (imageDivision === "main") {
            if (!(await this.productRepository.findOne({ where: { productMainImageUrl: fileUrl } }))) {
                throw new common_1.BadRequestException({ statusCode: 404, message: "상품 정보를 확인해 주세요." });
            }
            return "./local/storage/product/main/images";
        }
        else if (imageDivision === "additional") {
            if (!(await this.productAdditionalImageRepository.findOne({ where: { url: fileUrl } }))) {
                throw new common_1.BadRequestException({ statusCode: 404, message: "상품 정보를 확인해 주세요." });
            }
            return "./local/storage/product/additional/images";
        }
        else {
            if (!(await this.productDetailImageRepository.findOne({ where: { url: fileUrl } }))) {
                throw new common_1.BadRequestException({ statusCode: 404, message: "상품 정보를 확인해 주세요." });
            }
            return "./local/storage/product/detail/images";
        }
    }
    async permissionCheck(userTokenRequestDto) {
        if (!userTokenRequestDto) {
            throw new common_1.BadRequestException({ statusCode: 400, message: "상품 정보를 확인해 주세요." });
        }
        const user = await this.userRepository.findOne({ where: { email: userTokenRequestDto.email } });
        if (!user || user.userRole !== role_1.Role.ADMIN) {
            throw new common_1.NotFoundException({ statusCode: 404, message: "찾을 수 없어요." });
        }
    }
};
exports.ProductServiceImpl = ProductServiceImpl;
exports.ProductServiceImpl = ProductServiceImpl = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __param(2, (0, common_1.Inject)("ProductQueryBuilderRepository")),
    __param(3, (0, typeorm_1.InjectRepository)(product_additional_image_entity_1.ProductAdditionalImage)),
    __param(4, (0, typeorm_1.InjectRepository)(product_detail_image_entity_1.ProductDetailImage)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object, typeof (_c = typeof product_repository_1.ProductRepository !== "undefined" && product_repository_1.ProductRepository) === "function" ? _c : Object, typeof (_d = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _d : Object, typeof (_e = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _e : Object])
], ProductServiceImpl);


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("ae01b9447f94f4b384e0")
/******/ })();
/******/ 
/******/ }
;