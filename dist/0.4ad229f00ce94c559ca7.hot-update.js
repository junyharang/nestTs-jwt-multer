"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 42:
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
exports.CookieServiceImpl = void 0;
const config_1 = __webpack_require__(7);
const common_1 = __webpack_require__(6);
let CookieServiceImpl = class CookieServiceImpl {
    constructor(configService) {
        this.configService = configService;
        this.DOMAIN = this.configService.get("cookie.domain");
    }
    setRefreshToken(response, refreshToken) {
        response.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 7,
            domain: this.DOMAIN,
        });
    }
    clearRefreshToken(response) {
        response.clearCookie("refresh_token");
        response.removeHeader("Authorization");
        const requestHeaders = response.getHeaders();
        console.log("response.header(Authorization) 값 확인 : ");
        console.log(response.getHeader("Authorization"));
        console.log("response.cookie 값 확인 : ");
        console.log(requestHeaders["set-cookie"]);
    }
};
exports.CookieServiceImpl = CookieServiceImpl;
exports.CookieServiceImpl = CookieServiceImpl = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], CookieServiceImpl);


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("4925149690c3c7de5f77")
/******/ })();
/******/ 
/******/ }
;