"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 30:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GetUserInfo = exports.UserReissueAccessTokenRequestDto = void 0;
const common_1 = __webpack_require__(6);
class UserReissueAccessTokenRequestDto {
}
exports.UserReissueAccessTokenRequestDto = UserReissueAccessTokenRequestDto;
exports.GetUserInfo = (0, common_1.createParamDecorator)((date, executionContext) => {
    const request = executionContext.switchToHttp().getRequest();
    return request.user;
});


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("f9b837c03d741b9d5630")
/******/ })();
/******/ 
/******/ }
;