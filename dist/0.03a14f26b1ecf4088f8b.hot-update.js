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
    async parsingImageDivision(fileUrn) {
        const regExpMatchArray = fileUrn.match(/\/product\/images\/([^\/]+)/);
        if (!regExpMatchArray) {
            throw new common_1.BadRequestException({ statusCode: 400, message: "이미지를 확인해 주세요." });
        }
        return await this.checkImageExistence(fileUrn, regExpMatchArray[1]);
    }
    async checkImageExistence(fileUrn, imageDivision) {
        const fileUrl = `${(0, configuration_1.default)().server.url}:${(0, configuration_1.default)().server.port}${fileUrn}`;
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
        if (!user || user.userRole === null) {
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


/***/ }),

/***/ 52:
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FileServiceImpl = void 0;
const common_1 = __webpack_require__(6);
const default_response_1 = __webpack_require__(20);
const configuration_1 = __importDefault(__webpack_require__(8));
const typeorm_1 = __webpack_require__(14);
const file_entity_1 = __webpack_require__(53);
const typeorm_2 = __webpack_require__(17);
let FileServiceImpl = class FileServiceImpl {
    constructor(fileRepository) {
        this.fileRepository = fileRepository;
    }
    async uploadImage(image) {
        if (!image) {
            return default_response_1.DefaultResponse.response(common_1.HttpStatus.BAD_REQUEST, "업로드할 파일을 확인해 주세요.");
        }
        const file = await this.fileRepository.save(new file_entity_1.File(image.fieldname, image.originalname, image.encoding, image.mimetype, image.destination, image.filename, image.path, image.size, `${(0, configuration_1.default)().server.url}:${(0, configuration_1.default)().server.port}/file/images/view/${image.filename}`));
        const imageContent = {
            imageId: file.id,
            imageUrl: file.url,
        };
        return default_response_1.DefaultResponse.responseWithData(common_1.HttpStatus.CREATED, "파일 업로드 성공!", imageContent);
    }
    async uploadImages(images) {
        if (!images || images.length === 0) {
            return default_response_1.DefaultResponse.response(common_1.HttpStatus.BAD_REQUEST, "업로드할 파일을 확인해 주세요.");
        }
        const result = [];
        for (const image of images) {
            const saveFile = await this.fileRepository.save(new file_entity_1.File(image.fieldname, image.originalname, image.encoding, image.mimetype, image.destination, image.filename, image.path, image.size, `${(0, configuration_1.default)().server.url}:${(0, configuration_1.default)().server.port}/file/images/view/${image.filename}`));
            if (!saveFile) {
                default_response_1.DefaultResponse.response(common_1.HttpStatus.BAD_REQUEST, "파일 업로드에 실패했어요.");
            }
            const imageContent = {
                imageId: saveFile.id,
                imageUrl: saveFile.url,
            };
            result.push(imageContent);
        }
        return default_response_1.DefaultResponse.responseWithData(common_1.HttpStatus.CREATED, "파일 업로드 성공!", result);
    }
    async getImageUrl(imageId) {
        if (imageId <= 0 || !imageId) {
            return default_response_1.DefaultResponse.response(common_1.HttpStatus.BAD_REQUEST, "조회할 파일 정보를 확인해 주세요.");
        }
        const id = imageId;
        const image = await this.fileRepository.findOne({ where: { id } });
        if (!image) {
            throw new common_1.NotFoundException({ statusCode: 404, message: "요청에 대한 내용을 찾지 못했어요." });
        }
        return default_response_1.DefaultResponse.responseWithData(common_1.HttpStatus.OK, "성공!", image.url);
    }
    async getImagesUrl(imageIds) {
        if (!imageIds || imageIds.length === 0) {
            return default_response_1.DefaultResponse.response(common_1.HttpStatus.BAD_REQUEST, "조회할 파일 정보를 확인해 주세요.");
        }
        const images = [];
        for (const id of imageIds) {
            const image = await this.fileRepository.findOne({ where: { id } });
            if (image) {
                images.push({ imageUrl: image.url });
            }
        }
        return default_response_1.DefaultResponse.responseWithData(common_1.HttpStatus.OK, "조회 성공!", images);
    }
};
exports.FileServiceImpl = FileServiceImpl;
exports.FileServiceImpl = FileServiceImpl = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(file_entity_1.File)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], FileServiceImpl);


/***/ }),

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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductController = void 0;
const swagger_1 = __webpack_require__(22);
const common_1 = __webpack_require__(6);
const default_response_1 = __webpack_require__(20);
const product_service_1 = __webpack_require__(65);
const product_edit_request_dto_1 = __webpack_require__(66);
const platform_express_1 = __webpack_require__(48);
const multer_options_1 = __webpack_require__(51);
const product_search_request_dto_1 = __webpack_require__(67);
const product_update_request_dto_1 = __webpack_require__(71);
const product_checked_id_request_dto_1 = __webpack_require__(72);
const product_image_delete_request_dto_1 = __webpack_require__(73);
const jwt_authentication_guard_1 = __webpack_require__(30);
const user_token_request_dto_1 = __webpack_require__(33);
const express_1 = __webpack_require__(32);
let ProductController = class ProductController {
    constructor(productService) {
        this.productService = productService;
    }
    async createProductMainImages(userTokenRequestDto, mainImage) {
        return this.productService.createProductMainImages(userTokenRequestDto, mainImage);
    }
    async createProduct(userTokenRequestDto, productEditRequestDto) {
        return this.productService.createProduct(userTokenRequestDto, productEditRequestDto);
    }
    async createProductAdditionalImages(additionalImages, productId, userTokenRequestDto) {
        return this.productService.createProductAdditionalImages(userTokenRequestDto, additionalImages, productId);
    }
    async createProductDetailImages(detailImages, productId, userTokenRequestDto) {
        return this.productService.createProductDetailImages(userTokenRequestDto, detailImages, productId);
    }
    async getProductList(userTokenRequestDto, productSearchRequestDto) {
        return this.productService.getProductList(userTokenRequestDto, productSearchRequestDto);
    }
    async getProductDetail(userTokenRequestDto, productId) {
        return this.productService.getProductDetail(userTokenRequestDto, productId);
    }
    viewImage(userTokenRequestDto, urn, response) {
        return this.productService.viewImage(userTokenRequestDto, urn, response);
    }
    async deleteProductMainImages(userTokenRequestDto, productCheckedIdRequestDto) {
        return this.productService.deleteProductMainImages(userTokenRequestDto, productCheckedIdRequestDto);
    }
    async updateProduct(userTokenRequestDto, productUpdateRequestDto) {
        return this.productService.updateProduct(userTokenRequestDto, productUpdateRequestDto);
    }
    async deleteProductAdditionalImages(userTokenRequestDto, productImageDeleteRequestDto) {
        return this.productService.deleteProductAdditionalImages(userTokenRequestDto, productImageDeleteRequestDto);
    }
    async deleteProductDetailImages(userTokenRequestDto, productImageDeleteRequestDto) {
        return this.productService.deleteProductDetailImages(userTokenRequestDto, productImageDeleteRequestDto);
    }
    async deleteProduct(userTokenRequestDto, productCheckedIdRequestDto) {
        return this.productService.deleteProduct(userTokenRequestDto, productCheckedIdRequestDto);
    }
    async restoreProduct(userTokenRequestDto, productCheckedIdRequestDto) {
        return this.productService.restoreProduct(userTokenRequestDto, productCheckedIdRequestDto);
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
    (0, common_1.UseGuards)(jwt_authentication_guard_1.JwtAuthenticationGuard),
    __param(0, (0, user_token_request_dto_1.GetUserInfo)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof user_token_request_dto_1.UserTokenRequestDto !== "undefined" && user_token_request_dto_1.UserTokenRequestDto) === "function" ? _b : Object, typeof (_d = typeof Express !== "undefined" && (_c = Express.Multer) !== void 0 && _c.File) === "function" ? _d : Object]),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
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
    (0, common_1.UseGuards)(jwt_authentication_guard_1.JwtAuthenticationGuard),
    __param(0, (0, user_token_request_dto_1.GetUserInfo)()),
    __param(1, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_f = typeof user_token_request_dto_1.UserTokenRequestDto !== "undefined" && user_token_request_dto_1.UserTokenRequestDto) === "function" ? _f : Object, typeof (_g = typeof product_edit_request_dto_1.ProductEditRequestDto !== "undefined" && product_edit_request_dto_1.ProductEditRequestDto) === "function" ? _g : Object]),
    __metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], ProductController.prototype, "createProduct", null);
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
    (0, common_1.UseGuards)(jwt_authentication_guard_1.JwtAuthenticationGuard),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, user_token_request_dto_1.GetUserInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_j = typeof Array !== "undefined" && Array) === "function" ? _j : Object, String, typeof (_k = typeof user_token_request_dto_1.UserTokenRequestDto !== "undefined" && user_token_request_dto_1.UserTokenRequestDto) === "function" ? _k : Object]),
    __metadata("design:returntype", typeof (_l = typeof Promise !== "undefined" && Promise) === "function" ? _l : Object)
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
    (0, common_1.UseGuards)(jwt_authentication_guard_1.JwtAuthenticationGuard),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, user_token_request_dto_1.GetUserInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_m = typeof Array !== "undefined" && Array) === "function" ? _m : Object, String, typeof (_o = typeof user_token_request_dto_1.UserTokenRequestDto !== "undefined" && user_token_request_dto_1.UserTokenRequestDto) === "function" ? _o : Object]),
    __metadata("design:returntype", typeof (_p = typeof Promise !== "undefined" && Promise) === "function" ? _p : Object)
], ProductController.prototype, "createProductDetailImages", null);
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
    (0, common_1.UseGuards)(jwt_authentication_guard_1.JwtAuthenticationGuard),
    __param(0, (0, user_token_request_dto_1.GetUserInfo)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_q = typeof user_token_request_dto_1.UserTokenRequestDto !== "undefined" && user_token_request_dto_1.UserTokenRequestDto) === "function" ? _q : Object, typeof (_r = typeof product_search_request_dto_1.ProductSearchRequestDto !== "undefined" && product_search_request_dto_1.ProductSearchRequestDto) === "function" ? _r : Object]),
    __metadata("design:returntype", typeof (_s = typeof Promise !== "undefined" && Promise) === "function" ? _s : Object)
], ProductController.prototype, "getProductList", null);
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
    (0, common_1.Get)("/:productId"),
    (0, common_1.UseGuards)(jwt_authentication_guard_1.JwtAuthenticationGuard),
    __param(0, (0, user_token_request_dto_1.GetUserInfo)()),
    __param(1, (0, common_1.Param)("productId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_t = typeof user_token_request_dto_1.UserTokenRequestDto !== "undefined" && user_token_request_dto_1.UserTokenRequestDto) === "function" ? _t : Object, Number]),
    __metadata("design:returntype", typeof (_u = typeof Promise !== "undefined" && Promise) === "function" ? _u : Object)
], ProductController.prototype, "getProductDetail", null);
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
    (0, common_1.UseGuards)(jwt_authentication_guard_1.JwtAuthenticationGuard),
    __param(0, (0, user_token_request_dto_1.GetUserInfo)()),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_v = typeof user_token_request_dto_1.UserTokenRequestDto !== "undefined" && user_token_request_dto_1.UserTokenRequestDto) === "function" ? _v : Object, String, typeof (_w = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _w : Object]),
    __metadata("design:returntype", typeof (_x = typeof Promise !== "undefined" && Promise) === "function" ? _x : Object)
], ProductController.prototype, "viewImage", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: "상품 메인 이미지 삭제",
    }),
    (0, swagger_1.ApiOkResponse)({
        description: "작업 성공!",
        type: (Promise),
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Delete)("/main-images/"),
    (0, common_1.UseGuards)(jwt_authentication_guard_1.JwtAuthenticationGuard),
    __param(0, (0, user_token_request_dto_1.GetUserInfo)()),
    __param(1, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_y = typeof user_token_request_dto_1.UserTokenRequestDto !== "undefined" && user_token_request_dto_1.UserTokenRequestDto) === "function" ? _y : Object, typeof (_z = typeof product_checked_id_request_dto_1.ProductCheckedIdRequestDto !== "undefined" && product_checked_id_request_dto_1.ProductCheckedIdRequestDto) === "function" ? _z : Object]),
    __metadata("design:returntype", typeof (_0 = typeof Promise !== "undefined" && Promise) === "function" ? _0 : Object)
], ProductController.prototype, "deleteProductMainImages", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: "상품 수정",
    }),
    (0, swagger_1.ApiOkResponse)({
        description: "작업 성공!",
        type: (Promise),
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Patch)(),
    (0, common_1.UseGuards)(jwt_authentication_guard_1.JwtAuthenticationGuard),
    __param(0, (0, user_token_request_dto_1.GetUserInfo)()),
    __param(1, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_1 = typeof user_token_request_dto_1.UserTokenRequestDto !== "undefined" && user_token_request_dto_1.UserTokenRequestDto) === "function" ? _1 : Object, typeof (_2 = typeof product_update_request_dto_1.ProductUpdateRequestDto !== "undefined" && product_update_request_dto_1.ProductUpdateRequestDto) === "function" ? _2 : Object]),
    __metadata("design:returntype", typeof (_3 = typeof Promise !== "undefined" && Promise) === "function" ? _3 : Object)
], ProductController.prototype, "updateProduct", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: "상품 추가 이미지 삭제",
    }),
    (0, swagger_1.ApiOkResponse)({
        description: "작업 성공!",
        type: (Promise),
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Delete)("/additional-images"),
    (0, common_1.UseGuards)(jwt_authentication_guard_1.JwtAuthenticationGuard),
    __param(0, (0, user_token_request_dto_1.GetUserInfo)()),
    __param(1, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_4 = typeof user_token_request_dto_1.UserTokenRequestDto !== "undefined" && user_token_request_dto_1.UserTokenRequestDto) === "function" ? _4 : Object, typeof (_5 = typeof product_image_delete_request_dto_1.ProductImageDeleteRequestDto !== "undefined" && product_image_delete_request_dto_1.ProductImageDeleteRequestDto) === "function" ? _5 : Object]),
    __metadata("design:returntype", typeof (_6 = typeof Promise !== "undefined" && Promise) === "function" ? _6 : Object)
], ProductController.prototype, "deleteProductAdditionalImages", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: "상품 상세 이미지 삭제",
    }),
    (0, swagger_1.ApiOkResponse)({
        description: "작업 성공!",
        type: (Promise),
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Delete)("/detail-images"),
    (0, common_1.UseGuards)(jwt_authentication_guard_1.JwtAuthenticationGuard),
    __param(0, (0, user_token_request_dto_1.GetUserInfo)()),
    __param(1, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_7 = typeof user_token_request_dto_1.UserTokenRequestDto !== "undefined" && user_token_request_dto_1.UserTokenRequestDto) === "function" ? _7 : Object, typeof (_8 = typeof product_image_delete_request_dto_1.ProductImageDeleteRequestDto !== "undefined" && product_image_delete_request_dto_1.ProductImageDeleteRequestDto) === "function" ? _8 : Object]),
    __metadata("design:returntype", typeof (_9 = typeof Promise !== "undefined" && Promise) === "function" ? _9 : Object)
], ProductController.prototype, "deleteProductDetailImages", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: "상품 삭제",
    }),
    (0, swagger_1.ApiOkResponse)({
        description: "작업 성공!",
        type: (Promise),
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Delete)(),
    (0, common_1.UseGuards)(jwt_authentication_guard_1.JwtAuthenticationGuard),
    __param(0, (0, user_token_request_dto_1.GetUserInfo)()),
    __param(1, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_10 = typeof user_token_request_dto_1.UserTokenRequestDto !== "undefined" && user_token_request_dto_1.UserTokenRequestDto) === "function" ? _10 : Object, typeof (_11 = typeof product_checked_id_request_dto_1.ProductCheckedIdRequestDto !== "undefined" && product_checked_id_request_dto_1.ProductCheckedIdRequestDto) === "function" ? _11 : Object]),
    __metadata("design:returntype", typeof (_12 = typeof Promise !== "undefined" && Promise) === "function" ? _12 : Object)
], ProductController.prototype, "deleteProduct", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: "상품 삭제 복구",
    }),
    (0, swagger_1.ApiOkResponse)({
        description: "작업 성공!",
        type: (Promise),
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Post)("/restore"),
    (0, common_1.UseGuards)(jwt_authentication_guard_1.JwtAuthenticationGuard),
    __param(0, (0, user_token_request_dto_1.GetUserInfo)()),
    __param(1, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_13 = typeof user_token_request_dto_1.UserTokenRequestDto !== "undefined" && user_token_request_dto_1.UserTokenRequestDto) === "function" ? _13 : Object, typeof (_14 = typeof product_checked_id_request_dto_1.ProductCheckedIdRequestDto !== "undefined" && product_checked_id_request_dto_1.ProductCheckedIdRequestDto) === "function" ? _14 : Object]),
    __metadata("design:returntype", typeof (_15 = typeof Promise !== "undefined" && Promise) === "function" ? _15 : Object)
], ProductController.prototype, "restoreProduct", null);
exports.ProductController = ProductController = __decorate([
    (0, swagger_1.ApiTags)("관리자 상품 관리 서비스"),
    (0, common_1.Controller)("admin/managements/products"),
    __param(0, (0, common_1.Inject)("ProductService")),
    __metadata("design:paramtypes", [typeof (_a = typeof product_service_1.ProductService !== "undefined" && product_service_1.ProductService) === "function" ? _a : Object])
], ProductController);


/***/ }),

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
        if (!userTokenRequestDto.email) {
            throw new common_1.NotFoundException({ statusCode: 404, message: "찾을 수 없어요." });
        }
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
        if (!userTokenRequestDto.email) {
            throw new common_1.NotFoundException({ statusCode: 404, message: "찾을 수 없어요." });
        }
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
        if (!userTokenRequestDto.email) {
            throw new common_1.NotFoundException({ statusCode: 404, message: "찾을 수 없어요." });
        }
        await this.permissionCheck(userTokenRequestDto);
        if (!productId || !detailImages || detailImages.length === 0) {
            throw new common_1.BadRequestException({ statusCode: 400, message: "업로드할 파일을 확인해 주세요." });
        }
        return default_response_1.DefaultResponse.responseWithData(common_1.HttpStatus.OK, "작업 성공!", new product_edit_image_response_dto_1.ProductEditImageResponseDto(await this.imageCreatedStorageProcessors(parseInt(productId["productId"]), detailImages, "detail")));
    }
    async getProductList(userTokenRequestDto, productSearchRequestDto) {
        if (!userTokenRequestDto.email) {
            throw new common_1.NotFoundException({ statusCode: 404, message: "찾을 수 없어요." });
        }
        await this.permissionCheck(userTokenRequestDto);
        const findByProducts = await this.productQueryBuilderRepository.dynamicQuerySearchAndPagingByDto(productSearchRequestDto);
        if (!findByProducts || findByProducts[0].length === 0) {
            throw new common_1.BadRequestException({ statusCode: 404, message: "상품이 등록되지 않았어요. 상품 정보를 확인해 주세요." });
        }
        return default_response_1.DefaultResponse.responseWithPaginationAndData(common_1.HttpStatus.OK, "작업 성공!", new page_1.Page(findByProducts[0].length, findByProducts[1], findByProducts[0].map((product) => new product_list_response_dto_1.ProductListResponseDto(product))));
    }
    async getProductDetail(userTokenRequestDto, productId) {
        if (!userTokenRequestDto || !productId || productId <= 0) {
            throw new common_1.BadRequestException({ statusCode: 400, message: "상품 정보를 확인해 주세요." });
        }
        await this.permissionCheck(userTokenRequestDto);
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
        if (!userTokenRequestDto.email) {
            throw new common_1.NotFoundException({ statusCode: 404, message: "찾을 수 없어요." });
        }
        await this.permissionCheck(userTokenRequestDto);
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
        if (!productUpdateRequestDto.userId) {
            throw new common_1.NotFoundException({ statusCode: 404, message: "찾을 수 없어요." });
        }
        if (!userTokenRequestDto.email) {
            throw new common_1.NotFoundException({ statusCode: 404, message: "찾을 수 없어요." });
        }
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
        if (!productImageDeleteRequestDto) {
            throw new common_1.BadRequestException({ statusCode: 400, message: "요청을 확인해 주세요." });
        }
        if (!userTokenRequestDto.email) {
            throw new common_1.NotFoundException({ statusCode: 404, message: "찾을 수 없어요." });
        }
        await this.permissionCheck(userTokenRequestDto);
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
        if (!userTokenRequestDto) {
            throw new common_1.NotFoundException({ statusCode: 404, message: "찾을 수 없어요." });
        }
        if (!userTokenRequestDto.email) {
            throw new common_1.NotFoundException({ statusCode: 404, message: "찾을 수 없어요." });
        }
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
        if (!productCheckedIdRequestDto) {
            throw new common_1.NotFoundException({ statusCode: 404, message: "찾을 수 없어요." });
        }
        await this.permissionCheck(userTokenRequestDto);
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
        if (!productCheckedIdRequestDto) {
            throw new common_1.NotFoundException({ statusCode: 404, message: "찾을 수 없어요." });
        }
        await this.permissionCheck(userTokenRequestDto);
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
/******/ 	__webpack_require__.h = () => ("d519e56d026eac6c54db")
/******/ })();
/******/ 
/******/ }
;