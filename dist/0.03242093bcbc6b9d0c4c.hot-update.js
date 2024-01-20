"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 55:
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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtRefreshAccessTokenStrategy = void 0;
const common_1 = __webpack_require__(6);
const passport_1 = __webpack_require__(27);
const passport_jwt_1 = __webpack_require__(38);
const config_1 = __webpack_require__(7);
const user_service_1 = __webpack_require__(39);
const authentication_service_1 = __webpack_require__(24);
let JwtRefreshAccessTokenStrategy = class JwtRefreshAccessTokenStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, "jwt-refresh-token") {
    constructor(userService, authenticationService, configService) {
        const extractors = [(request) => request.cookies?.refreshToken];
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromExtractors(extractors),
            ignoreExpiration: false,
            secretOrKey: configService.get("jwt.refreshTokenSecret"),
            passReqToCallback: true,
        });
        this.userService = userService;
        this.authenticationService = authenticationService;
        this.configService = configService;
    }
    async validate(request, payload, done) {
        const refreshToken = request.cookies?.refreshToken;
        const authUser = await this.userService.findByEmail(payload.email);
        if (!authUser) {
            throw new common_1.UnauthorizedException({ statusCode: 401, message: "회원 정보를 찾을 수 없어요." });
        }
        await this.authenticationService.validateRefreshToken(authUser, refreshToken);
        return done(null, { email: payload.email });
    }
};
exports.JwtRefreshAccessTokenStrategy = JwtRefreshAccessTokenStrategy;
exports.JwtRefreshAccessTokenStrategy = JwtRefreshAccessTokenStrategy = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)("UserService")),
    __param(1, (0, common_1.Inject)("AuthenticationService")),
    __metadata("design:paramtypes", [typeof (_a = typeof user_service_1.UserService !== "undefined" && user_service_1.UserService) === "function" ? _a : Object, typeof (_b = typeof authentication_service_1.AuthenticationService !== "undefined" && authentication_service_1.AuthenticationService) === "function" ? _b : Object, typeof (_c = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _c : Object])
], JwtRefreshAccessTokenStrategy);


/***/ }),

/***/ 15:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthenticationModule = void 0;
const common_1 = __webpack_require__(6);
const typeorm_1 = __webpack_require__(14);
const user_entity_1 = __webpack_require__(16);
const authentication_controller_1 = __webpack_require__(19);
const authentication_service_impl_1 = __webpack_require__(31);
const jwt_1 = __webpack_require__(34);
const configuration_1 = __importDefault(__webpack_require__(8));
const passport_1 = __webpack_require__(27);
const jwt_strategy_1 = __webpack_require__(37);
const user_service_impl_1 = __webpack_require__(40);
const config_1 = __webpack_require__(7);
const cookie_service_impl_1 = __webpack_require__(43);
const jwt_refresh_access_token_strategy_1 = __webpack_require__(55);
let AuthenticationModule = class AuthenticationModule {
};
exports.AuthenticationModule = AuthenticationModule;
exports.AuthenticationModule = AuthenticationModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [configuration_1.default],
            }),
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User]),
            jwt_1.JwtModule.registerAsync({
                useFactory: (configService) => {
                    const jwt = configService.get("jwt");
                    return {
                        secret: jwt.accessTokenSecret,
                        signOptions: { expiresIn: jwt.accessTokenExpireIn },
                    };
                },
                inject: [config_1.ConfigService],
            }),
            passport_1.PassportModule.register({ defaultStrategy: "jwt" }),
        ],
        controllers: [authentication_controller_1.AuthenticationController],
        providers: [
            authentication_service_impl_1.AuthenticationServiceImpl,
            {
                provide: "AuthenticationService",
                useClass: authentication_service_impl_1.AuthenticationServiceImpl,
            },
            user_service_impl_1.UserServiceImpl,
            {
                provide: "UserService",
                useClass: user_service_impl_1.UserServiceImpl,
            },
            cookie_service_impl_1.CookieServiceImpl,
            {
                provide: "CookieService",
                useClass: cookie_service_impl_1.CookieServiceImpl,
            },
            jwt_strategy_1.JwtStrategy,
            jwt_refresh_access_token_strategy_1.JwtRefreshAccessTokenStrategy,
        ],
        exports: [
            authentication_service_impl_1.AuthenticationServiceImpl,
            {
                provide: "AuthenticationService",
                useClass: authentication_service_impl_1.AuthenticationServiceImpl,
            },
        ],
    })
], AuthenticationModule);


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("189647e516e535db043f")
/******/ })();
/******/ 
/******/ }
;