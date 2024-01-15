"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 33:
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
exports.JwtStrategy = void 0;
const passport_1 = __webpack_require__(26);
const passport_jwt_1 = __webpack_require__(34);
const common_1 = __webpack_require__(6);
const passport_jwt_2 = __webpack_require__(34);
const configuration_1 = __importDefault(__webpack_require__(8));
const user_service_1 = __webpack_require__(35);
let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, "jwt-authentication") {
    constructor(userService) {
        super({
            jwtFromRequest: passport_jwt_2.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: (0, configuration_1.default)().jwt.secret,
        });
        this.userService = userService;
    }
    async validate(jwtPayload, done) {
        console.log(`JwtStrategy validate() jwtPayload 값: `);
        console.log(jwtPayload);
        const authUser = await this.userService.findById(jwtPayload.id);
        if (!authUser) {
            throw new common_1.UnauthorizedException({ statusCode: 401, message: "회원 정보를 찾을 수 없어요." });
        }
        return done(null, {
            id: authUser.id,
            email: authUser.email,
            name: authUser.name,
        });
    }
};
exports.JwtStrategy = JwtStrategy;
exports.JwtStrategy = JwtStrategy = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)("UserService")),
    __metadata("design:paramtypes", [typeof (_a = typeof user_service_1.UserService !== "undefined" && user_service_1.UserService) === "function" ? _a : Object])
], JwtStrategy);


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("613c4340aa6f5d55dd16")
/******/ })();
/******/ 
/******/ }
;