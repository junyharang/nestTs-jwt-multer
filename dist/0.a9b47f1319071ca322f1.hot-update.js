"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 19:
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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthenticationController = void 0;
const common_1 = __webpack_require__(6);
const default_response_1 = __webpack_require__(20);
const signup_request_dto_1 = __webpack_require__(21);
const authentication_service_1 = __webpack_require__(24);
const signin_request_dto_1 = __webpack_require__(25);
const swagger_1 = __webpack_require__(23);
const jwt_authentication_guard_1 = __webpack_require__(26);
const signout_request_dto_1 = __webpack_require__(28);
const express_1 = __webpack_require__(29);
const passport_1 = __webpack_require__(27);
const user_reissue_access_token_request_dto_1 = __webpack_require__(30);
let AuthenticationController = class AuthenticationController {
    constructor(authenticationService) {
        this.authenticationService = authenticationService;
    }
    async signUp(userCreateRequestDto) {
        return this.authenticationService.signUp(userCreateRequestDto);
    }
    async signIn(signinRequestDto, response) {
        return this.authenticationService.signIn(signinRequestDto, response);
    }
    async reissueAccessToken(userReissueAccessTokenRequestDto) {
        return this.authenticationService.reissueAccessToken(userReissueAccessTokenRequestDto);
    }
    async signOut(signOutRequestDto, response) {
        return this.authenticationService.signOut(signOutRequestDto.id, response);
    }
};
exports.AuthenticationController = AuthenticationController;
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: "회원가입 기능",
    }),
    (0, swagger_1.ApiOkResponse)({
        description: "회원가입 성공",
        type: (default_response_1.DefaultResponse),
    }),
    (0, common_1.Post)("/signup"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof signup_request_dto_1.SignupRequestDto !== "undefined" && signup_request_dto_1.SignupRequestDto) === "function" ? _b : Object]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], AuthenticationController.prototype, "signUp", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: "로그인 기능",
    }),
    (0, swagger_1.ApiOkResponse)({
        description: "로그인 성공",
        type: (default_response_1.DefaultResponse),
    }),
    (0, common_1.Post)("/signin"),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof signin_request_dto_1.SigninRequestDto !== "undefined" && signin_request_dto_1.SigninRequestDto) === "function" ? _d : Object, typeof (_e = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _e : Object]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], AuthenticationController.prototype, "signIn", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: "Access Token 재발급",
    }),
    (0, swagger_1.ApiOkResponse)({
        description: "재발급 성공",
        type: (default_response_1.DefaultResponse),
    }),
    (0, common_1.Get)("/refresh"),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt-refresh-token")),
    __param(0, (0, user_reissue_access_token_request_dto_1.GetUserInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_g = typeof user_reissue_access_token_request_dto_1.UserReissueAccessTokenRequestDto !== "undefined" && user_reissue_access_token_request_dto_1.UserReissueAccessTokenRequestDto) === "function" ? _g : Object]),
    __metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], AuthenticationController.prototype, "reissueAccessToken", null);
__decorate([
    (0, common_1.Post)("/signout"),
    (0, swagger_1.ApiOperation)({
        summary: "로그 아웃 기능",
    }),
    (0, swagger_1.ApiOkResponse)({
        description: "로그아웃 성공",
        type: (default_response_1.DefaultResponse),
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_authentication_guard_1.JwtAuthenticationGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_j = typeof signout_request_dto_1.SignoutRequestDto !== "undefined" && signout_request_dto_1.SignoutRequestDto) === "function" ? _j : Object, typeof (_k = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _k : Object]),
    __metadata("design:returntype", typeof (_l = typeof Promise !== "undefined" && Promise) === "function" ? _l : Object)
], AuthenticationController.prototype, "signOut", null);
exports.AuthenticationController = AuthenticationController = __decorate([
    (0, swagger_1.ApiTags)("인증 서비스"),
    (0, common_1.Controller)("auth"),
    __param(0, (0, common_1.Inject)("AuthenticationService")),
    __metadata("design:paramtypes", [typeof (_a = typeof authentication_service_1.AuthenticationService !== "undefined" && authentication_service_1.AuthenticationService) === "function" ? _a : Object])
], AuthenticationController);


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("03242093bcbc6b9d0c4c")
/******/ })();
/******/ 
/******/ }
;