"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 47:
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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FileController = void 0;
const swagger_1 = __webpack_require__(23);
const common_1 = __webpack_require__(6);
const platform_express_1 = __webpack_require__(48);
const multer_1 = __webpack_require__(49);
const path_1 = __webpack_require__(11);
const default_response_1 = __webpack_require__(20);
const file_service_1 = __webpack_require__(50);
const express_1 = __webpack_require__(28);
const jwt_authentication_guard_1 = __webpack_require__(26);
const multer_options_1 = __webpack_require__(51);
let FileController = class FileController {
    constructor(fileService) {
        this.fileService = fileService;
    }
    async uploadImage(image) {
        return this.fileService.uploadImage(image);
    }
    uploadImages(images) {
        return this.fileService.uploadImages(images);
    }
    viewImage(name, response) {
        return this.fileService.viewImage(name, response);
    }
    getImageUrl(imageId) {
        return this.fileService.getImageUrl(imageId);
    }
    async getImagesUrl(imageId) {
        return this.fileService.getImagesUrl(imageId);
    }
};
exports.FileController = FileController;
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: "단일 이미지 업로드 기능",
    }),
    (0, swagger_1.ApiOkResponse)({
        description: "파일 업로드 성공!",
        type: (Promise),
    }),
    (0, common_1.Post)("/uploads/image"),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("image", {
        storage: (0, multer_1.diskStorage)({
            destination: "./local/storage/images",
            filename(_, file, callback) {
                const randomName = Array(32)
                    .fill(null)
                    .map(() => Math.round(Math.random() * 16).toString(16))
                    .join("");
                return callback(null, `${randomName}${(0, path_1.extname)(file.originalname)}`);
            },
        }),
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof Express !== "undefined" && (_b = Express.Multer) !== void 0 && _b.File) === "function" ? _c : Object]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], FileController.prototype, "uploadImage", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: "다중 이미지 업로드 기능",
    }),
    (0, swagger_1.ApiOkResponse)({
        description: "파일 업로드 성공!",
        type: (Promise),
    }),
    (0, common_1.Post)("/uploads/images"),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)("images", null, multer_options_1.multerDiskOptions)),
    (0, common_1.Bind)((0, common_1.UploadedFiles)()),
    __param(0, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof Array !== "undefined" && Array) === "function" ? _e : Object]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], FileController.prototype, "uploadImages", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: "단일 이미지 출력 기능",
    }),
    (0, swagger_1.ApiOkResponse)({
        description: "성공!",
        type: (default_response_1.DefaultResponse),
    }),
    (0, common_1.Get)("/image/view/:name"),
    __param(0, (0, common_1.Param)("name")),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_g = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _g : Object]),
    __metadata("design:returntype", typeof (_h = typeof default_response_1.DefaultResponse !== "undefined" && default_response_1.DefaultResponse) === "function" ? _h : Object)
], FileController.prototype, "viewImage", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: "단일 이미지 불러 기능",
    }),
    (0, swagger_1.ApiOkResponse)({
        description: "성공!",
        type: (default_response_1.DefaultResponse),
    }),
    (0, common_1.Get)("/image/:imageId"),
    (0, common_1.UseGuards)(jwt_authentication_guard_1.JwtAuthenticationGuard),
    __param(0, (0, common_1.Param)("imageId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_j = typeof Promise !== "undefined" && Promise) === "function" ? _j : Object)
], FileController.prototype, "getImageUrl", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: "다중 이미지 불러오기 기능",
    }),
    (0, swagger_1.ApiOkResponse)({
        description: "성공!",
        type: (default_response_1.DefaultResponse),
    }),
    (0, common_1.Get)("/images/"),
    __param(0, (0, common_1.Query)("imageId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", typeof (_k = typeof Promise !== "undefined" && Promise) === "function" ? _k : Object)
], FileController.prototype, "getImagesUrl", null);
exports.FileController = FileController = __decorate([
    (0, swagger_1.ApiTags)("파일 처리 서비스"),
    (0, common_1.Controller)("file"),
    __param(0, (0, common_1.Inject)("FileService")),
    __metadata("design:paramtypes", [typeof (_a = typeof file_service_1.FileService !== "undefined" && file_service_1.FileService) === "function" ? _a : Object])
], FileController);


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
            imageUrl: file.imageUrl,
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
                imageUrl: saveFile.imageUrl,
            };
            result.push(imageContent);
        }
        return default_response_1.DefaultResponse.responseWithData(common_1.HttpStatus.CREATED, "파일 업로드 성공!", result);
    }
    viewImage(name, response) {
        if (!name) {
            return default_response_1.DefaultResponse.response(common_1.HttpStatus.BAD_REQUEST, "조회할 파일 이름을 확인해 주세요.");
        }
        default_response_1.DefaultResponse.responseWithData(common_1.HttpStatus.OK, "파일 조회 성공!", response.sendFile(name, { root: "./local/storage/images" }));
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
        return default_response_1.DefaultResponse.responseWithData(common_1.HttpStatus.OK, "성공!", image.imageUrl);
    }
    async getImagesUrl(imageId) {
        if (!imageId || imageId.length === 0) {
            return default_response_1.DefaultResponse.response(common_1.HttpStatus.BAD_REQUEST, "조회할 파일 정보를 확인해 주세요.");
        }
        const images = [];
        for (const id of imageId) {
            const image = await this.fileRepository.findOne({ where: { id } });
            if (image) {
                images.push({ imageUrl: image.imageUrl });
            }
            else {
                images.push({ imageUrl: "이미지를 찾을 수 없어요." });
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


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("3bec4b3e239fad223861")
/******/ })();
/******/ 
/******/ }
;