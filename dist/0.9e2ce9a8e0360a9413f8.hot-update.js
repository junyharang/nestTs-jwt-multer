"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

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
const authentication_controller_1 = __webpack_require__(18);
const authentication_service_impl_1 = __webpack_require__(24);
const jwt_1 = __webpack_require__(28);
const configuration_1 = __importDefault(__webpack_require__(8));
const passport_1 = __webpack_require__(29);
let AuthenticationModule = class AuthenticationModule {
};
exports.AuthenticationModule = AuthenticationModule;
exports.AuthenticationModule = AuthenticationModule = __decorate([
    (0, common_1.Module)({
        imports: [
            passport_1.PassportModule.register({ defaultStrategy: "jwt" }),
            jwt_1.JwtModule.register({
                secret: (0, configuration_1.default)().jwt.secret,
                signOptions: { expiresIn: (0, configuration_1.default)().jwt.expiresIn },
            }),
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User]),
        ],
        controllers: [authentication_controller_1.AuthenticationController],
        providers: [
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
/******/ 	__webpack_require__.h = () => ("5bbb0c6ef83e515f48e0")
/******/ })();
/******/ 
/******/ }
;