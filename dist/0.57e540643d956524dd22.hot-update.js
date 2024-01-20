"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 51:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.multerDiskOptions = void 0;
const common_1 = __webpack_require__(6);
const fs_1 = __webpack_require__(9);
const multer_1 = __webpack_require__(49);
const path_1 = __webpack_require__(11);
exports.multerDiskOptions = {
    fileFilter: (request, file, callback) => {
        if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
            callback(null, true);
        }
        else {
            callback(new common_1.HttpException({
                message: "지원하지 않는 파일 형식입니다.",
                error: "Unsupported Media Type",
            }, common_1.HttpStatus.BAD_REQUEST), false);
        }
    },
    storage: (0, multer_1.diskStorage)({
        destination: (request, file, callback) => {
            const uploadPath = "./local/storage/images";
            if (!(0, fs_1.existsSync)(uploadPath)) {
                (0, fs_1.mkdirSync)(uploadPath);
            }
            callback(null, uploadPath);
        },
        filename: (request, file, callback) => {
            callback(null, `${Date.now()}${(0, path_1.extname)(file.originalname)}`);
        },
    }),
    limits: {
        fieldNameSize: 200,
        filedSize: 1024 * 1024,
        fields: 2,
        fileSize: 10485760,
        files: 10,
    },
};


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("73ce3de6bb155108360b")
/******/ })();
/******/ 
/******/ }
;