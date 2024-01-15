"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 29:
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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthenticationServiceImpl = void 0;
const typeorm_1 = __webpack_require__(14);
const user_entity_1 = __webpack_require__(16);
const common_1 = __webpack_require__(6);
const default_response_1 = __webpack_require__(19);
const typeorm_2 = __webpack_require__(17);
const bcrypt = __importStar(__webpack_require__(30));
const encrypt_util_1 = __webpack_require__(31);
const jwt_1 = __webpack_require__(32);
let AuthenticationServiceImpl = class AuthenticationServiceImpl {
    constructor(userRepository, jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    async signUp(signupRequestDto) {
        if (signupRequestDto === null) {
            return default_response_1.DefaultResponse.response(common_1.HttpStatus.BAD_REQUEST, "회원가입에 실패하였어요.");
        }
        signupRequestDto.password = await encrypt_util_1.EncryptUtil.userPasswordEncryptor(signupRequestDto.password);
        const userEmail = signupRequestDto.email;
        if ((await this.userRepository.findOne({ where: { email: userEmail } })) !== null) {
            return default_response_1.DefaultResponse.response(common_1.HttpStatus.CONFLICT, "이미 등록된 Email 주소 입니다.");
        }
        const saveUserResult = await this.userRepository.save(signupRequestDto.toEntity(signupRequestDto));
        if (saveUserResult === null) {
            return default_response_1.DefaultResponse.response(common_1.HttpStatus.INTERNAL_SERVER_ERROR, "Server Error");
        }
        return default_response_1.DefaultResponse.responseWithData(common_1.HttpStatus.CREATED, "회원 가입 성공했어요!", saveUserResult.id);
    }
    async signIn(signinRequestDto) {
        const findByUserInfo = await this.userRepository.findOne({
            select: ["email", "password"],
            where: { email: signinRequestDto.email },
        });
        if (findByUserInfo && (await bcrypt.compare(signinRequestDto.password, findByUserInfo.password))) {
            const { id, email, name, age } = findByUserInfo;
            const payload = {
                id,
                email,
                name,
                age,
            };
            return default_response_1.DefaultResponse.responseWithData(common_1.HttpStatus.OK, "로그인 성공!", this.jwtService.sign(payload));
        }
        else {
            return default_response_1.DefaultResponse.response(common_1.HttpStatus.BAD_REQUEST, "로그인 실패!");
        }
    }
    async signOut(id, response) {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            return default_response_1.DefaultResponse.response(common_1.HttpStatus.UNAUTHORIZED, "로그인 아웃 실패!");
        }
        return default_response_1.DefaultResponse.responseWithData(common_1.HttpStatus.UNAUTHORIZED, "로그아웃 성공!", response.setHeader("Set-Cookie", `Authentication=; HttpOnly; Path=/; Max-Age=0`));
    }
    async validateUser(email, password) {
        const user = await this.userRepository.findOne({
            where: {
                email,
            },
        });
        if (!user) {
            throw new common_1.ForbiddenException({ statusCode: 403, message: "등록되지 않은 이용자에요." });
        }
        if (!(await bcrypt.compare(password, user.password))) {
            throw new common_1.BadRequestException({ statusCode: 400, message: "잘못된 비밀번호가 전달 되었어요." });
        }
        return user;
    }
};
exports.AuthenticationServiceImpl = AuthenticationServiceImpl;
exports.AuthenticationServiceImpl = AuthenticationServiceImpl = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _b : Object])
], AuthenticationServiceImpl);


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("1aa95b2729fe97e1ed9f")
/******/ })();
/******/ 
/******/ }
;