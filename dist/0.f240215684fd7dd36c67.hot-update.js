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
        console.log(jwtPayload.email);
        const authUser = await this.userService.findByEmail(jwtPayload.email);
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


/***/ }),

/***/ 36:
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserServiceImpl = void 0;
const common_1 = __webpack_require__(6);
const typeorm_1 = __webpack_require__(14);
const user_entity_1 = __webpack_require__(16);
const typeorm_2 = __webpack_require__(17);
const default_response_1 = __webpack_require__(19);
const user_response_dto_1 = __webpack_require__(37);
const console = __importStar(__webpack_require__(42));
let UserServiceImpl = class UserServiceImpl {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async getProfile(id) {
        console.log(`userId: ${id}`);
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            return default_response_1.DefaultResponse.response(common_1.HttpStatus.FORBIDDEN, "등록되지 않은 이용자에요.");
        }
        return default_response_1.DefaultResponse.responseWithData(common_1.HttpStatus.OK, "작업 성공!", new user_response_dto_1.UserResponseDto(user));
    }
    async findById(id) {
        console.log(`findById() Id: ${id}`);
        if (!id) {
            throw new common_1.InternalServerErrorException({ statusCode: 500, message: "인증 처리 중 문제가 발생하였어요." });
        }
        return await this.userRepository.findOne({ where: { id } });
    }
    async findByEmail(email) {
        console.log(`findById() Id: ${email}`);
        if (!email) {
            throw new common_1.InternalServerErrorException({ statusCode: 500, message: "인증 처리 중 문제가 발생하였어요." });
        }
        return await this.userRepository.findOne({ where: { email } });
    }
};
exports.UserServiceImpl = UserServiceImpl;
exports.UserServiceImpl = UserServiceImpl = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], UserServiceImpl);


/***/ }),

/***/ 42:
/***/ ((module) => {

module.exports = require("console");

/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("73a866cd95b2cad1f148")
/******/ })();
/******/ 
/******/ }
;