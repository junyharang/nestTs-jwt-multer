"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

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
    async getImagesUrl(imageIds) {
        if (!imageIds || imageIds.length === 0) {
            return default_response_1.DefaultResponse.response(common_1.HttpStatus.BAD_REQUEST, "조회할 파일 정보를 확인해 주세요.");
        }
        const images = [];
        for (const id of imageIds) {
            const image = await this.fileRepository.findOne({ where: { id } });
            if (image) {
                images.push({ imageUrl: image.imageUrl });
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
/******/ 	__webpack_require__.h = () => ("b62e9e5ffeed77f7e42a")
/******/ })();
/******/ 
/******/ }
;