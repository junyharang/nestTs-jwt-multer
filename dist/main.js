/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var __resourceQuery = "?100";
/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
/*globals __resourceQuery */
if (true) {
	var hotPollInterval = +__resourceQuery.slice(1) || 0;
	var log = __webpack_require__(1);

	/**
	 * @param {boolean=} fromUpdate true when called from update
	 */
	var checkForUpdate = function checkForUpdate(fromUpdate) {
		if (module.hot.status() === "idle") {
			module.hot
				.check(true)
				.then(function (updatedModules) {
					if (!updatedModules) {
						if (fromUpdate) log("info", "[HMR] Update applied.");
						return;
					}
					__webpack_require__(2)(updatedModules, updatedModules);
					checkForUpdate(true);
				})
				.catch(function (err) {
					var status = module.hot.status();
					if (["abort", "fail"].indexOf(status) >= 0) {
						log("warning", "[HMR] Cannot apply update.");
						log("warning", "[HMR] " + log.formatError(err));
						log("warning", "[HMR] You need to restart the application!");
					} else {
						log("warning", "[HMR] Update failed: " + log.formatError(err));
					}
				});
		}
	};
	setInterval(checkForUpdate, hotPollInterval);
} else {}


/***/ }),
/* 1 */
/***/ ((module) => {

/** @typedef {"info" | "warning" | "error"} LogLevel */

/** @type {LogLevel} */
var logLevel = "info";

function dummy() {}

/**
 * @param {LogLevel} level log level
 * @returns {boolean} true, if should log
 */
function shouldLog(level) {
	var shouldLog =
		(logLevel === "info" && level === "info") ||
		(["info", "warning"].indexOf(logLevel) >= 0 && level === "warning") ||
		(["info", "warning", "error"].indexOf(logLevel) >= 0 && level === "error");
	return shouldLog;
}

/**
 * @param {(msg?: string) => void} logFn log function
 * @returns {(level: LogLevel, msg?: string) => void} function that logs when log level is sufficient
 */
function logGroup(logFn) {
	return function (level, msg) {
		if (shouldLog(level)) {
			logFn(msg);
		}
	};
}

/**
 * @param {LogLevel} level log level
 * @param {string|Error} msg message
 */
module.exports = function (level, msg) {
	if (shouldLog(level)) {
		if (level === "info") {
			console.log(msg);
		} else if (level === "warning") {
			console.warn(msg);
		} else if (level === "error") {
			console.error(msg);
		}
	}
};

/* eslint-disable node/no-unsupported-features/node-builtins */
var group = console.group || dummy;
var groupCollapsed = console.groupCollapsed || dummy;
var groupEnd = console.groupEnd || dummy;
/* eslint-enable node/no-unsupported-features/node-builtins */

module.exports.group = logGroup(group);

module.exports.groupCollapsed = logGroup(groupCollapsed);

module.exports.groupEnd = logGroup(groupEnd);

/**
 * @param {LogLevel} level log level
 */
module.exports.setLogLevel = function (level) {
	logLevel = level;
};

/**
 * @param {Error} err error
 * @returns {string} formatted error
 */
module.exports.formatError = function (err) {
	var message = err.message;
	var stack = err.stack;
	if (!stack) {
		return message;
	} else if (stack.indexOf(message) < 0) {
		return message + "\n" + stack;
	} else {
		return stack;
	}
};


/***/ }),
/* 2 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

/**
 * @param {(string | number)[]} updatedModules updated modules
 * @param {(string | number)[] | null} renewedModules renewed modules
 */
module.exports = function (updatedModules, renewedModules) {
	var unacceptedModules = updatedModules.filter(function (moduleId) {
		return renewedModules && renewedModules.indexOf(moduleId) < 0;
	});
	var log = __webpack_require__(1);

	if (unacceptedModules.length > 0) {
		log(
			"warning",
			"[HMR] The following modules couldn't be hot updated: (They would need a full reload!)"
		);
		unacceptedModules.forEach(function (moduleId) {
			log("warning", "[HMR]  - " + moduleId);
		});
	}

	if (!renewedModules || renewedModules.length === 0) {
		log("info", "[HMR] Nothing hot updated.");
	} else {
		log("info", "[HMR] Updated modules:");
		renewedModules.forEach(function (moduleId) {
			if (typeof moduleId === "string" && moduleId.indexOf("!") !== -1) {
				var parts = moduleId.split("!");
				log.groupCollapsed("info", "[HMR]  - " + parts.pop());
				log("info", "[HMR]  - " + moduleId);
				log.groupEnd("info");
			} else {
				log("info", "[HMR]  - " + moduleId);
			}
		});
		var numberIds = renewedModules.every(function (moduleId) {
			return typeof moduleId === "number";
		});
		if (numberIds)
			log(
				"info",
				'[HMR] Consider using the optimization.moduleIds: "named" for module names.'
			);
	}
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(4);
const app_module_1 = __webpack_require__(5);
const configuration_1 = __importDefault(__webpack_require__(8));
const swagger_config_1 = __webpack_require__(102);
const common_1 = __webpack_require__(6);
const cookie_parser_1 = __importDefault(__webpack_require__(103));
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const serverConfig = (0, configuration_1.default)();
    const environment = serverConfig.server.environment;
    const port = serverConfig.server.port;
    const dbType = serverConfig.db.type;
    const dbSyncStatus = serverConfig.db.synchronize;
    app.use((0, cookie_parser_1.default)());
    (0, swagger_config_1.swaggerConfig)(app);
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true, transform: true, disableErrorMessages: true }));
    await app.listen(port);
    if (true) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
    console.log(`주니의 Nest.js를 이용한 JWT와 Multi Part 실습 서버 구동! \n 구동 환경 ${environment} \n Server Port Num: ${port} \n 연결 DB Type: ${dbType} \n 연결 DB: ${serverConfig.db.database} \n 연결 동기화 여부: ${dbSyncStatus}`);
}
bootstrap();


/***/ }),
/* 4 */
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs/core");

/***/ }),
/* 5 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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
exports.AppModule = void 0;
const common_1 = __webpack_require__(6);
const config_1 = __webpack_require__(7);
const configuration_1 = __importDefault(__webpack_require__(8));
const typeorm_1 = __webpack_require__(14);
const user_module_1 = __webpack_require__(15);
const file_module_1 = __webpack_require__(46);
const product_module_1 = __webpack_require__(54);
const authentication_module_1 = __webpack_require__(24);
const category_module_1 = __webpack_require__(88);
const division_module_1 = __webpack_require__(93);
const user_product_module_1 = __webpack_require__(98);
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                cache: true,
                isGlobal: true,
                load: [configuration_1.default],
            }),
            typeorm_1.TypeOrmModule.forRoot({
                autoLoadEntities: true,
                type: (0, configuration_1.default)().db.type,
                host: (0, configuration_1.default)().db.host,
                database: (0, configuration_1.default)().db.database,
                port: (0, configuration_1.default)().db.port,
                username: (0, configuration_1.default)().db.username,
                password: (0, configuration_1.default)().db.password,
                synchronize: (0, configuration_1.default)().db.synchronize,
                logging: (0, configuration_1.default)().db.logging,
            }),
            authentication_module_1.AuthenticationModule,
            user_module_1.UserModule,
            file_module_1.FileModule,
            product_module_1.ProductModule,
            category_module_1.CategoryModule,
            division_module_1.DivisionModule,
            user_product_module_1.UserProductModule,
        ],
    })
], AppModule);


/***/ }),
/* 6 */
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs/common");

/***/ }),
/* 7 */
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs/config");

/***/ }),
/* 8 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const fs_1 = __webpack_require__(9);
const yaml = __importStar(__webpack_require__(10));
const path_1 = __webpack_require__(11);
const assert_1 = __importDefault(__webpack_require__(12));
const process = __importStar(__webpack_require__(13));
exports["default"] = () => {
    (0, assert_1.default)(["local", "dev", "prod"].includes(process.env.NODE_ENV));
    const configFilePath = (0, path_1.join)(process.cwd(), "common", "config", "environment", `.env.${process.env.NODE_ENV}.yml`);
    const environmentConfig = yaml.load((0, fs_1.readFileSync)(configFilePath, "utf8"));
    environmentConfig.server.environment = process.env.NODE_ENV === "local" ? "local" : process.env.NODE_ENV === "dev" ? "dev" : "prod";
    return environmentConfig;
};


/***/ }),
/* 9 */
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),
/* 10 */
/***/ ((module) => {

"use strict";
module.exports = require("js-yaml");

/***/ }),
/* 11 */
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),
/* 12 */
/***/ ((module) => {

"use strict";
module.exports = require("assert");

/***/ }),
/* 13 */
/***/ ((module) => {

"use strict";
module.exports = require("process");

/***/ }),
/* 14 */
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs/typeorm");

/***/ }),
/* 15 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserModule = void 0;
const common_1 = __webpack_require__(6);
const typeorm_1 = __webpack_require__(14);
const user_entity_1 = __webpack_require__(16);
const user_service_impl_1 = __webpack_require__(19);
const authentication_module_1 = __webpack_require__(24);
const user_controller_1 = __webpack_require__(45);
let UserModule = class UserModule {
};
exports.UserModule = UserModule;
exports.UserModule = UserModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_entity_1.User]), authentication_module_1.AuthenticationModule],
        controllers: [user_controller_1.UserController],
        providers: [
            user_service_impl_1.UserServiceImpl,
            {
                provide: "UserService",
                useClass: user_service_impl_1.UserServiceImpl,
            },
        ],
    })
], UserModule);


/***/ }),
/* 16 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.User = void 0;
const typeorm_1 = __webpack_require__(17);
const role_1 = __webpack_require__(18);
let User = class User {
    updatePassword(password) {
        this.password = password;
    }
    setRefreshToken(refreshToken) {
        this.refreshToken = refreshToken;
    }
    setRefreshTokenExpireDate(refreshTokenExpireDate) {
        this.refreshTokenExpireDateTime = refreshTokenExpireDate;
    }
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("increment", { name: "user_id", type: "int", comment: "이용자 고유 번호" }),
    __metadata("design:type", Number)
], User.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "user_name" }),
    __metadata("design:type", String)
], User.prototype, "userName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "user_age" }),
    __metadata("design:type", Number)
], User.prototype, "userAge", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "user_role",
        type: "varchar",
        enum: role_1.Role,
        default: role_1.Role.USER,
    }),
    __metadata("design:type", typeof (_a = typeof role_1.Role !== "undefined" && role_1.Role) === "function" ? _a : Object)
], User.prototype, "userRole", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: "" }),
    __metadata("design:type", String)
], User.prototype, "refreshToken", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], User.prototype, "refreshTokenExpireDateTime", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)()
], User);


/***/ }),
/* 17 */
/***/ ((module) => {

"use strict";
module.exports = require("typeorm");

/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Role = void 0;
var Role;
(function (Role) {
    Role["ADMIN"] = "ADMIN";
    Role["USER"] = "USER";
})(Role || (exports.Role = Role = {}));


/***/ }),
/* 19 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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
const default_response_1 = __webpack_require__(20);
const user_response_dto_1 = __webpack_require__(21);
const console = __importStar(__webpack_require__(23));
let UserServiceImpl = class UserServiceImpl {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async getProfile(userId) {
        const user = await this.findById(userId);
        if (!user) {
            return default_response_1.DefaultResponse.response(common_1.HttpStatus.FORBIDDEN, "등록되지 않은 이용자에요.");
        }
        return default_response_1.DefaultResponse.responseWithData(common_1.HttpStatus.OK, "작업 성공!", new user_response_dto_1.UserResponseDto(user));
    }
    async findById(userId) {
        if (!userId) {
            throw new common_1.InternalServerErrorException({ statusCode: 500, message: "인증 처리 중 문제가 발생하였어요." });
        }
        return await this.userRepository.findOne({ where: { userId } });
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
/* 20 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DefaultResponse = void 0;
class DefaultResponse {
    constructor(statusCode, message, pagination, data) {
        this.statusCode = statusCode;
        this.message = message;
        this.pagination = pagination;
        this.data = data;
    }
    static response(statusCode, message) {
        return new DefaultResponse(statusCode, message);
    }
    static responseWithData(statusCode, message, data) {
        return new DefaultResponse(statusCode, message, undefined, data);
    }
    static responseWithPaginationAndData(statusCode, message, pagination) {
        return new DefaultResponse(statusCode, message, pagination);
    }
}
exports.DefaultResponse = DefaultResponse;


/***/ }),
/* 21 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserResponseDto = void 0;
const swagger_1 = __webpack_require__(22);
class UserResponseDto {
    constructor(user) {
        this.email = user.email;
        this.name = user.userName;
        this.age = user.userAge;
    }
}
exports.UserResponseDto = UserResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "이용자 Email 주소(계정 ID) 4 ~ 30자 이내" }),
    __metadata("design:type", String)
], UserResponseDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "이용자 이름" }),
    __metadata("design:type", String)
], UserResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "이용자 나이" }),
    __metadata("design:type", Number)
], UserResponseDto.prototype, "age", void 0);


/***/ }),
/* 22 */
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs/swagger");

/***/ }),
/* 23 */
/***/ ((module) => {

"use strict";
module.exports = require("console");

/***/ }),
/* 24 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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
const authentication_controller_1 = __webpack_require__(25);
const authentication_service_impl_1 = __webpack_require__(34);
const jwt_1 = __webpack_require__(36);
const passport_1 = __webpack_require__(31);
const jwt_strategy_1 = __webpack_require__(40);
const user_service_impl_1 = __webpack_require__(19);
const config_1 = __webpack_require__(7);
const jwt_refresh_access_token_strategy_1 = __webpack_require__(43);
const configuration_1 = __importDefault(__webpack_require__(8));
const cookie_service_impl_1 = __webpack_require__(44);
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


/***/ }),
/* 25 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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
const signup_request_dto_1 = __webpack_require__(26);
const authentication_service_1 = __webpack_require__(28);
const signin_request_dto_1 = __webpack_require__(29);
const swagger_1 = __webpack_require__(22);
const jwt_authentication_guard_1 = __webpack_require__(30);
const express_1 = __webpack_require__(32);
const passport_1 = __webpack_require__(31);
const user_token_request_dto_1 = __webpack_require__(33);
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
    async reissueAccessToken(userTokenRequestDto) {
        return this.authenticationService.reissueAccessToken(userTokenRequestDto);
    }
    async signOut(userTokenRequestDto, response) {
        return this.authenticationService.signOut(userTokenRequestDto.email, response);
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
    __param(0, (0, user_token_request_dto_1.GetUserInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_g = typeof user_token_request_dto_1.UserTokenRequestDto !== "undefined" && user_token_request_dto_1.UserTokenRequestDto) === "function" ? _g : Object]),
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
    __param(0, (0, user_token_request_dto_1.GetUserInfo)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_j = typeof user_token_request_dto_1.UserTokenRequestDto !== "undefined" && user_token_request_dto_1.UserTokenRequestDto) === "function" ? _j : Object, typeof (_k = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _k : Object]),
    __metadata("design:returntype", typeof (_l = typeof Promise !== "undefined" && Promise) === "function" ? _l : Object)
], AuthenticationController.prototype, "signOut", null);
exports.AuthenticationController = AuthenticationController = __decorate([
    (0, swagger_1.ApiTags)("인증 서비스"),
    (0, common_1.Controller)("auth"),
    __param(0, (0, common_1.Inject)("AuthenticationService")),
    __metadata("design:paramtypes", [typeof (_a = typeof authentication_service_1.AuthenticationService !== "undefined" && authentication_service_1.AuthenticationService) === "function" ? _a : Object])
], AuthenticationController);


/***/ }),
/* 26 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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
exports.SignupRequestDto = void 0;
const class_validator_1 = __webpack_require__(27);
const user_entity_1 = __webpack_require__(16);
const swagger_1 = __webpack_require__(22);
const role_1 = __webpack_require__(18);
class SignupRequestDto {
    toEntity(signupRequestDto) {
        const user = new user_entity_1.User();
        user.email = signupRequestDto.email;
        user.password = signupRequestDto.password;
        user.userName = signupRequestDto.name;
        user.userAge = signupRequestDto.age;
        return user;
    }
}
exports.SignupRequestDto = SignupRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "이용자 Email 주소(계정 ID) 4 ~ 30자 이내" }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(4),
    (0, class_validator_1.MaxLength)(30),
    __metadata("design:type", String)
], SignupRequestDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "계정 비밀번호" }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^[A-Za-z\d$@!%*?&]{8,15}$/, {
        message: "비밀번호는 영(대, 소)문자, 특수문자($@!%*?&)만 입력 가능하고, 8 ~ 15글자 이내에 입력해야 해요.",
    }),
    __metadata("design:type", String)
], SignupRequestDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "이용자 이름" }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SignupRequestDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "이용자 나이" }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(110),
    __metadata("design:type", Number)
], SignupRequestDto.prototype, "age", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "이용자 역할" }),
    __metadata("design:type", typeof (_a = typeof role_1.Role !== "undefined" && role_1.Role) === "function" ? _a : Object)
], SignupRequestDto.prototype, "role", void 0);


/***/ }),
/* 27 */
/***/ ((module) => {

"use strict";
module.exports = require("class-validator");

/***/ }),
/* 28 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 29 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SigninRequestDto = void 0;
const swagger_1 = __webpack_require__(22);
const class_validator_1 = __webpack_require__(27);
class SigninRequestDto {
}
exports.SigninRequestDto = SigninRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "이용자 Email 주소(계정 ID) 4 ~ 30자 이내" }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.MinLength)(4),
    (0, class_validator_1.MaxLength)(30),
    __metadata("design:type", String)
], SigninRequestDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "계정 비밀번호" }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^[A-Za-z\d$@!%*?&]{8,15}$/, {
        message: "비밀번호는 영(대, 소)문자, 특수문자($@!%*?&)만 입력 가능하고, 8 ~ 15글자 이내에 입력해야 해요.",
    }),
    __metadata("design:type", String)
], SigninRequestDto.prototype, "password", void 0);


/***/ }),
/* 30 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtAuthenticationGuard = void 0;
const common_1 = __webpack_require__(6);
const passport_1 = __webpack_require__(31);
let JwtAuthenticationGuard = class JwtAuthenticationGuard extends (0, passport_1.AuthGuard)("jwt") {
};
exports.JwtAuthenticationGuard = JwtAuthenticationGuard;
exports.JwtAuthenticationGuard = JwtAuthenticationGuard = __decorate([
    (0, common_1.Injectable)()
], JwtAuthenticationGuard);


/***/ }),
/* 31 */
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs/passport");

/***/ }),
/* 32 */
/***/ ((module) => {

"use strict";
module.exports = require("express");

/***/ }),
/* 33 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GetUserInfo = exports.UserTokenRequestDto = void 0;
const common_1 = __webpack_require__(6);
class UserTokenRequestDto {
}
exports.UserTokenRequestDto = UserTokenRequestDto;
exports.GetUserInfo = (0, common_1.createParamDecorator)((date, executionContext) => {
    const request = executionContext.switchToHttp().getRequest();
    return request.user;
});


/***/ }),
/* 34 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthenticationServiceImpl = void 0;
const typeorm_1 = __webpack_require__(14);
const user_entity_1 = __webpack_require__(16);
const common_1 = __webpack_require__(6);
const typeorm_2 = __webpack_require__(17);
const bcrypt = __importStar(__webpack_require__(35));
const jwt_1 = __webpack_require__(36);
const config_1 = __webpack_require__(7);
const SigninResponseDto_1 = __webpack_require__(37);
const cookie_service_1 = __webpack_require__(38);
const encrypt_util_1 = __webpack_require__(39);
const default_response_1 = __webpack_require__(20);
const role_1 = __webpack_require__(18);
let AuthenticationServiceImpl = class AuthenticationServiceImpl {
    constructor(userRepository, configService, jwtService, cookieService) {
        this.userRepository = userRepository;
        this.configService = configService;
        this.jwtService = jwtService;
        this.cookieService = cookieService;
        this.jwtConfig = this.configService.get("jwt");
        this.saltOrRounds = this.jwtConfig.saltOrRounds;
    }
    async signUp(signupRequestDto) {
        if (signupRequestDto === null) {
            return default_response_1.DefaultResponse.response(common_1.HttpStatus.BAD_REQUEST, "회원가입에 실패하였어요.");
        }
        signupRequestDto.password = await encrypt_util_1.EncryptUtil.hashingEncrypt("password", signupRequestDto.password);
        const userEmail = signupRequestDto.email;
        if ((await this.userRepository.findOne({ where: { email: userEmail } })) !== null) {
            return default_response_1.DefaultResponse.response(common_1.HttpStatus.CONFLICT, "이미 등록된 Email 주소 입니다.");
        }
        const users = await this.userRepository.findAndCount();
        if (!users || users[0].length === 0 || users[1] === 0) {
            signupRequestDto.role = role_1.Role.ADMIN;
        }
        const saveUserResult = await this.userRepository.save(signupRequestDto.toEntity(signupRequestDto));
        if (saveUserResult === null) {
            return default_response_1.DefaultResponse.response(common_1.HttpStatus.INTERNAL_SERVER_ERROR, "Server Error");
        }
        return default_response_1.DefaultResponse.responseWithData(common_1.HttpStatus.CREATED, "회원 가입 성공했어요!", saveUserResult.userId);
    }
    async signIn(signinRequestDto, response) {
        const findByUserInfo = await this.userRepository.findOne({
            where: { email: signinRequestDto.email },
        });
        if (findByUserInfo && (await bcrypt.compare(signinRequestDto.password, findByUserInfo.password))) {
            const accessTokenPayload = {
                email: findByUserInfo.email,
                role: findByUserInfo.userRole,
            };
            const refreshTokenPayload = {
                email: findByUserInfo.email,
            };
            const accessToken = this.jwtService.sign(accessTokenPayload, {
                secret: this.jwtConfig.accessTokenSecret,
                expiresIn: this.jwtConfig.accessTokenExpireIn,
            });
            const refreshToken = this.jwtService.sign(refreshTokenPayload, {
                secret: this.jwtConfig.refreshTokenSecret,
                expiresIn: this.jwtConfig.refreshTokenExpireIn,
            });
            findByUserInfo.setRefreshToken(await encrypt_util_1.EncryptUtil.hashingEncrypt("token", refreshToken));
            findByUserInfo.setRefreshTokenExpireDate(this.getCurrentRefreshTokenExpireDate());
            await this.userRepository.update(findByUserInfo.userId, {
                refreshToken: findByUserInfo.refreshToken,
                refreshTokenExpireDateTime: findByUserInfo.refreshTokenExpireDateTime,
            });
            response.setHeader("authorization", "Bearer " + [accessToken, refreshToken]);
            this.cookieService.setRefreshToken(response, refreshToken);
            return default_response_1.DefaultResponse.responseWithData(common_1.HttpStatus.OK, "로그인 성공!", new SigninResponseDto_1.SigninResponseDto(accessToken, refreshToken, findByUserInfo.refreshTokenExpireDateTime));
        }
        else {
            return default_response_1.DefaultResponse.response(common_1.HttpStatus.BAD_REQUEST, "로그인 실패! Email 또는 비밀번호를 확인해주세요.");
        }
    }
    async reissueAccessToken(userTokenRequestDto) {
        if (userTokenRequestDto === null) {
            return default_response_1.DefaultResponse.response(common_1.HttpStatus.BAD_REQUEST, "Access Token 재발급에 실패하였어요.");
        }
        const accessTokenPayload = {
            email: userTokenRequestDto.email,
            role: userTokenRequestDto.role,
        };
        return default_response_1.DefaultResponse.responseWithData(common_1.HttpStatus.OK, "Access Token 재발급 성공!", this.jwtService.sign(accessTokenPayload, {
            secret: this.jwtConfig.accessTokenSecret,
            expiresIn: this.jwtConfig.accessTokenExpireIn,
        }));
    }
    async validateRefreshToken(authUser, refreshToken) {
        if (!(await bcrypt.compare(refreshToken, authUser.refreshToken))) {
            throw new common_1.UnauthorizedException({ statusCode: 401, message: "Refresh Token이 유효하지 않아요." });
        }
    }
    async signOut(email, response) {
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            return default_response_1.DefaultResponse.response(common_1.HttpStatus.UNAUTHORIZED, "로그 아웃 실패! 이용자 정보를 찾을 수 없어요.");
        }
        user.setRefreshToken("");
        user.setRefreshTokenExpireDate(null);
        await this.userRepository.update(user.userId, {
            refreshToken: user.refreshToken,
            refreshTokenExpireDateTime: user.refreshTokenExpireDateTime,
        });
        this.cookieService.clearRefreshToken(response);
        return default_response_1.DefaultResponse.response(common_1.HttpStatus.OK, "로그아웃 성공!");
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
    getCurrentRefreshTokenExpireDate() {
        const currentDate = new Date();
        return new Date(currentDate.getTime() + parseInt(this.configService.get("jwt.refreshTokenExpireIn")));
    }
};
exports.AuthenticationServiceImpl = AuthenticationServiceImpl;
exports.AuthenticationServiceImpl = AuthenticationServiceImpl = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(3, (0, common_1.Inject)("CookieService")),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _b : Object, typeof (_c = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _c : Object, typeof (_d = typeof cookie_service_1.CookieService !== "undefined" && cookie_service_1.CookieService) === "function" ? _d : Object])
], AuthenticationServiceImpl);


/***/ }),
/* 35 */
/***/ ((module) => {

"use strict";
module.exports = require("bcrypt");

/***/ }),
/* 36 */
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs/jwt");

/***/ }),
/* 37 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SigninResponseDto = void 0;
class SigninResponseDto {
    constructor(accessToken, refreshToken, refreshTokenExpireDate) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.refreshTokenExpireDate = refreshTokenExpireDate;
    }
}
exports.SigninResponseDto = SigninResponseDto;


/***/ }),
/* 38 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 39 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EncryptUtil = void 0;
const bcrypt = __importStar(__webpack_require__(35));
const configuration_1 = __importDefault(__webpack_require__(8));
class EncryptUtil {
    static async hashingEncrypt(division, plainText) {
        if (division === "token") {
            return await bcrypt.hash(plainText, parseInt((0, configuration_1.default)().jwt.salt));
        }
        else if (division === "password") {
            return await bcrypt.hash(plainText, parseInt((0, configuration_1.default)().bcrypt.salt));
        }
        else {
            throw new Error("해싱 암호화 작업에 실패했어요. 암호 대상의 구분값을 확인해 주세요.");
        }
    }
}
exports.EncryptUtil = EncryptUtil;


/***/ }),
/* 40 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtStrategy = void 0;
const passport_1 = __webpack_require__(31);
const passport_jwt_1 = __webpack_require__(41);
const common_1 = __webpack_require__(6);
const user_service_1 = __webpack_require__(42);
const config_1 = __webpack_require__(7);
let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, "jwt") {
    constructor(userService, configService) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get("jwt.accessTokenSecret"),
        });
        this.userService = userService;
        this.configService = configService;
    }
    async validate(jwtPayload, done) {
        const authUser = await this.userService.findByEmail(jwtPayload.email);
        if (!authUser) {
            throw new common_1.UnauthorizedException({ statusCode: 401, message: "회원 정보를 찾을 수 없어요." });
        }
        return done(null, {
            id: authUser.userId,
            email: authUser.email,
            name: authUser.userName,
            role: authUser.userRole,
        });
    }
};
exports.JwtStrategy = JwtStrategy;
exports.JwtStrategy = JwtStrategy = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)("UserService")),
    __metadata("design:paramtypes", [typeof (_a = typeof user_service_1.UserService !== "undefined" && user_service_1.UserService) === "function" ? _a : Object, typeof (_b = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _b : Object])
], JwtStrategy);


/***/ }),
/* 41 */
/***/ ((module) => {

"use strict";
module.exports = require("passport-jwt");

/***/ }),
/* 42 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 43 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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
const passport_1 = __webpack_require__(31);
const passport_jwt_1 = __webpack_require__(41);
const config_1 = __webpack_require__(7);
const user_service_1 = __webpack_require__(42);
const authentication_service_1 = __webpack_require__(28);
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
/* 44 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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
        response.clearCookie("refreshToken");
        response.removeHeader("Authorization");
    }
};
exports.CookieServiceImpl = CookieServiceImpl;
exports.CookieServiceImpl = CookieServiceImpl = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], CookieServiceImpl);


/***/ }),
/* 45 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserController = void 0;
const common_1 = __webpack_require__(6);
const jwt_authentication_guard_1 = __webpack_require__(30);
const default_response_1 = __webpack_require__(20);
const user_service_1 = __webpack_require__(42);
const swagger_1 = __webpack_require__(22);
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async getProfile(userId) {
        return this.userService.getProfile(userId);
    }
};
exports.UserController = UserController;
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: "회원 정보 조회",
    }),
    (0, swagger_1.ApiOkResponse)({
        description: "작업 성공!",
        type: (default_response_1.DefaultResponse),
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)("/profile/:id"),
    (0, common_1.UseGuards)(jwt_authentication_guard_1.JwtAuthenticationGuard),
    __param(0, (0, common_1.Param)("userId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], UserController.prototype, "getProfile", null);
exports.UserController = UserController = __decorate([
    (0, swagger_1.ApiTags)("이용자 서비스"),
    (0, common_1.Controller)("user"),
    __param(0, (0, common_1.Inject)("UserService")),
    __metadata("design:paramtypes", [typeof (_a = typeof user_service_1.UserService !== "undefined" && user_service_1.UserService) === "function" ? _a : Object])
], UserController);


/***/ }),
/* 46 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FileModule = void 0;
const common_1 = __webpack_require__(6);
const file_controller_1 = __webpack_require__(47);
const file_service_impl_1 = __webpack_require__(52);
const typeorm_1 = __webpack_require__(14);
const file_entity_1 = __webpack_require__(53);
let FileModule = class FileModule {
};
exports.FileModule = FileModule;
exports.FileModule = FileModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([file_entity_1.File])],
        controllers: [file_controller_1.FileController],
        providers: [
            file_service_impl_1.FileServiceImpl,
            {
                provide: "FileService",
                useClass: file_service_impl_1.FileServiceImpl,
            },
        ],
    })
], FileModule);


/***/ }),
/* 47 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FileController = void 0;
const swagger_1 = __webpack_require__(22);
const common_1 = __webpack_require__(6);
const platform_express_1 = __webpack_require__(48);
const multer_1 = __webpack_require__(49);
const path_1 = __webpack_require__(11);
const default_response_1 = __webpack_require__(20);
const file_service_1 = __webpack_require__(50);
const express_1 = __webpack_require__(32);
const multer_options_1 = __webpack_require__(51);
let FileController = class FileController {
    constructor(fileService) {
        this.fileService = fileService;
    }
    async uploadImage(image) {
        return this.fileService.uploadImage(image);
    }
    uploadImages(images) {
        return this.fileService.uploadImages(images);
    }
    viewImage(name, response) {
        return this.fileService.viewImage(name, response);
    }
    getImageUrl(imageId) {
        return this.fileService.getImageUrl(imageId);
    }
    async getImagesUrl(imageIds) {
        return this.fileService.getImagesUrl(imageIds);
    }
};
exports.FileController = FileController;
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: "단일 이미지 업로드 기능",
    }),
    (0, swagger_1.ApiOkResponse)({
        description: "파일 업로드 성공!",
        type: (Promise),
    }),
    (0, common_1.Post)("/uploads/image"),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("image", {
        storage: (0, multer_1.diskStorage)({
            destination: "./local/storage/images",
            filename(_, file, callback) {
                const randomName = Array(32)
                    .fill(null)
                    .map(() => Math.round(Math.random() * 16).toString(16))
                    .join("");
                return callback(null, `${randomName}${(0, path_1.extname)(file.originalname)}`);
            },
        }),
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof Express !== "undefined" && (_b = Express.Multer) !== void 0 && _b.File) === "function" ? _c : Object]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], FileController.prototype, "uploadImage", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: "다중 이미지 업로드 기능",
    }),
    (0, swagger_1.ApiOkResponse)({
        description: "파일 업로드 성공!",
        type: (Promise),
    }),
    (0, common_1.Post)("/uploads/images"),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)("images", null, multer_options_1.mainMulterDiskOptions)),
    (0, common_1.Bind)((0, common_1.UploadedFiles)()),
    __param(0, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof Array !== "undefined" && Array) === "function" ? _e : Object]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], FileController.prototype, "uploadImages", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: "단일 이미지 출력 기능",
    }),
    (0, swagger_1.ApiOkResponse)({
        description: "성공!",
        type: (default_response_1.DefaultResponse),
    }),
    (0, common_1.Get)("/image/view/:name"),
    __param(0, (0, common_1.Param)("name")),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_g = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _g : Object]),
    __metadata("design:returntype", typeof (_h = typeof default_response_1.DefaultResponse !== "undefined" && default_response_1.DefaultResponse) === "function" ? _h : Object)
], FileController.prototype, "viewImage", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: "단일 이미지 정보 받기",
    }),
    (0, swagger_1.ApiOkResponse)({
        description: "성공!",
        type: (default_response_1.DefaultResponse),
    }),
    (0, common_1.Get)("/image/:imageId"),
    __param(0, (0, common_1.Param)("imageId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_j = typeof Promise !== "undefined" && Promise) === "function" ? _j : Object)
], FileController.prototype, "getImageUrl", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: "다중 이미지 정보 받기",
    }),
    (0, swagger_1.ApiOkResponse)({
        description: "성공!",
        type: (default_response_1.DefaultResponse),
    }),
    (0, common_1.Get)("/images/"),
    __param(0, (0, common_1.Query)("imageIds")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", typeof (_k = typeof Promise !== "undefined" && Promise) === "function" ? _k : Object)
], FileController.prototype, "getImagesUrl", null);
exports.FileController = FileController = __decorate([
    (0, swagger_1.ApiTags)("파일 처리 서비스"),
    (0, common_1.Controller)("file"),
    __param(0, (0, common_1.Inject)("FileService")),
    __metadata("design:paramtypes", [typeof (_a = typeof file_service_1.FileService !== "undefined" && file_service_1.FileService) === "function" ? _a : Object])
], FileController);


/***/ }),
/* 48 */
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs/platform-express");

/***/ }),
/* 49 */
/***/ ((module) => {

"use strict";
module.exports = require("multer");

/***/ }),
/* 50 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 51 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.detailMulterDiskOptions = exports.additionalMulterDiskOptions = exports.mainMulterDiskOptions = void 0;
const common_1 = __webpack_require__(6);
const fs_1 = __importDefault(__webpack_require__(9));
const multer_1 = __webpack_require__(49);
const path_1 = __webpack_require__(11);
const process_1 = __importDefault(__webpack_require__(13));
exports.mainMulterDiskOptions = {
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
            const uploadPath = (0, path_1.join)(process_1.default.cwd(), "local", "storage", "product", "images", "main");
            fs_1.default.mkdir(uploadPath, { recursive: true }, (error) => {
                if (error && error.code !== "EEXIST") {
                    callback(error, uploadPath);
                }
                else {
                    callback(null, uploadPath);
                }
            });
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
        files: 1,
    },
};
exports.additionalMulterDiskOptions = {
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
            const uploadPath = (0, path_1.join)(process_1.default.cwd(), "local", "storage", "product", "images", "additional");
            fs_1.default.mkdir(uploadPath, { recursive: true }, (error) => {
                if (error && error.code !== "EEXIST") {
                    callback(error, uploadPath);
                }
                else {
                    callback(null, uploadPath);
                }
            });
        },
        filename: (request, file, callback) => {
            callback(null, `${Date.now()}${(0, path_1.extname)(file.originalname)}`);
        },
    }),
    limits: {
        fieldNameSize: 200,
        filedSize: 1024 * 1024,
        fields: 5,
        fileSize: 10485760,
        files: 5,
    },
};
exports.detailMulterDiskOptions = {
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
            const uploadPath = (0, path_1.join)(process_1.default.cwd(), "local", "storage", "product", "images", "detail");
            fs_1.default.mkdir(uploadPath, { recursive: true }, (error) => {
                if (error && error.code !== "EEXIST") {
                    callback(error, uploadPath);
                }
                else {
                    callback(null, uploadPath);
                }
            });
        },
        filename: (request, file, callback) => {
            callback(null, `${Date.now()}${(0, path_1.extname)(file.originalname)}`);
        },
    }),
    limits: {
        fieldNameSize: 200,
        filedSize: 1024 * 1024,
        fields: 5,
        fileSize: 10485760,
        files: 10,
    },
};


/***/ }),
/* 52 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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
            imageUrl: file.url,
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
                imageUrl: saveFile.url,
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
        return default_response_1.DefaultResponse.responseWithData(common_1.HttpStatus.OK, "성공!", image.url);
    }
    async getImagesUrl(imageIds) {
        if (!imageIds || imageIds.length === 0) {
            return default_response_1.DefaultResponse.response(common_1.HttpStatus.BAD_REQUEST, "조회할 파일 정보를 확인해 주세요.");
        }
        const images = [];
        for (const id of imageIds) {
            const image = await this.fileRepository.findOne({ where: { id } });
            if (image) {
                images.push({ imageUrl: image.url });
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


/***/ }),
/* 53 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.File = void 0;
const typeorm_1 = __webpack_require__(17);
let File = class File {
    constructor(fieldName, originalName, encoding, mimetype, destination, filename, path, size, imageUrl) {
        this.fieldName = fieldName;
        this.originalName = originalName;
        this.encoding = encoding;
        this.mimetype = mimetype;
        this.destination = destination;
        this.filename = filename;
        this.path = path;
        this.size = size;
        this.url = imageUrl;
    }
};
exports.File = File;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("increment", { type: "int", comment: "파일 고유 번호" }),
    __metadata("design:type", Number)
], File.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "field_name" }),
    __metadata("design:type", String)
], File.prototype, "fieldName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "original_name" }),
    __metadata("design:type", String)
], File.prototype, "originalName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], File.prototype, "encoding", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], File.prototype, "mimetype", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], File.prototype, "destination", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], File.prototype, "filename", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], File.prototype, "path", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], File.prototype, "size", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], File.prototype, "url", void 0);
exports.File = File = __decorate([
    (0, typeorm_1.Entity)(),
    __metadata("design:paramtypes", [String, String, String, String, String, String, String, Number, String])
], File);


/***/ }),
/* 54 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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
exports.ProductModule = void 0;
const common_1 = __webpack_require__(6);
const config_1 = __webpack_require__(7);
const configuration_1 = __importDefault(__webpack_require__(8));
const typeorm_1 = __webpack_require__(14);
const product_entity_1 = __webpack_require__(55);
const product_additional_image_entity_1 = __webpack_require__(62);
const product_controller_1 = __webpack_require__(64);
const product_service_impl_1 = __webpack_require__(75);
const category_entity_1 = __webpack_require__(56);
const division_entity_1 = __webpack_require__(57);
const product_detail_image_entity_1 = __webpack_require__(63);
const product_query_builder_repository_1 = __webpack_require__(87);
const user_entity_1 = __webpack_require__(16);
const user_service_impl_1 = __webpack_require__(19);
let ProductModule = class ProductModule {
};
exports.ProductModule = ProductModule;
exports.ProductModule = ProductModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [configuration_1.default],
            }),
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, product_entity_1.Product, product_additional_image_entity_1.ProductAdditionalImage, product_detail_image_entity_1.ProductDetailImage, category_entity_1.Category, division_entity_1.Division]),
        ],
        controllers: [product_controller_1.ProductController],
        providers: [
            user_service_impl_1.UserServiceImpl,
            {
                provide: "UserService",
                useClass: user_service_impl_1.UserServiceImpl,
            },
            product_service_impl_1.ProductServiceImpl,
            {
                provide: "ProductService",
                useClass: product_service_impl_1.ProductServiceImpl,
            },
            product_query_builder_repository_1.ProductQueryBuilderRepository,
            {
                provide: "ProductQueryBuilderRepository",
                useClass: product_query_builder_repository_1.ProductQueryBuilderRepository,
            },
        ],
    })
], ProductModule);


/***/ }),
/* 55 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Product = void 0;
const typeorm_1 = __webpack_require__(17);
const user_entity_1 = __webpack_require__(16);
const category_entity_1 = __webpack_require__(56);
const division_entity_1 = __webpack_require__(57);
const base_date_time_entity_1 = __webpack_require__(58);
const product_additional_image_entity_1 = __webpack_require__(62);
const product_detail_image_entity_1 = __webpack_require__(63);
let Product = class Product extends base_date_time_entity_1.BaseDateTime {
};
exports.Product = Product;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("increment", { name: "product_id", type: "int", comment: "상품 고유 번호" }),
    __metadata("design:type", Number)
], Product.prototype, "productId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.userId),
    (0, typeorm_1.JoinColumn)([{ name: "user_id", referencedColumnName: "userId" }]),
    __metadata("design:type", typeof (_a = typeof user_entity_1.User !== "undefined" && user_entity_1.User) === "function" ? _a : Object)
], Product.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => category_entity_1.Category, (category) => category.categoryId),
    (0, typeorm_1.JoinColumn)([{ name: "category_id", referencedColumnName: "categoryId" }]),
    __metadata("design:type", typeof (_b = typeof category_entity_1.Category !== "undefined" && category_entity_1.Category) === "function" ? _b : Object)
], Product.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => division_entity_1.Division, (division) => division.divisionId),
    (0, typeorm_1.JoinColumn)([{ name: "division_id", referencedColumnName: "divisionId" }]),
    __metadata("design:type", typeof (_c = typeof division_entity_1.Division !== "undefined" && division_entity_1.Division) === "function" ? _c : Object)
], Product.prototype, "division", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "product_name", type: "varchar", length: 100, nullable: false, comment: "상품 이름" }),
    __metadata("design:type", String)
], Product.prototype, "productName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "product_count", type: "int", default: 1, nullable: false, comment: "상품 개수" }),
    __metadata("design:type", Number)
], Product.prototype, "productCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "product_price", type: "int", nullable: false, comment: "상품 가격" }),
    __metadata("design:type", Number)
], Product.prototype, "productPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "product_content", type: "text", nullable: false, comment: "상품 상세 내용" }),
    __metadata("design:type", String)
], Product.prototype, "productContent", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "product_main_image_url", type: "varchar", length: 255, nullable: true, comment: "상품 대표 이미지" }),
    __metadata("design:type", String)
], Product.prototype, "productMainImageUrl", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => product_additional_image_entity_1.ProductAdditionalImage, (productAdditionalImage) => productAdditionalImage.product, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], Product.prototype, "productAdditionalImages", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => product_detail_image_entity_1.ProductDetailImage, (productDetailImage) => productDetailImage.product, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], Product.prototype, "productDetailImages", void 0);
exports.Product = Product = __decorate([
    (0, typeorm_1.Entity)()
], Product);


/***/ }),
/* 56 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Category = void 0;
const typeorm_1 = __webpack_require__(17);
let Category = class Category {
};
exports.Category = Category;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("increment", { name: "category_id", type: "int", comment: "카테고리 고유 번호" }),
    __metadata("design:type", Number)
], Category.prototype, "categoryId", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "category_name", length: 10, nullable: false, comment: "카테고리 이름" }),
    __metadata("design:type", String)
], Category.prototype, "categoryName", void 0);
exports.Category = Category = __decorate([
    (0, typeorm_1.Entity)()
], Category);


/***/ }),
/* 57 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Division = void 0;
const typeorm_1 = __webpack_require__(17);
let Division = class Division {
};
exports.Division = Division;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("increment", { name: "division_id", type: "int", comment: "분류 고유 번호" }),
    __metadata("design:type", Number)
], Division.prototype, "divisionId", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "division_name", length: 10, nullable: false, comment: "분류 이름" }),
    __metadata("design:type", String)
], Division.prototype, "divisionName", void 0);
exports.Division = Division = __decorate([
    (0, typeorm_1.Entity)()
], Division);


/***/ }),
/* 58 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BaseDateTime = void 0;
const typeorm_1 = __webpack_require__(17);
const class_transformer_1 = __webpack_require__(59);
const date_time_util_1 = __webpack_require__(60);
class BaseDateTime {
    getCreateDateTime() {
        return date_time_util_1.DateTimeUtil.toString(date_time_util_1.DateTimeUtil.toLocalDateTime(this.createdDateTime));
    }
    getUpdateDateTime() {
        return date_time_util_1.DateTimeUtil.toString(date_time_util_1.DateTimeUtil.toLocalDateTime(this.updatedDateTime));
    }
    getDeleteDateTime() {
        return date_time_util_1.DateTimeUtil.toString(date_time_util_1.DateTimeUtil.toLocalDateTime(this.deletedDateTime));
    }
}
exports.BaseDateTime = BaseDateTime;
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: "datetime", default: () => "CURRENT_TIMESTAMP", name: "created_date_time", comment: "생성 일시" }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], BaseDateTime.prototype, "createdDateTime", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: "datetime", default: () => "CURRENT_TIMESTAMP", name: "updated_date_time", comment: "수정 일시" }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], BaseDateTime.prototype, "updatedDateTime", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.DeleteDateColumn)({ type: "datetime", default: () => null, name: "deleted_date_time", comment: "삭제 일시" }),
    __metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], BaseDateTime.prototype, "deletedDateTime", void 0);


/***/ }),
/* 59 */
/***/ ((module) => {

"use strict";
module.exports = require("class-transformer");

/***/ }),
/* 60 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DateTimeUtil = void 0;
const js_joda_1 = __webpack_require__(61);
class DateTimeUtil {
    static toString(localDate) {
        if (!localDate) {
            return "";
        }
        if (localDate instanceof js_joda_1.LocalDate) {
            return localDate.format(DateTimeUtil.DATE_FORMATTER);
        }
        return localDate.format(DateTimeUtil.DATE_TIME_FORMATTER);
    }
    static toDate(localDate) {
        if (!localDate) {
            return null;
        }
        return (0, js_joda_1.convert)(localDate).toDate();
    }
    static toLocalDate(date) {
        if (!date) {
            return null;
        }
        return js_joda_1.LocalDate.from((0, js_joda_1.nativeJs)(date));
    }
    static toLocalDateTime(date) {
        if (!date) {
            return null;
        }
        return js_joda_1.LocalDateTime.from((0, js_joda_1.nativeJs)(date));
    }
    static toLocalDateBy(stringDate) {
        if (!stringDate) {
            return null;
        }
        return js_joda_1.LocalDate.parse(stringDate, DateTimeUtil.DATE_FORMATTER);
    }
    static toLocalDateTimeBy(stringDateTime) {
        if (!stringDateTime) {
            return null;
        }
        return js_joda_1.LocalDateTime.parse(stringDateTime, DateTimeUtil.DATE_TIME_FORMATTER);
    }
}
exports.DateTimeUtil = DateTimeUtil;
DateTimeUtil.DATE_FORMATTER = js_joda_1.DateTimeFormatter.ofPattern("yyyy-MM-dd");
DateTimeUtil.DATE_TIME_FORMATTER = js_joda_1.DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");


/***/ }),
/* 61 */
/***/ ((module) => {

"use strict";
module.exports = require("js-joda");

/***/ }),
/* 62 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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
exports.ProductAdditionalImage = void 0;
const typeorm_1 = __webpack_require__(17);
const product_entity_1 = __webpack_require__(55);
let ProductAdditionalImage = class ProductAdditionalImage {
};
exports.ProductAdditionalImage = ProductAdditionalImage;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("increment", { type: "int", comment: "상품 사진 고유 번호" }),
    __metadata("design:type", Number)
], ProductAdditionalImage.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entity_1.Product, (product) => product.productId, { nullable: false, onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)([{ name: "product_id", referencedColumnName: "productId" }]),
    __metadata("design:type", typeof (_a = typeof product_entity_1.Product !== "undefined" && product_entity_1.Product) === "function" ? _a : Object)
], ProductAdditionalImage.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "url", length: 255, comment: "이미지 URN" }),
    __metadata("design:type", String)
], ProductAdditionalImage.prototype, "url", void 0);
exports.ProductAdditionalImage = ProductAdditionalImage = __decorate([
    (0, typeorm_1.Entity)()
], ProductAdditionalImage);


/***/ }),
/* 63 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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
exports.ProductDetailImage = void 0;
const typeorm_1 = __webpack_require__(17);
const product_entity_1 = __webpack_require__(55);
let ProductDetailImage = class ProductDetailImage {
};
exports.ProductDetailImage = ProductDetailImage;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("increment", { type: "int", comment: "상품 사진 고유 번호" }),
    __metadata("design:type", Number)
], ProductDetailImage.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entity_1.Product, (product) => product.productId, { nullable: false, onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)([{ name: "product_id", referencedColumnName: "productId" }]),
    __metadata("design:type", typeof (_a = typeof product_entity_1.Product !== "undefined" && product_entity_1.Product) === "function" ? _a : Object)
], ProductDetailImage.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "url", length: 255, comment: "이미지 URN" }),
    __metadata("design:type", String)
], ProductDetailImage.prototype, "url", void 0);
exports.ProductDetailImage = ProductDetailImage = __decorate([
    (0, typeorm_1.Entity)()
], ProductDetailImage);


/***/ }),
/* 64 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductController = void 0;
const swagger_1 = __webpack_require__(22);
const common_1 = __webpack_require__(6);
const default_response_1 = __webpack_require__(20);
const product_service_1 = __webpack_require__(65);
const product_edit_request_dto_1 = __webpack_require__(66);
const platform_express_1 = __webpack_require__(48);
const multer_options_1 = __webpack_require__(51);
const product_search_request_dto_1 = __webpack_require__(67);
const product_update_request_dto_1 = __webpack_require__(71);
const product_checked_id_request_dto_1 = __webpack_require__(72);
const product_image_delete_request_dto_1 = __webpack_require__(73);
const jwt_authentication_guard_1 = __webpack_require__(30);
const user_token_request_dto_1 = __webpack_require__(33);
const express_1 = __webpack_require__(32);
let ProductController = class ProductController {
    constructor(productService) {
        this.productService = productService;
    }
    async createProductMainImages(userTokenRequestDto, mainImage) {
        return this.productService.createProductMainImages(userTokenRequestDto, mainImage);
    }
    async createResizeProductMainImages(userTokenRequestDto, mainImage) {
        return this.productService.createResizeProductImages(userTokenRequestDto, mainImage, 48, 48);
    }
    async createResizeProductAdditionalImages(userTokenRequestDto, additionalImage) {
        return this.productService.createResizeProductImages(userTokenRequestDto, additionalImage, 264, 264);
    }
    async createResizeProductDetailImages(userTokenRequestDto, detailImage) {
        return this.productService.createResizeProductImages(userTokenRequestDto, detailImage, 1700, 1700);
    }
    async createProduct(userTokenRequestDto, productEditRequestDto) {
        return this.productService.createProduct(userTokenRequestDto, productEditRequestDto);
    }
    async createProductAdditionalImages(additionalImages, productId, userTokenRequestDto) {
        return this.productService.createProductAdditionalImages(userTokenRequestDto, additionalImages, productId);
    }
    async createProductDetailImages(detailImages, productId, userTokenRequestDto) {
        return this.productService.createProductDetailImages(userTokenRequestDto, detailImages, productId);
    }
    async getProductList(userTokenRequestDto, productSearchRequestDto) {
        return this.productService.getProductList(userTokenRequestDto, productSearchRequestDto);
    }
    async getProductDetail(userTokenRequestDto, productId) {
        return this.productService.getProductDetail(userTokenRequestDto, productId);
    }
    viewImage(userTokenRequestDto, urn, response) {
        return this.productService.viewImage(userTokenRequestDto, urn, response);
    }
    async deleteProductMainImages(userTokenRequestDto, productCheckedIdRequestDto) {
        return this.productService.deleteProductMainImages(userTokenRequestDto, productCheckedIdRequestDto);
    }
    async updateProduct(userTokenRequestDto, productUpdateRequestDto) {
        return this.productService.updateProduct(userTokenRequestDto, productUpdateRequestDto);
    }
    async deleteProductAdditionalImages(userTokenRequestDto, productImageDeleteRequestDto) {
        return this.productService.deleteProductAdditionalImages(userTokenRequestDto, productImageDeleteRequestDto);
    }
    async deleteProductDetailImages(userTokenRequestDto, productImageDeleteRequestDto) {
        return this.productService.deleteProductDetailImages(userTokenRequestDto, productImageDeleteRequestDto);
    }
    async deleteProduct(userTokenRequestDto, productCheckedIdRequestDto) {
        return this.productService.deleteProduct(userTokenRequestDto, productCheckedIdRequestDto);
    }
    async restoreProduct(userTokenRequestDto, productCheckedIdRequestDto) {
        return this.productService.restoreProduct(userTokenRequestDto, productCheckedIdRequestDto);
    }
};
exports.ProductController = ProductController;
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: "상품 메인 이미지 등록",
    }),
    (0, swagger_1.ApiOkResponse)({
        description: "작업 성공!",
        type: (Promise),
    }),
    (0, swagger_1.ApiConsumes)("multipart/form-data"),
    (0, swagger_1.ApiBody)({
        schema: {
            type: "object",
            properties: {
                mainImage: {
                    type: "string",
                    format: "binary",
                },
            },
        },
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Post)("/main-images/"),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)("mainImage", null, multer_options_1.mainMulterDiskOptions)),
    (0, common_1.Bind)((0, common_1.UploadedFiles)()),
    (0, common_1.UseGuards)(jwt_authentication_guard_1.JwtAuthenticationGuard),
    __param(0, (0, user_token_request_dto_1.GetUserInfo)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof user_token_request_dto_1.UserTokenRequestDto !== "undefined" && user_token_request_dto_1.UserTokenRequestDto) === "function" ? _b : Object, typeof (_d = typeof Express !== "undefined" && (_c = Express.Multer) !== void 0 && _c.File) === "function" ? _d : Object]),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], ProductController.prototype, "createProductMainImages", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: "상품 메인 이미지 Resize 등록",
    }),
    (0, swagger_1.ApiOkResponse)({
        description: "작업 성공!",
        type: (Promise),
    }),
    (0, swagger_1.ApiConsumes)("multipart/form-data"),
    (0, swagger_1.ApiBody)({
        schema: {
            type: "object",
            properties: {
                mainImage: {
                    type: "string",
                    format: "binary",
                },
            },
        },
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Patch)("/main-images/"),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)("mainImage", null, multer_options_1.mainMulterDiskOptions)),
    (0, common_1.Bind)((0, common_1.UploadedFiles)()),
    (0, common_1.UseGuards)(jwt_authentication_guard_1.JwtAuthenticationGuard),
    __param(0, (0, user_token_request_dto_1.GetUserInfo)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_f = typeof user_token_request_dto_1.UserTokenRequestDto !== "undefined" && user_token_request_dto_1.UserTokenRequestDto) === "function" ? _f : Object, typeof (_h = typeof Express !== "undefined" && (_g = Express.Multer) !== void 0 && _g.File) === "function" ? _h : Object]),
    __metadata("design:returntype", typeof (_j = typeof Promise !== "undefined" && Promise) === "function" ? _j : Object)
], ProductController.prototype, "createResizeProductMainImages", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: "상품 추가 이미지 Resize 등록",
    }),
    (0, swagger_1.ApiOkResponse)({
        description: "작업 성공!",
        type: (Promise),
    }),
    (0, swagger_1.ApiConsumes)("multipart/form-data"),
    (0, swagger_1.ApiBody)({
        schema: {
            type: "object",
            properties: {
                mainImage: {
                    type: "string",
                    format: "binary",
                },
            },
        },
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Patch)("/additional-images/"),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)("additionalImage", null, multer_options_1.additionalMulterDiskOptions)),
    (0, common_1.Bind)((0, common_1.UploadedFiles)()),
    (0, common_1.UseGuards)(jwt_authentication_guard_1.JwtAuthenticationGuard),
    __param(0, (0, user_token_request_dto_1.GetUserInfo)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_k = typeof user_token_request_dto_1.UserTokenRequestDto !== "undefined" && user_token_request_dto_1.UserTokenRequestDto) === "function" ? _k : Object, typeof (_m = typeof Express !== "undefined" && (_l = Express.Multer) !== void 0 && _l.File) === "function" ? _m : Object]),
    __metadata("design:returntype", typeof (_o = typeof Promise !== "undefined" && Promise) === "function" ? _o : Object)
], ProductController.prototype, "createResizeProductAdditionalImages", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: "상품 상세 이미지 Resize 등록",
    }),
    (0, swagger_1.ApiOkResponse)({
        description: "작업 성공!",
        type: (Promise),
    }),
    (0, swagger_1.ApiConsumes)("multipart/form-data"),
    (0, swagger_1.ApiBody)({
        schema: {
            type: "object",
            properties: {
                mainImage: {
                    type: "string",
                    format: "binary",
                },
            },
        },
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Patch)("/detail-images/"),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)("detailImage", null, multer_options_1.detailMulterDiskOptions)),
    (0, common_1.Bind)((0, common_1.UploadedFiles)()),
    (0, common_1.UseGuards)(jwt_authentication_guard_1.JwtAuthenticationGuard),
    __param(0, (0, user_token_request_dto_1.GetUserInfo)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_p = typeof user_token_request_dto_1.UserTokenRequestDto !== "undefined" && user_token_request_dto_1.UserTokenRequestDto) === "function" ? _p : Object, typeof (_r = typeof Express !== "undefined" && (_q = Express.Multer) !== void 0 && _q.File) === "function" ? _r : Object]),
    __metadata("design:returntype", typeof (_s = typeof Promise !== "undefined" && Promise) === "function" ? _s : Object)
], ProductController.prototype, "createResizeProductDetailImages", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: "상품 등록",
    }),
    (0, swagger_1.ApiOkResponse)({
        description: "작업 성공!",
        type: (Promise),
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_authentication_guard_1.JwtAuthenticationGuard),
    __param(0, (0, user_token_request_dto_1.GetUserInfo)()),
    __param(1, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_t = typeof user_token_request_dto_1.UserTokenRequestDto !== "undefined" && user_token_request_dto_1.UserTokenRequestDto) === "function" ? _t : Object, typeof (_u = typeof product_edit_request_dto_1.ProductEditRequestDto !== "undefined" && product_edit_request_dto_1.ProductEditRequestDto) === "function" ? _u : Object]),
    __metadata("design:returntype", typeof (_v = typeof Promise !== "undefined" && Promise) === "function" ? _v : Object)
], ProductController.prototype, "createProduct", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: "상품 추가 이미지 등록",
    }),
    (0, swagger_1.ApiOkResponse)({
        description: "작업 성공!",
        type: (Promise),
    }),
    (0, swagger_1.ApiConsumes)("multipart/form-data"),
    (0, swagger_1.ApiBody)({
        schema: {
            type: "object",
            properties: {
                추가_이미지1: {
                    type: "string",
                    format: "binary",
                },
                추가_이미지2: {
                    type: "string",
                    format: "binary",
                },
            },
        },
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Post)("/additional-images"),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)("additionalImages", null, multer_options_1.additionalMulterDiskOptions)),
    (0, common_1.Bind)((0, common_1.UploadedFiles)()),
    (0, common_1.UseGuards)(jwt_authentication_guard_1.JwtAuthenticationGuard),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, user_token_request_dto_1.GetUserInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_w = typeof Array !== "undefined" && Array) === "function" ? _w : Object, String, typeof (_x = typeof user_token_request_dto_1.UserTokenRequestDto !== "undefined" && user_token_request_dto_1.UserTokenRequestDto) === "function" ? _x : Object]),
    __metadata("design:returntype", typeof (_y = typeof Promise !== "undefined" && Promise) === "function" ? _y : Object)
], ProductController.prototype, "createProductAdditionalImages", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: "상품 상세 이미지 등록",
    }),
    (0, swagger_1.ApiOkResponse)({
        description: "작업 성공!",
        type: (Promise),
    }),
    (0, swagger_1.ApiConsumes)("multipart/form-data"),
    (0, swagger_1.ApiBody)({
        schema: {
            type: "object",
            properties: {
                상세_이미지1: {
                    type: "string",
                    format: "binary",
                },
                상세_이미지2: {
                    type: "string",
                    format: "binary",
                },
            },
        },
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Post)("/detail-images"),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)("detailImages", null, multer_options_1.detailMulterDiskOptions)),
    (0, common_1.Bind)((0, common_1.UploadedFiles)()),
    (0, common_1.UseGuards)(jwt_authentication_guard_1.JwtAuthenticationGuard),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, user_token_request_dto_1.GetUserInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_z = typeof Array !== "undefined" && Array) === "function" ? _z : Object, String, typeof (_0 = typeof user_token_request_dto_1.UserTokenRequestDto !== "undefined" && user_token_request_dto_1.UserTokenRequestDto) === "function" ? _0 : Object]),
    __metadata("design:returntype", typeof (_1 = typeof Promise !== "undefined" && Promise) === "function" ? _1 : Object)
], ProductController.prototype, "createProductDetailImages", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: "상품 목록 조회(페이징 처리) 및 검색 기능",
    }),
    (0, swagger_1.ApiOkResponse)({
        description: "작업 성공!",
        type: (Promise),
    }),
    (0, swagger_1.ApiQuery)({
        name: "productSearchRequestDto",
        required: true,
        description: "상품 검색 조건 및 페이징 처리 조건",
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_authentication_guard_1.JwtAuthenticationGuard),
    __param(0, (0, user_token_request_dto_1.GetUserInfo)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_2 = typeof user_token_request_dto_1.UserTokenRequestDto !== "undefined" && user_token_request_dto_1.UserTokenRequestDto) === "function" ? _2 : Object, typeof (_3 = typeof product_search_request_dto_1.ProductSearchRequestDto !== "undefined" && product_search_request_dto_1.ProductSearchRequestDto) === "function" ? _3 : Object]),
    __metadata("design:returntype", typeof (_4 = typeof Promise !== "undefined" && Promise) === "function" ? _4 : Object)
], ProductController.prototype, "getProductList", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: "상품 상세 조회",
    }),
    (0, swagger_1.ApiOkResponse)({
        description: "작업 성공!",
        type: (Promise),
    }),
    (0, swagger_1.ApiParam)({
        name: "productId",
        required: true,
        description: "상품 고유 번호",
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)("/:productId"),
    (0, common_1.UseGuards)(jwt_authentication_guard_1.JwtAuthenticationGuard),
    __param(0, (0, user_token_request_dto_1.GetUserInfo)()),
    __param(1, (0, common_1.Param)("productId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_5 = typeof user_token_request_dto_1.UserTokenRequestDto !== "undefined" && user_token_request_dto_1.UserTokenRequestDto) === "function" ? _5 : Object, Number]),
    __metadata("design:returntype", typeof (_6 = typeof Promise !== "undefined" && Promise) === "function" ? _6 : Object)
], ProductController.prototype, "getProductDetail", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: "이미지 배열 출력 기능",
    }),
    (0, swagger_1.ApiOkResponse)({
        description: "성공!",
        type: (default_response_1.DefaultResponse),
    }),
    (0, swagger_1.ApiQuery)({
        name: "urn",
        required: true,
        description: "조회할 상품 이미지 URN",
    }),
    (0, common_1.Get)("/image"),
    (0, common_1.UseGuards)(jwt_authentication_guard_1.JwtAuthenticationGuard),
    __param(0, (0, user_token_request_dto_1.GetUserInfo)()),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_7 = typeof user_token_request_dto_1.UserTokenRequestDto !== "undefined" && user_token_request_dto_1.UserTokenRequestDto) === "function" ? _7 : Object, String, typeof (_8 = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _8 : Object]),
    __metadata("design:returntype", typeof (_9 = typeof Promise !== "undefined" && Promise) === "function" ? _9 : Object)
], ProductController.prototype, "viewImage", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: "상품 메인 이미지 삭제",
    }),
    (0, swagger_1.ApiOkResponse)({
        description: "작업 성공!",
        type: (Promise),
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Delete)("/main-images/"),
    (0, common_1.UseGuards)(jwt_authentication_guard_1.JwtAuthenticationGuard),
    __param(0, (0, user_token_request_dto_1.GetUserInfo)()),
    __param(1, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_10 = typeof user_token_request_dto_1.UserTokenRequestDto !== "undefined" && user_token_request_dto_1.UserTokenRequestDto) === "function" ? _10 : Object, typeof (_11 = typeof product_checked_id_request_dto_1.ProductCheckedIdRequestDto !== "undefined" && product_checked_id_request_dto_1.ProductCheckedIdRequestDto) === "function" ? _11 : Object]),
    __metadata("design:returntype", typeof (_12 = typeof Promise !== "undefined" && Promise) === "function" ? _12 : Object)
], ProductController.prototype, "deleteProductMainImages", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: "상품 수정",
    }),
    (0, swagger_1.ApiOkResponse)({
        description: "작업 성공!",
        type: (Promise),
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Patch)(),
    (0, common_1.UseGuards)(jwt_authentication_guard_1.JwtAuthenticationGuard),
    __param(0, (0, user_token_request_dto_1.GetUserInfo)()),
    __param(1, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_13 = typeof user_token_request_dto_1.UserTokenRequestDto !== "undefined" && user_token_request_dto_1.UserTokenRequestDto) === "function" ? _13 : Object, typeof (_14 = typeof product_update_request_dto_1.ProductUpdateRequestDto !== "undefined" && product_update_request_dto_1.ProductUpdateRequestDto) === "function" ? _14 : Object]),
    __metadata("design:returntype", typeof (_15 = typeof Promise !== "undefined" && Promise) === "function" ? _15 : Object)
], ProductController.prototype, "updateProduct", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: "상품 추가 이미지 삭제",
    }),
    (0, swagger_1.ApiOkResponse)({
        description: "작업 성공!",
        type: (Promise),
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Delete)("/additional-images"),
    (0, common_1.UseGuards)(jwt_authentication_guard_1.JwtAuthenticationGuard),
    __param(0, (0, user_token_request_dto_1.GetUserInfo)()),
    __param(1, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_16 = typeof user_token_request_dto_1.UserTokenRequestDto !== "undefined" && user_token_request_dto_1.UserTokenRequestDto) === "function" ? _16 : Object, typeof (_17 = typeof product_image_delete_request_dto_1.ProductImageDeleteRequestDto !== "undefined" && product_image_delete_request_dto_1.ProductImageDeleteRequestDto) === "function" ? _17 : Object]),
    __metadata("design:returntype", typeof (_18 = typeof Promise !== "undefined" && Promise) === "function" ? _18 : Object)
], ProductController.prototype, "deleteProductAdditionalImages", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: "상품 상세 이미지 삭제",
    }),
    (0, swagger_1.ApiOkResponse)({
        description: "작업 성공!",
        type: (Promise),
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Delete)("/detail-images"),
    (0, common_1.UseGuards)(jwt_authentication_guard_1.JwtAuthenticationGuard),
    __param(0, (0, user_token_request_dto_1.GetUserInfo)()),
    __param(1, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_19 = typeof user_token_request_dto_1.UserTokenRequestDto !== "undefined" && user_token_request_dto_1.UserTokenRequestDto) === "function" ? _19 : Object, typeof (_20 = typeof product_image_delete_request_dto_1.ProductImageDeleteRequestDto !== "undefined" && product_image_delete_request_dto_1.ProductImageDeleteRequestDto) === "function" ? _20 : Object]),
    __metadata("design:returntype", typeof (_21 = typeof Promise !== "undefined" && Promise) === "function" ? _21 : Object)
], ProductController.prototype, "deleteProductDetailImages", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: "상품 삭제",
    }),
    (0, swagger_1.ApiOkResponse)({
        description: "작업 성공!",
        type: (Promise),
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Delete)(),
    (0, common_1.UseGuards)(jwt_authentication_guard_1.JwtAuthenticationGuard),
    __param(0, (0, user_token_request_dto_1.GetUserInfo)()),
    __param(1, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_22 = typeof user_token_request_dto_1.UserTokenRequestDto !== "undefined" && user_token_request_dto_1.UserTokenRequestDto) === "function" ? _22 : Object, typeof (_23 = typeof product_checked_id_request_dto_1.ProductCheckedIdRequestDto !== "undefined" && product_checked_id_request_dto_1.ProductCheckedIdRequestDto) === "function" ? _23 : Object]),
    __metadata("design:returntype", typeof (_24 = typeof Promise !== "undefined" && Promise) === "function" ? _24 : Object)
], ProductController.prototype, "deleteProduct", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: "상품 삭제 복구",
    }),
    (0, swagger_1.ApiOkResponse)({
        description: "작업 성공!",
        type: (Promise),
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Post)("/restore"),
    (0, common_1.UseGuards)(jwt_authentication_guard_1.JwtAuthenticationGuard),
    __param(0, (0, user_token_request_dto_1.GetUserInfo)()),
    __param(1, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_25 = typeof user_token_request_dto_1.UserTokenRequestDto !== "undefined" && user_token_request_dto_1.UserTokenRequestDto) === "function" ? _25 : Object, typeof (_26 = typeof product_checked_id_request_dto_1.ProductCheckedIdRequestDto !== "undefined" && product_checked_id_request_dto_1.ProductCheckedIdRequestDto) === "function" ? _26 : Object]),
    __metadata("design:returntype", typeof (_27 = typeof Promise !== "undefined" && Promise) === "function" ? _27 : Object)
], ProductController.prototype, "restoreProduct", null);
exports.ProductController = ProductController = __decorate([
    (0, swagger_1.ApiTags)("관리자 상품 관리 서비스"),
    (0, common_1.Controller)("admin/managements/products"),
    __param(0, (0, common_1.Inject)("ProductService")),
    __metadata("design:paramtypes", [typeof (_a = typeof product_service_1.ProductService !== "undefined" && product_service_1.ProductService) === "function" ? _a : Object])
], ProductController);


/***/ }),
/* 65 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 66 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductEditRequestDto = void 0;
const swagger_1 = __webpack_require__(22);
const class_validator_1 = __webpack_require__(27);
const product_entity_1 = __webpack_require__(55);
const division_entity_1 = __webpack_require__(57);
const user_entity_1 = __webpack_require__(16);
const category_entity_1 = __webpack_require__(56);
class ProductEditRequestDto {
    toEntity(productCreateRequestDto) {
        const product = new product_entity_1.Product();
        product.user = new user_entity_1.User();
        product.category = new category_entity_1.Category();
        product.category.categoryId = productCreateRequestDto.categoryId;
        product.division = new division_entity_1.Division();
        product.division.divisionId = productCreateRequestDto.divisionId;
        product.productName = productCreateRequestDto.name;
        product.productCount = productCreateRequestDto.count;
        product.productPrice = productCreateRequestDto.price;
        product.productContent = productCreateRequestDto.content;
        product.productMainImageUrl = productCreateRequestDto.mainImageUrl;
        return product;
    }
}
exports.ProductEditRequestDto = ProductEditRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "구분 고유 번호" }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], ProductEditRequestDto.prototype, "divisionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "카테고리 고유 번호" }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], ProductEditRequestDto.prototype, "categoryId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "상품 이름 100자 이내" }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], ProductEditRequestDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "상품 보유 개수" }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], ProductEditRequestDto.prototype, "count", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "상품 개 당 가격" }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], ProductEditRequestDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "상품 상세 소개" }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    __metadata("design:type", String)
], ProductEditRequestDto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "상품 메인 사진 URL" }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    __metadata("design:type", String)
], ProductEditRequestDto.prototype, "mainImageUrl", void 0);


/***/ }),
/* 67 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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
exports.ProductSearchRequestDto = void 0;
const swagger_1 = __webpack_require__(22);
const page_request_dto_1 = __webpack_require__(68);
const sort_decorator_1 = __webpack_require__(69);
const sort_decorator_2 = __webpack_require__(69);
class ProductSearchRequestDto extends page_request_dto_1.PageRequestDto {
}
exports.ProductSearchRequestDto = ProductSearchRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "정렬 여부", required: false }),
    (0, sort_decorator_2.SortDecorator)(),
    __metadata("design:type", typeof (_a = typeof sort_decorator_1.Sort !== "undefined" && sort_decorator_1.Sort) === "function" ? _a : Object)
], ProductSearchRequestDto.prototype, "sort", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "상품 카테고리", required: false }),
    __metadata("design:type", String)
], ProductSearchRequestDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "상품 구분", required: false }),
    __metadata("design:type", String)
], ProductSearchRequestDto.prototype, "division", void 0);


/***/ }),
/* 68 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PageRequestDto = void 0;
const swagger_1 = __webpack_require__(22);
const class_validator_1 = __webpack_require__(27);
class PageRequestDto {
    getOffset() {
        return (this.pageNumber - 1) * this.perPageSize;
    }
    getLimit() {
        return this.perPageSize;
    }
}
exports.PageRequestDto = PageRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "현재 페이지 위치", default: 1, required: false }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], PageRequestDto.prototype, "pageNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "페이지 당 출력 요소 개수", default: 10, required: false }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], PageRequestDto.prototype, "perPageSize", void 0);


/***/ }),
/* 69 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SortDecorator = exports.Sort = void 0;
const api_property_decorator_1 = __webpack_require__(70);
var Sort;
(function (Sort) {
    Sort["ASC"] = "ASC";
    Sort["DESC"] = "DESC";
})(Sort || (exports.Sort = Sort = {}));
const SortDecorator = () => (0, api_property_decorator_1.createApiPropertyDecorator)({
    type: "enum",
    enum: Sort,
    default: Sort.DESC,
}, false);
exports.SortDecorator = SortDecorator;


/***/ }),
/* 70 */
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs/swagger/dist/decorators/api-property.decorator");

/***/ }),
/* 71 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductUpdateRequestDto = void 0;
const swagger_1 = __webpack_require__(22);
const class_validator_1 = __webpack_require__(27);
const product_entity_1 = __webpack_require__(55);
class ProductUpdateRequestDto {
    toEntity(productEditRequestDto) {
        const product = new product_entity_1.Product();
        product.productName = productEditRequestDto.name;
        product.productCount = productEditRequestDto.count;
        product.productPrice = productEditRequestDto.price;
        product.productContent = productEditRequestDto.content;
        product.productMainImageUrl = productEditRequestDto.mainImageUrl;
        return product;
    }
}
exports.ProductUpdateRequestDto = ProductUpdateRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "상품 고유 번호" }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], ProductUpdateRequestDto.prototype, "productId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "상품 이름 100자 이내" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProductUpdateRequestDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "상품 보유 개수" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ProductUpdateRequestDto.prototype, "count", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "상품 개 당 가격" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], ProductUpdateRequestDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "상품 상세 소개" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProductUpdateRequestDto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "상품 메인 사진 URL" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProductUpdateRequestDto.prototype, "mainImageUrl", void 0);


/***/ }),
/* 72 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductCheckedIdRequestDto = void 0;
const swagger_1 = __webpack_require__(22);
const class_validator_1 = __webpack_require__(27);
class ProductCheckedIdRequestDto {
}
exports.ProductCheckedIdRequestDto = ProductCheckedIdRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "상품 고유 번호" }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], ProductCheckedIdRequestDto.prototype, "productId", void 0);


/***/ }),
/* 73 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductImageDeleteRequestDto = void 0;
const swagger_1 = __webpack_require__(22);
const class_validator_1 = __webpack_require__(27);
class ProductImageDeleteRequestDto {
}
exports.ProductImageDeleteRequestDto = ProductImageDeleteRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "상품 고유 번호" }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], ProductImageDeleteRequestDto.prototype, "productId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "상품 추가 삭제 대상 이미지 URL" }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], ProductImageDeleteRequestDto.prototype, "arrayUrl", void 0);


/***/ }),
/* 74 */,
/* 75 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductServiceImpl = void 0;
const common_1 = __webpack_require__(6);
const typeorm_1 = __webpack_require__(14);
const typeorm_2 = __webpack_require__(17);
const default_response_1 = __webpack_require__(20);
const product_entity_1 = __webpack_require__(55);
const product_additional_image_entity_1 = __webpack_require__(62);
const configuration_1 = __importDefault(__webpack_require__(8));
const product_edit_image_response_dto_1 = __webpack_require__(76);
const product_image_request_dto_1 = __webpack_require__(77);
const product_detail_image_entity_1 = __webpack_require__(63);
const product_list_response_dto_1 = __webpack_require__(78);
const product_repository_1 = __webpack_require__(79);
const page_1 = __webpack_require__(80);
const product_detail_response_dto_1 = __webpack_require__(81);
const fs_1 = __importDefault(__webpack_require__(9));
const path_1 = __webpack_require__(11);
const user_entity_1 = __webpack_require__(16);
const role_1 = __webpack_require__(18);
const file_verify_util_1 = __webpack_require__(84);
const console = __importStar(__webpack_require__(23));
let ProductServiceImpl = class ProductServiceImpl {
    constructor(userRepository, productRepository, productQueryBuilderRepository, productAdditionalImageRepository, productDetailImageRepository) {
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.productQueryBuilderRepository = productQueryBuilderRepository;
        this.productAdditionalImageRepository = productAdditionalImageRepository;
        this.productDetailImageRepository = productDetailImageRepository;
    }
    async createProductMainImages(userTokenRequestDto, mainImage) {
        await this.permissionCheck(userTokenRequestDto);
        if (!mainImage) {
            throw new common_1.BadRequestException({ statusCode: 400, message: "업로드할 파일을 확인해 주세요." });
        }
        if (!file_verify_util_1.FileVerifyUtil.singleImageSizeVerify(48, 48, mainImage)) {
            file_verify_util_1.FileVerifyUtil.deleteProductOriginalImages((0, configuration_1.default)().file.image.upload.storage.path + "main", mainImage[0].filename);
            throw new common_1.BadRequestException({ statusCode: 400, message: "이미지 사이즈가 너무 큽니다." });
        }
        const imageContent = {
            imageUrl: `${(0, configuration_1.default)().server.url}:${(0, configuration_1.default)().server.port}/product/images/main/${mainImage[0].filename}`,
        };
        return default_response_1.DefaultResponse.responseWithData(common_1.HttpStatus.OK, "작업 성공!", imageContent);
    }
    async createResizeProductImages(userTokenRequestDto, imageFile, maxWidthPx, maxHeightPx) {
        await this.permissionCheck(userTokenRequestDto);
        let imageContent = { imageUrl: "" };
        console.log("createResizeProductImages()의 imageFile: ", imageFile);
        if (!imageFile) {
            throw new common_1.BadRequestException({ statusCode: 400, message: "업로드할 파일을 확인해 주세요." });
        }
        if (imageFile[0].fieldname === "mainImage" && (await file_verify_util_1.FileVerifyUtil.singleImageResizing(imageFile, maxWidthPx, maxHeightPx))) {
            imageContent = {
                imageUrl: `${(0, configuration_1.default)().server.url}:${(0, configuration_1.default)().server.port}/product/images/main/${imageFile[0].filename}`,
            };
        }
        if (imageFile[0].fieldname === "additionalImage" && (await file_verify_util_1.FileVerifyUtil.singleImageResizing(imageFile, maxWidthPx, maxHeightPx))) {
            imageContent = {
                imageUrl: `${(0, configuration_1.default)().server.url}:${(0, configuration_1.default)().server.port}/product/images/additional/${imageFile[0].filename}`,
            };
        }
        if (imageFile[0].fieldname === "detailImage" && (await file_verify_util_1.FileVerifyUtil.singleImageResizing(imageFile, maxWidthPx, maxHeightPx))) {
            imageContent = {
                imageUrl: `${(0, configuration_1.default)().server.url}:${(0, configuration_1.default)().server.port}/product/images/detailImage/${imageFile[0].filename}`,
            };
        }
        return default_response_1.DefaultResponse.responseWithData(common_1.HttpStatus.OK, "작업 성공!", imageContent);
    }
    async createProduct(userTokenRequestDto, productEditRequestDto) {
        await this.permissionCheck(userTokenRequestDto);
        if (!productEditRequestDto) {
            throw new common_1.BadRequestException({ statusCode: 400, message: "상품 정보를 확인해 주세요." });
        }
        const product = await this.productRepository.save(productEditRequestDto.toEntity(productEditRequestDto));
        if (!product) {
            throw new common_1.InternalServerErrorException({ statusCode: 500, message: "상품 등록에 실패하였어요." });
        }
        return default_response_1.DefaultResponse.responseWithData(common_1.HttpStatus.OK, "작업 성공!", product.productId);
    }
    async createProductAdditionalImages(userTokenRequestDto, additionalImages, productId) {
        await this.permissionCheck(userTokenRequestDto);
        if (!productId || !additionalImages || additionalImages.length === 0) {
            throw new common_1.BadRequestException({ statusCode: 400, message: "업로드할 파일을 확인해 주세요." });
        }
        const imageSizePromises = additionalImages.map(async (image) => {
            if (!file_verify_util_1.FileVerifyUtil.manyImageSizeVerify(264, 264, image)) {
                file_verify_util_1.FileVerifyUtil.deleteProductOriginalImages((0, configuration_1.default)().file.image.upload.storage.path + "additional", image.filename);
                throw new common_1.BadRequestException({ statusCode: 400, message: "이미지 사이즈가 너무 큽니다." });
            }
        });
        await Promise.all(imageSizePromises);
        return default_response_1.DefaultResponse.responseWithData(common_1.HttpStatus.OK, "작업 성공!", new product_edit_image_response_dto_1.ProductEditImageResponseDto(await this.imageCreatedStorageProcessors(parseInt(productId["productId"]), additionalImages, "additional")));
    }
    async createProductDetailImages(userTokenRequestDto, detailImages, productId) {
        await this.permissionCheck(userTokenRequestDto);
        if (!productId || !detailImages || detailImages.length === 0) {
            throw new common_1.BadRequestException({ statusCode: 400, message: "업로드할 파일을 확인해 주세요." });
        }
        const imageSizePromises = detailImages.map(async (image) => {
            if (!file_verify_util_1.FileVerifyUtil.manyImageSizeVerify(1700, 1700, image)) {
                file_verify_util_1.FileVerifyUtil.deleteProductOriginalImages((0, configuration_1.default)().file.image.upload.storage.path + "detail", image.filename);
                throw new common_1.BadRequestException({ statusCode: 400, message: "이미지 사이즈가 너무 큽니다." });
            }
        });
        await Promise.all(imageSizePromises);
        return default_response_1.DefaultResponse.responseWithData(common_1.HttpStatus.OK, "작업 성공!", new product_edit_image_response_dto_1.ProductEditImageResponseDto(await this.imageCreatedStorageProcessors(parseInt(productId["productId"]), detailImages, "detail")));
    }
    async getProductList(userTokenRequestDto, productSearchRequestDto) {
        await this.permissionCheck(userTokenRequestDto);
        const findByProducts = await this.productQueryBuilderRepository.dynamicQuerySearchAndPagingByDto(productSearchRequestDto);
        if (!findByProducts || findByProducts[0].length === 0) {
            throw new common_1.BadRequestException({ statusCode: 404, message: "상품이 등록되지 않았어요. 상품 정보를 확인해 주세요." });
        }
        return default_response_1.DefaultResponse.responseWithPaginationAndData(common_1.HttpStatus.OK, "작업 성공!", new page_1.Page(findByProducts[0].length, findByProducts[1], findByProducts[0].map((product) => new product_list_response_dto_1.ProductListResponseDto(product))));
    }
    async getProductDetail(userTokenRequestDto, productId) {
        await this.permissionCheck(userTokenRequestDto);
        if (!userTokenRequestDto || !productId || productId <= 0) {
            throw new common_1.BadRequestException({ statusCode: 400, message: "상품 정보를 확인해 주세요." });
        }
        const product = await this.productQueryBuilderRepository.findByIdAndJoinOneThing(productId);
        if (!product) {
            throw new common_1.BadRequestException({ statusCode: 404, message: "상품 조회에 실패하였어요. 상품 정보를 확인해 주세요." });
        }
        return default_response_1.DefaultResponse.responseWithData(common_1.HttpStatus.OK, "작업 성공!", new product_detail_response_dto_1.ProductDetailResponseDto(product));
    }
    async viewImage(userTokenRequestDto, urn, response) {
        await this.permissionCheck(userTokenRequestDto);
        if (!urn) {
            throw new common_1.BadRequestException({ statusCode: 400, message: "이미지를 확인해 주세요." });
        }
        const fileUrn = urn["urn"];
        const storagePath = await this.parsingImageDivision(fileUrn);
        const fileNameMatch = fileUrn.match(/\/([^\/]+)$/);
        const fileName = fileNameMatch ? fileNameMatch[1] : null;
        console.log("viewImage()의 fileName: ", fileName);
        return default_response_1.DefaultResponse.responseWithData(common_1.HttpStatus.OK, "파일 조회 성공!", response.sendFile(fileName, { root: storagePath }));
    }
    async deleteProductMainImages(userTokenRequestDto, productCheckedIdRequestDto) {
        await this.permissionCheck(userTokenRequestDto);
        if (!userTokenRequestDto.email) {
            throw new common_1.NotFoundException({ statusCode: 404, message: "찾을 수 없어요." });
        }
        const product = await this.productQueryBuilderRepository.findByIdAndJoinOneThing(productCheckedIdRequestDto.productId);
        if (product === null) {
            throw new common_1.NotFoundException({ statusCode: 404, message: "상품 정보를 확인해 주세요." });
        }
        try {
            await this.productRepository.update(productCheckedIdRequestDto.productId, {
                productMainImageUrl: null,
            });
        }
        catch (error) {
            throw new common_1.InternalServerErrorException({ statusCode: 500, message: "상품 메인 이미지 삭제에 실패하였어요. 관리자에게 문의해 주세요." });
        }
        file_verify_util_1.FileVerifyUtil.deleteProductOriginalImages("./local/storage/product/main/images/", product.productMainImageUrl);
        return default_response_1.DefaultResponse.response(common_1.HttpStatus.OK, "작업 성공!");
    }
    async updateProduct(userTokenRequestDto, productUpdateRequestDto) {
        await this.permissionCheck(userTokenRequestDto);
        if (!productUpdateRequestDto) {
            throw new common_1.BadRequestException({ statusCode: 400, message: "상품 정보를 확인해 주세요." });
        }
        const product = await this.productQueryBuilderRepository.findByIdAndJoinOneThing(productUpdateRequestDto.productId);
        if (product === null) {
            throw new common_1.NotFoundException({ statusCode: 404, message: "상품 정보를 확인해 주세요." });
        }
        try {
            if (productUpdateRequestDto.mainImageUrl) {
                await this.productRepository.update(productUpdateRequestDto.productId, {
                    productName: productUpdateRequestDto.name,
                    productCount: productUpdateRequestDto.count,
                    productPrice: productUpdateRequestDto.price,
                    productContent: productUpdateRequestDto.content,
                    productMainImageUrl: productUpdateRequestDto.mainImageUrl,
                });
            }
            else {
                await this.productRepository.update(productUpdateRequestDto.productId, {
                    productName: productUpdateRequestDto.name,
                    productCount: productUpdateRequestDto.count,
                    productPrice: productUpdateRequestDto.price,
                    productContent: productUpdateRequestDto.content,
                });
            }
        }
        catch (error) {
            throw new common_1.InternalServerErrorException({ statusCode: 500, message: "상품 수정에 실패하였어요. 관리자에게 문의해 주세요." });
        }
        return default_response_1.DefaultResponse.responseWithData(common_1.HttpStatus.OK, "작업 성공!", product.productId);
    }
    async deleteProductAdditionalImages(userTokenRequestDto, productImageDeleteRequestDto) {
        await this.permissionCheck(userTokenRequestDto);
        if (!productImageDeleteRequestDto) {
            throw new common_1.BadRequestException({ statusCode: 400, message: "요청을 확인해 주세요." });
        }
        if (!userTokenRequestDto.email) {
            throw new common_1.NotFoundException({ statusCode: 404, message: "찾을 수 없어요." });
        }
        if (!productImageDeleteRequestDto.productId) {
            throw new common_1.BadRequestException({ statusCode: 400, message: "상품 정보를 확인해 주세요." });
        }
        const product = await this.productQueryBuilderRepository.findByIdAndJoinOneThing(productImageDeleteRequestDto.productId);
        if (!product) {
            throw new common_1.NotFoundException({ statusCode: 404, message: "상품 정보를 확인해 주세요." });
        }
        const url = [];
        for (const imageUrl of productImageDeleteRequestDto.arrayUrl) {
            const deleteTarget = await this.productAdditionalImageRepository.findOne({ where: { url: imageUrl } });
            if (!deleteTarget) {
                throw new common_1.NotFoundException({ statusCode: 404, message: "삭제 대상을 찾을 수 없어요." });
            }
            try {
                await this.productAdditionalImageRepository.delete(deleteTarget.id);
            }
            catch (error) {
                throw new common_1.InternalServerErrorException({ statusCode: 500, message: "상품 추가 이미지 삭제에 실패하였어요. 관리자에게 문의해 주세요." });
            }
            this.deleteOriginalImages("additional", imageUrl);
            url.push(imageUrl);
        }
        return default_response_1.DefaultResponse.responseWithData(common_1.HttpStatus.OK, "작업 성공!", { deleteTarget: { url: url } });
    }
    async deleteProductDetailImages(userTokenRequestDto, productImageDeleteRequestDto) {
        await this.permissionCheck(userTokenRequestDto);
        if (!productImageDeleteRequestDto) {
            throw new common_1.BadRequestException({ statusCode: 400, message: "요청을 확인해 주세요." });
        }
        if (!productImageDeleteRequestDto.productId) {
            throw new common_1.BadRequestException({ statusCode: 400, message: "상품 정보를 확인해 주세요." });
        }
        const product = await this.productQueryBuilderRepository.findByIdAndJoinOneThing(productImageDeleteRequestDto.productId);
        if (!product) {
            throw new common_1.NotFoundException({ statusCode: 404, message: "상품 정보를 확인해 주세요." });
        }
        const url = [];
        for (const imageUrl of productImageDeleteRequestDto.arrayUrl) {
            const deleteTarget = await this.productDetailImageRepository.findOne({ where: { url: imageUrl } });
            if (!deleteTarget) {
                throw new common_1.NotFoundException({ statusCode: 404, message: "삭제 대상을 찾을 수 없어요." });
            }
            try {
                await this.productDetailImageRepository.delete(deleteTarget.id);
            }
            catch (error) {
                throw new common_1.InternalServerErrorException({ statusCode: 500, message: "상품 상세 이미지 삭제에 실패하였어요. 관리자에게 문의해 주세요." });
            }
            this.deleteOriginalImages("detail", imageUrl);
            url.push(imageUrl);
        }
        return default_response_1.DefaultResponse.responseWithData(common_1.HttpStatus.OK, "작업 성공!", { deleteTarget: { url: url } });
    }
    async deleteProduct(userTokenRequestDto, productCheckedIdRequestDto) {
        await this.permissionCheck(userTokenRequestDto);
        if (!productCheckedIdRequestDto) {
            throw new common_1.NotFoundException({ statusCode: 404, message: "찾을 수 없어요." });
        }
        if (!productCheckedIdRequestDto.productId) {
            throw new common_1.BadRequestException({ statusCode: 400, message: "상품 정보를 확인해 주세요." });
        }
        const product = await this.productQueryBuilderRepository.findByIdAndJoinOneThing(productCheckedIdRequestDto.productId);
        if (!product) {
            throw new common_1.NotFoundException({ statusCode: 404, message: "상품 정보를 확인해 주세요." });
        }
        try {
            await this.productRepository.softDelete(productCheckedIdRequestDto.productId);
            return default_response_1.DefaultResponse.responseWithData(common_1.HttpStatus.OK, "작업 성공!", product.productId);
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException({ statusCode: 500, message: "상품 삭제에 실패하였어요. 관리자에게 문의해 주세요." });
        }
    }
    async restoreProduct(userTokenRequestDto, productCheckedIdRequestDto) {
        await this.permissionCheck(userTokenRequestDto);
        if (!productCheckedIdRequestDto) {
            throw new common_1.NotFoundException({ statusCode: 404, message: "찾을 수 없어요." });
        }
        if (!productCheckedIdRequestDto.productId) {
            throw new common_1.BadRequestException({ statusCode: 400, message: "상품 정보를 확인해 주세요." });
        }
        const product = await this.productRepository.findOne({
            where: { productId: productCheckedIdRequestDto.productId },
            withDeleted: true,
        });
        if (!product) {
            throw new common_1.NotFoundException({ statusCode: 404, message: "상품 정보를 확인해 주세요." });
        }
        try {
            await this.productRepository.restore(productCheckedIdRequestDto.productId);
            return default_response_1.DefaultResponse.responseWithData(common_1.HttpStatus.OK, "작업 성공!", product.productId);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException({ statusCode: 500, message: "상품 복구에 실패하였어요. 관리자에게 문의해 주세요." });
        }
    }
    deleteOriginalImages(imageDivision, productMainImageUrl) {
        const directoryPath = productMainImageUrl.replace(/:\d+/, "");
        const imageName = directoryPath.match(/\/([^\/]+)$/)[1];
        let originalImageDirectoryPath;
        if (imageDivision === "main") {
            originalImageDirectoryPath = "./local/storage/product/main/images/" + imageName;
        }
        else if (imageDivision === "additional") {
            originalImageDirectoryPath = "./local/storage/product/additional/images/" + imageName;
        }
        else {
            originalImageDirectoryPath = "./local/storage/product/detail/images/" + imageName;
        }
        if (fs_1.default.existsSync(originalImageDirectoryPath)) {
            fs_1.default.unlink(originalImageDirectoryPath, (error) => {
                if (error) {
                    throw new common_1.InternalServerErrorException({ statusCode: 500, message: "파일 삭제에 실패하였어요. 관리자에게 문의해 주세요." });
                }
                else {
                    (0, path_1.resolve)();
                }
            });
        }
        else {
            (0, path_1.resolve)();
            throw new common_1.InternalServerErrorException({ statusCode: 500, message: "삭제 대상 파일이 존재하지 않아요. 관리자에게 문의해 주세요." });
        }
    }
    async imageCreatedStorageProcessors(productId, images, category) {
        if (!images || images.length === 0) {
            throw new common_1.BadRequestException({ statusCode: 400, message: "업로드할 파일을 확인해 주세요." });
        }
        const result = [];
        for (const image of images) {
            if (category === "additional") {
                const saveImage = await this.productAdditionalImageRepository.save(product_image_request_dto_1.ProductImageRequestDto.toAdditionalImageEntity(productId, `${(0, configuration_1.default)().server.url}:${(0, configuration_1.default)().server.port}/product/images/additional/${image.filename}`));
                if (!saveImage) {
                    throw new common_1.InternalServerErrorException({ statusCode: 500, message: "상품 추가 이미지 등록에 실패하였어요. 관리자에게 문의해 주세요." });
                }
                const imageContent = {
                    imageId: saveImage.id,
                    imageUrl: saveImage.url,
                };
                result.push(imageContent);
            }
            else {
                const saveImage = await this.productDetailImageRepository.save(product_image_request_dto_1.ProductImageRequestDto.toDetailImageEntity(productId, `${(0, configuration_1.default)().server.url}:${(0, configuration_1.default)().server.port}/product/images/detail/${image.filename}`));
                if (!saveImage) {
                    throw new common_1.InternalServerErrorException({ statusCode: 500, message: "상품 추가 이미지 등록에 실패하였어요. 관리자에게 문의해 주세요." });
                }
                const imageContent = {
                    imageId: saveImage.id,
                    imageUrl: saveImage.url,
                };
                result.push(imageContent);
            }
        }
        return result;
    }
    async parsingImageDivision(fileUrn) {
        const regExpMatchArray = fileUrn.match(/\/product\/images\/([^\/]+)/);
        if (!regExpMatchArray) {
            throw new common_1.BadRequestException({ statusCode: 400, message: "이미지를 확인해 주세요." });
        }
        return await this.checkImageExistence(fileUrn, regExpMatchArray[1]);
    }
    async checkImageExistence(fileUrn, imageDivision) {
        const fileUrl = `${(0, configuration_1.default)().server.url}:${(0, configuration_1.default)().server.port}${fileUrn}`;
        console.log("viewImage()의 fileUrl: ", fileUrl);
        if (imageDivision === "main") {
            if (!(await this.productRepository.findOne({ where: { productMainImageUrl: fileUrl } }))) {
                throw new common_1.BadRequestException({ statusCode: 404, message: "상품 정보를 확인해 주세요." });
            }
            return "./local/storage/product/main/images";
        }
        else if (imageDivision === "additional") {
            if (!(await this.productAdditionalImageRepository.findOne({ where: { url: fileUrl } }))) {
                throw new common_1.BadRequestException({ statusCode: 404, message: "상품 정보를 확인해 주세요." });
            }
            return "./local/storage/product/additional/images";
        }
        else {
            if (!(await this.productDetailImageRepository.findOne({ where: { url: fileUrl } }))) {
                throw new common_1.BadRequestException({ statusCode: 404, message: "상품 정보를 확인해 주세요." });
            }
            return "./local/storage/product/detail/images";
        }
    }
    async permissionCheck(userTokenRequestDto) {
        if (!userTokenRequestDto) {
            throw new common_1.BadRequestException({ statusCode: 400, message: "상품 정보를 확인해 주세요." });
        }
        const user = await this.userRepository.findOne({ where: { email: userTokenRequestDto.email } });
        if (!user || user.userRole !== role_1.Role.ADMIN) {
            throw new common_1.NotFoundException({ statusCode: 404, message: "찾을 수 없어요." });
        }
    }
};
exports.ProductServiceImpl = ProductServiceImpl;
exports.ProductServiceImpl = ProductServiceImpl = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __param(2, (0, common_1.Inject)("ProductQueryBuilderRepository")),
    __param(3, (0, typeorm_1.InjectRepository)(product_additional_image_entity_1.ProductAdditionalImage)),
    __param(4, (0, typeorm_1.InjectRepository)(product_detail_image_entity_1.ProductDetailImage)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object, typeof (_c = typeof product_repository_1.ProductRepository !== "undefined" && product_repository_1.ProductRepository) === "function" ? _c : Object, typeof (_d = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _d : Object, typeof (_e = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _e : Object])
], ProductServiceImpl);


/***/ }),
/* 76 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductEditImageResponseDto = void 0;
const swagger_1 = __webpack_require__(22);
class ProductEditImageResponseDto {
    constructor(images) {
        this.images = images;
    }
}
exports.ProductEditImageResponseDto = ProductEditImageResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "상품 사진 등록 정보" }),
    __metadata("design:type", Array)
], ProductEditImageResponseDto.prototype, "images", void 0);


/***/ }),
/* 77 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductImageRequestDto = void 0;
const product_additional_image_entity_1 = __webpack_require__(62);
const product_detail_image_entity_1 = __webpack_require__(63);
const product_entity_1 = __webpack_require__(55);
class ProductImageRequestDto {
    static toAdditionalImageEntity(productId, imageUrl) {
        const productAdditionalImage = new product_additional_image_entity_1.ProductAdditionalImage();
        productAdditionalImage.product = new product_entity_1.Product();
        productAdditionalImage.product.productId = productId;
        productAdditionalImage.url = imageUrl;
        return productAdditionalImage;
    }
    static toDetailImageEntity(productId, imageUrl) {
        const productDetailImage = new product_detail_image_entity_1.ProductDetailImage();
        productDetailImage.product = new product_entity_1.Product();
        productDetailImage.product.productId = productId;
        productDetailImage.url = imageUrl;
        return productDetailImage;
    }
}
exports.ProductImageRequestDto = ProductImageRequestDto;


/***/ }),
/* 78 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductListResponseDto = void 0;
const swagger_1 = __webpack_require__(22);
class ProductListResponseDto {
    constructor(product) {
        this.id = product.productId;
        this.category = product.category.categoryName;
        this.division = product.division.divisionName;
        this.name = product.productName;
        this.price = product.productPrice;
        this.mainImageUrl = product.productMainImageUrl;
    }
}
exports.ProductListResponseDto = ProductListResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "상품 고유 번호" }),
    __metadata("design:type", Number)
], ProductListResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "상품 카테고리" }),
    __metadata("design:type", String)
], ProductListResponseDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "상품 구분" }),
    __metadata("design:type", String)
], ProductListResponseDto.prototype, "division", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "상품 이름" }),
    __metadata("design:type", String)
], ProductListResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "상품 가격" }),
    __metadata("design:type", Number)
], ProductListResponseDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "상품 메인 사진 URL" }),
    __metadata("design:type", String)
], ProductListResponseDto.prototype, "mainImageUrl", void 0);


/***/ }),
/* 79 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 80 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Page = void 0;
class Page {
    constructor(perPageSize, totalCount, results) {
        this.perPageSize = perPageSize;
        this.totalCount = totalCount;
        const tempTotalPage = Math.ceil(totalCount / perPageSize);
        if (tempTotalPage >= 1) {
            this.totalPage = tempTotalPage;
        }
        else {
            this.totalPage = 1;
        }
        this.data = results;
    }
    toString() {
        return `Page(perPageSize: ${this.perPageSize}, totalCount: ${this.totalCount}, totalPage: ${this.totalPage}, data: ${JSON.stringify(this.data, null, 2)})`;
    }
}
exports.Page = Page;


/***/ }),
/* 81 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductDetailResponseDto = void 0;
const swagger_1 = __webpack_require__(22);
const product_additional_image_response_dto_1 = __webpack_require__(82);
const product_detail_image_response_dto_1 = __webpack_require__(83);
class ProductDetailResponseDto {
    constructor(product) {
        this.id = product.productId;
        this.category = product.category.categoryName;
        this.division = product.division.divisionName;
        this.name = product.productName;
        this.price = product.productPrice;
        this.content = product.productContent;
        this.mainImageUrl = product.productMainImageUrl;
        this.additionalImages = Array.isArray(product.productAdditionalImages)
            ? product.productAdditionalImages.map((image) => new product_additional_image_response_dto_1.ProductAdditionalImageResponseDto(image.url))
            : [];
        this.detailImages = Array.isArray(product.productDetailImages)
            ? product.productDetailImages.map((image) => new product_detail_image_response_dto_1.ProductDetailImageResponseDto(image.url))
            : [];
    }
}
exports.ProductDetailResponseDto = ProductDetailResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "상품 고유 번호" }),
    __metadata("design:type", Number)
], ProductDetailResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "상품 카테고리" }),
    __metadata("design:type", String)
], ProductDetailResponseDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "상품 구분" }),
    __metadata("design:type", String)
], ProductDetailResponseDto.prototype, "division", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "상품 이름" }),
    __metadata("design:type", String)
], ProductDetailResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "상품 가격" }),
    __metadata("design:type", Number)
], ProductDetailResponseDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "상품 상세 소개" }),
    __metadata("design:type", String)
], ProductDetailResponseDto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "상품 메인 사진 URL" }),
    __metadata("design:type", String)
], ProductDetailResponseDto.prototype, "mainImageUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "상품 추가 사진 URL" }),
    __metadata("design:type", Array)
], ProductDetailResponseDto.prototype, "additionalImages", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "상품 상세 사진 URL" }),
    __metadata("design:type", Array)
], ProductDetailResponseDto.prototype, "detailImages", void 0);


/***/ }),
/* 82 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductAdditionalImageResponseDto = void 0;
const swagger_1 = __webpack_require__(22);
class ProductAdditionalImageResponseDto {
    constructor(url) {
        this.url = url;
    }
}
exports.ProductAdditionalImageResponseDto = ProductAdditionalImageResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "상품 추가 사진 URL" }),
    __metadata("design:type", String)
], ProductAdditionalImageResponseDto.prototype, "url", void 0);


/***/ }),
/* 83 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductDetailImageResponseDto = void 0;
const swagger_1 = __webpack_require__(22);
class ProductDetailImageResponseDto {
    constructor(url) {
        this.url = url;
    }
}
exports.ProductDetailImageResponseDto = ProductDetailImageResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "상품 상세 사진 URL" }),
    __metadata("design:type", String)
], ProductDetailImageResponseDto.prototype, "url", void 0);


/***/ }),
/* 84 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FileVerifyUtil = void 0;
const image_size_1 = __importDefault(__webpack_require__(85));
const common_1 = __webpack_require__(6);
const fs_1 = __importDefault(__webpack_require__(9));
const path_1 = __webpack_require__(11);
const jimp_1 = __importDefault(__webpack_require__(86));
class FileVerifyUtil {
    static singleImageSizeVerify(maxWidthPx, maxHeightPx, imageFile) {
        try {
            console.log("imageFile:", imageFile);
            console.log("imageFile.path:", imageFile[0].path);
            const dimensions = (0, image_size_1.default)(imageFile[0].path);
            console.log("Dimensions:", dimensions);
            return !(dimensions.width > maxWidthPx || dimensions.height > maxHeightPx);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException({
                statusCode: 500,
                message: "이미지 업로드 및 크기 확인 실패했어요. 관리자에게 문의해 주세요.",
                detail: error.message,
            });
        }
    }
    static manyImageSizeVerify(maxWidthPx, maxHeightPx, imageFile) {
        try {
            console.log("imageFile:", imageFile);
            console.log("imageFile.path:", imageFile.path);
            const dimensions = (0, image_size_1.default)(imageFile.path);
            console.log("Dimensions:", dimensions);
            return !(dimensions.width > maxWidthPx || dimensions.height > maxHeightPx);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException({
                statusCode: 500,
                message: "이미지 업로드 및 크기 확인 실패했어요. 관리자에게 문의해 주세요.",
                detail: error.message,
            });
        }
    }
    static deleteProductOriginalImages(originalImageDirectoryPath, imageName) {
        const originalImageDeleteTargetPath = (0, path_1.resolve)(originalImageDirectoryPath, imageName);
        console.log("originalImageDirectoryPath:", originalImageDirectoryPath);
        if (fs_1.default.existsSync(originalImageDirectoryPath)) {
            fs_1.default.unlink(originalImageDeleteTargetPath, (error) => {
                if (error) {
                    throw new common_1.InternalServerErrorException({
                        statusCode: 500,
                        message: "파일 삭제에 실패하였어요. 관리자에게 문의해 주세요.",
                        detail: error.message,
                    });
                }
                else {
                    (0, path_1.resolve)();
                }
            });
        }
        else {
            (0, path_1.resolve)();
            throw new common_1.InternalServerErrorException({ statusCode: 500, message: "삭제 대상 파일이 존재하지 않아요. 관리자에게 문의해 주세요." });
        }
    }
    static async singleImageResizing(image, maxWidthPx, maxHeightPx) {
        let result = false;
        try {
            const resizeImage = await jimp_1.default.read(image[0].path);
            resizeImage.resize(maxWidthPx, maxHeightPx).write(image[0].path);
            const dimensions = (0, image_size_1.default)(image[0].path);
            console.log("Resizing 하기 전 image 정보:", resizeImage, "Dimensions: ", dimensions);
            dimensions.width = maxWidthPx;
            dimensions.height = maxHeightPx;
            console.log("Resizing 한 뒤 image 정보:", resizeImage, "Dimensions: ", dimensions);
            result = true;
            return result;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException({
                statusCode: 500,
                message: "이미지 Resizing 실패했어요. 관리자에게 문의해 주세요.",
                detail: error.message,
            });
        }
    }
    static async manyImagesResizing(image, maxWidthPx, maxHeightPx) {
        let result = false;
        console.log("manyImagesResizing() - image:", image);
        try {
            const resizeImage = await jimp_1.default.read(image.path);
            console.log("manyImagesResizing() - resizeImage:", resizeImage);
            resizeImage.resize(maxWidthPx, maxHeightPx).write(image.path);
            const dimensions = (0, image_size_1.default)(image.path);
            console.log("Resizing 하기 전 image 정보:", resizeImage, "Dimensions: ", dimensions);
            dimensions.width = maxWidthPx;
            dimensions.height = maxHeightPx;
            console.log("Resizing 한 뒤 image 정보:", resizeImage, "Dimensions: ", dimensions);
            result = true;
            return result;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException({
                statusCode: 500,
                message: "이미지 Resizing 실패했어요. 관리자에게 문의해 주세요.",
                detail: error.message,
            });
        }
    }
}
exports.FileVerifyUtil = FileVerifyUtil;


/***/ }),
/* 85 */
/***/ ((module) => {

"use strict";
module.exports = require("image-size");

/***/ }),
/* 86 */
/***/ ((module) => {

"use strict";
module.exports = require("jimp");

/***/ }),
/* 87 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductQueryBuilderRepository = void 0;
const common_1 = __webpack_require__(6);
const typeorm_1 = __webpack_require__(14);
const product_entity_1 = __webpack_require__(55);
const typeorm_2 = __webpack_require__(17);
let ProductQueryBuilderRepository = class ProductQueryBuilderRepository {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    async dynamicQuerySearchAndPagingByDto(productSearchRequestDto) {
        const selectQueryBuilder = this.productRepository
            .createQueryBuilder("product")
            .leftJoinAndSelect("product.user", "author")
            .leftJoinAndSelect("product.category", "category")
            .leftJoinAndSelect("product.division", "division")
            .take(productSearchRequestDto.getLimit())
            .skip(productSearchRequestDto.getOffset());
        if (productSearchRequestDto.category) {
            selectQueryBuilder.andWhere("category.categoryName LIKE :category", { category: `%${productSearchRequestDto.category}%` });
        }
        if (productSearchRequestDto.division) {
            selectQueryBuilder.andWhere("division.divisionName LIKE :division", { division: `%${productSearchRequestDto.division}%` });
        }
        selectQueryBuilder.orderBy("product.productId", productSearchRequestDto.sort);
        return await selectQueryBuilder.getManyAndCount();
    }
    findByIdAndJoinOneThing(productId) {
        return this.productRepository
            .createQueryBuilder("product")
            .leftJoinAndSelect("product.user", "author")
            .leftJoinAndSelect("product.category", "category")
            .leftJoinAndSelect("product.division", "division")
            .leftJoinAndSelect("product.productAdditionalImages", "productAdditionalImages")
            .leftJoinAndSelect("product.productDetailImages", "productDetailImages")
            .where("product.productId = :productId", { productId })
            .getOne();
    }
};
exports.ProductQueryBuilderRepository = ProductQueryBuilderRepository;
exports.ProductQueryBuilderRepository = ProductQueryBuilderRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], ProductQueryBuilderRepository);


/***/ }),
/* 88 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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
exports.CategoryModule = void 0;
const common_1 = __webpack_require__(6);
const config_1 = __webpack_require__(7);
const configuration_1 = __importDefault(__webpack_require__(8));
const typeorm_1 = __webpack_require__(14);
const category_entity_1 = __webpack_require__(56);
const category_service_impl_1 = __webpack_require__(89);
const category_controller_1 = __webpack_require__(90);
let CategoryModule = class CategoryModule {
};
exports.CategoryModule = CategoryModule;
exports.CategoryModule = CategoryModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [configuration_1.default],
            }),
            typeorm_1.TypeOrmModule.forFeature([category_entity_1.Category]),
        ],
        controllers: [category_controller_1.CategoryController],
        providers: [
            category_service_impl_1.CategoryServiceImpl,
            {
                provide: "CategoryService",
                useClass: category_service_impl_1.CategoryServiceImpl,
            },
        ],
    })
], CategoryModule);


/***/ }),
/* 89 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CategoryServiceImpl = void 0;
const common_1 = __webpack_require__(6);
const typeorm_1 = __webpack_require__(14);
const typeorm_2 = __webpack_require__(17);
const default_response_1 = __webpack_require__(20);
const category_entity_1 = __webpack_require__(56);
let CategoryServiceImpl = class CategoryServiceImpl {
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }
    async createCategory(categoryEditRequestDto) {
        if (!categoryEditRequestDto) {
            throw new common_1.BadRequestException({ statusCode: 400, message: "카테고리 정보를 확인해 주세요." });
        }
        const category = await this.categoryRepository.save(categoryEditRequestDto.toEntity(categoryEditRequestDto));
        if (!category) {
            throw new common_1.InternalServerErrorException({ statusCode: 500, message: "카테고리 등록에 실패하였어요." });
        }
        return default_response_1.DefaultResponse.responseWithData(200, "작업 성공!", category.categoryId);
    }
};
exports.CategoryServiceImpl = CategoryServiceImpl;
exports.CategoryServiceImpl = CategoryServiceImpl = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(category_entity_1.Category)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], CategoryServiceImpl);


/***/ }),
/* 90 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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
exports.CategoryController = void 0;
const swagger_1 = __webpack_require__(22);
const common_1 = __webpack_require__(6);
const category_service_1 = __webpack_require__(91);
const category_edit_request_dto_1 = __webpack_require__(92);
let CategoryController = class CategoryController {
    constructor(categoryService) {
        this.categoryService = categoryService;
    }
    async createCategory(categoryEditRequestDto) {
        return this.categoryService.createCategory(categoryEditRequestDto);
    }
};
exports.CategoryController = CategoryController;
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: "상품 카테고리 등록",
    }),
    (0, swagger_1.ApiOkResponse)({
        description: "작업 성공!",
        type: (Promise),
    }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof category_edit_request_dto_1.CategoryEditRequestDto !== "undefined" && category_edit_request_dto_1.CategoryEditRequestDto) === "function" ? _b : Object]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], CategoryController.prototype, "createCategory", null);
exports.CategoryController = CategoryController = __decorate([
    (0, swagger_1.ApiTags)("관리자 분류 관리 서비스"),
    (0, common_1.Controller)("admin/managements/categories"),
    __param(0, (0, common_1.Inject)("CategoryService")),
    __metadata("design:paramtypes", [typeof (_a = typeof category_service_1.CategoryService !== "undefined" && category_service_1.CategoryService) === "function" ? _a : Object])
], CategoryController);


/***/ }),
/* 91 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 92 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CategoryEditRequestDto = void 0;
const swagger_1 = __webpack_require__(22);
const class_validator_1 = __webpack_require__(27);
const category_entity_1 = __webpack_require__(56);
class CategoryEditRequestDto {
    toEntity(categoryEditRequestDto) {
        const category = new category_entity_1.Category();
        category.categoryName = categoryEditRequestDto.name;
        return category;
    }
}
exports.CategoryEditRequestDto = CategoryEditRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "카테고리 이름 10자 이내" }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    (0, class_validator_1.MaxLength)(10),
    __metadata("design:type", String)
], CategoryEditRequestDto.prototype, "name", void 0);


/***/ }),
/* 93 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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
exports.DivisionModule = void 0;
const common_1 = __webpack_require__(6);
const config_1 = __webpack_require__(7);
const configuration_1 = __importDefault(__webpack_require__(8));
const typeorm_1 = __webpack_require__(14);
const division_entity_1 = __webpack_require__(57);
const division_service_impl_1 = __webpack_require__(94);
const division_controller_1 = __webpack_require__(95);
let DivisionModule = class DivisionModule {
};
exports.DivisionModule = DivisionModule;
exports.DivisionModule = DivisionModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [configuration_1.default],
            }),
            typeorm_1.TypeOrmModule.forFeature([division_entity_1.Division]),
        ],
        controllers: [division_controller_1.DivisionController],
        providers: [
            division_service_impl_1.DivisionServiceImpl,
            {
                provide: "DivisionService",
                useClass: division_service_impl_1.DivisionServiceImpl,
            },
        ],
    })
], DivisionModule);


/***/ }),
/* 94 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DivisionServiceImpl = void 0;
const common_1 = __webpack_require__(6);
const typeorm_1 = __webpack_require__(14);
const division_entity_1 = __webpack_require__(57);
const typeorm_2 = __webpack_require__(17);
const default_response_1 = __webpack_require__(20);
let DivisionServiceImpl = class DivisionServiceImpl {
    constructor(divisionRepository) {
        this.divisionRepository = divisionRepository;
    }
    async createDivision(divisionEditRequestDto) {
        if (!divisionEditRequestDto) {
            throw new common_1.BadRequestException({ statusCode: 400, message: "카테고리 정보를 확인해 주세요." });
        }
        const division = await this.divisionRepository.save(divisionEditRequestDto.toEntity(divisionEditRequestDto));
        if (!division) {
            throw new common_1.InternalServerErrorException({ statusCode: 500, message: "카테고리 등록에 실패하였어요." });
        }
        return default_response_1.DefaultResponse.responseWithData(200, "작업 성공!", division.divisionId);
    }
};
exports.DivisionServiceImpl = DivisionServiceImpl;
exports.DivisionServiceImpl = DivisionServiceImpl = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(division_entity_1.Division)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], DivisionServiceImpl);


/***/ }),
/* 95 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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
exports.DivisionController = void 0;
const swagger_1 = __webpack_require__(22);
const common_1 = __webpack_require__(6);
const division_edit_request_dto_1 = __webpack_require__(96);
const division_service_1 = __webpack_require__(97);
let DivisionController = class DivisionController {
    constructor(divisionService) {
        this.divisionService = divisionService;
    }
    async createDivision(divisionEditRequestDto) {
        return this.divisionService.createDivision(divisionEditRequestDto);
    }
};
exports.DivisionController = DivisionController;
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: "상품 구분 등록",
    }),
    (0, swagger_1.ApiOkResponse)({
        description: "작업 성공!",
        type: (Promise),
    }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof division_edit_request_dto_1.DivisionEditRequestDto !== "undefined" && division_edit_request_dto_1.DivisionEditRequestDto) === "function" ? _b : Object]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], DivisionController.prototype, "createDivision", null);
exports.DivisionController = DivisionController = __decorate([
    (0, swagger_1.ApiTags)("관리자 분류 관리 서비스"),
    (0, common_1.Controller)("admin/managements/divisions"),
    __param(0, (0, common_1.Inject)("DivisionService")),
    __metadata("design:paramtypes", [typeof (_a = typeof division_service_1.DivisionService !== "undefined" && division_service_1.DivisionService) === "function" ? _a : Object])
], DivisionController);


/***/ }),
/* 96 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DivisionEditRequestDto = void 0;
const swagger_1 = __webpack_require__(22);
const class_validator_1 = __webpack_require__(27);
const division_entity_1 = __webpack_require__(57);
class DivisionEditRequestDto {
    toEntity(divisionEditRequestDto) {
        const division = new division_entity_1.Division();
        division.divisionName = divisionEditRequestDto.name;
        return division;
    }
}
exports.DivisionEditRequestDto = DivisionEditRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "분류 이름 10자 이내" }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    (0, class_validator_1.MaxLength)(10),
    __metadata("design:type", String)
], DivisionEditRequestDto.prototype, "name", void 0);


/***/ }),
/* 97 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 98 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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
exports.UserProductModule = void 0;
const common_1 = __webpack_require__(6);
const config_1 = __webpack_require__(7);
const configuration_1 = __importDefault(__webpack_require__(8));
const typeorm_1 = __webpack_require__(14);
const product_controller_1 = __webpack_require__(99);
const user_entity_1 = __webpack_require__(16);
const user_service_impl_1 = __webpack_require__(19);
const product_query_builder_repository_1 = __webpack_require__(87);
const product_entity_1 = __webpack_require__(55);
const user_product_service_impl_1 = __webpack_require__(101);
const product_additional_image_entity_1 = __webpack_require__(62);
const product_detail_image_entity_1 = __webpack_require__(63);
const category_entity_1 = __webpack_require__(56);
const division_entity_1 = __webpack_require__(57);
let UserProductModule = class UserProductModule {
};
exports.UserProductModule = UserProductModule;
exports.UserProductModule = UserProductModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [configuration_1.default],
            }),
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, product_entity_1.Product, product_additional_image_entity_1.ProductAdditionalImage, product_detail_image_entity_1.ProductDetailImage, category_entity_1.Category, division_entity_1.Division]),
        ],
        controllers: [product_controller_1.UserProductController],
        providers: [
            user_service_impl_1.UserServiceImpl,
            {
                provide: "UserService",
                useClass: user_service_impl_1.UserServiceImpl,
            },
            user_product_service_impl_1.UserProductServiceImpl,
            {
                provide: "UserProductService",
                useClass: user_product_service_impl_1.UserProductServiceImpl,
            },
            product_query_builder_repository_1.ProductQueryBuilderRepository,
            {
                provide: "ProductQueryBuilderRepository",
                useClass: product_query_builder_repository_1.ProductQueryBuilderRepository,
            },
        ],
    })
], UserProductModule);


/***/ }),
/* 99 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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
var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserProductController = void 0;
const swagger_1 = __webpack_require__(22);
const common_1 = __webpack_require__(6);
const default_response_1 = __webpack_require__(20);
const product_search_request_dto_1 = __webpack_require__(67);
const jwt_authentication_guard_1 = __webpack_require__(30);
const user_token_request_dto_1 = __webpack_require__(33);
const user_product_service_1 = __webpack_require__(100);
const express_1 = __webpack_require__(32);
let UserProductController = class UserProductController {
    constructor(userProductService) {
        this.userProductService = userProductService;
    }
    async getUserProductList(productSearchRequestDto) {
        return this.userProductService.getUserProductList(productSearchRequestDto);
    }
    async getUserProductDetail(userTokenRequestDto, productId) {
        return this.userProductService.getUserProductDetail(userTokenRequestDto, productId);
    }
    viewImage(userTokenRequestDto, urn, response) {
        return this.userProductService.viewImage(userTokenRequestDto, urn, response);
    }
};
exports.UserProductController = UserProductController;
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: "상품 목록 조회(페이징 처리) 및 검색 기능",
    }),
    (0, swagger_1.ApiOkResponse)({
        description: "작업 성공!",
        type: (Promise),
    }),
    (0, swagger_1.ApiQuery)({
        name: "productSearchRequestDto",
        required: true,
        description: "상품 검색 조건 및 페이징 처리 조건",
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof product_search_request_dto_1.ProductSearchRequestDto !== "undefined" && product_search_request_dto_1.ProductSearchRequestDto) === "function" ? _b : Object]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], UserProductController.prototype, "getUserProductList", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: "상품 상세 조회",
    }),
    (0, swagger_1.ApiOkResponse)({
        description: "작업 성공!",
        type: (Promise),
    }),
    (0, swagger_1.ApiParam)({
        name: "productId",
        required: true,
        description: "상품 고유 번호",
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_authentication_guard_1.JwtAuthenticationGuard),
    __param(0, (0, user_token_request_dto_1.GetUserInfo)()),
    __param(1, (0, common_1.Param)("productId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof user_token_request_dto_1.UserTokenRequestDto !== "undefined" && user_token_request_dto_1.UserTokenRequestDto) === "function" ? _d : Object, Number]),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], UserProductController.prototype, "getUserProductDetail", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: "이미지 배열 출력 기능",
    }),
    (0, swagger_1.ApiOkResponse)({
        description: "성공!",
        type: (default_response_1.DefaultResponse),
    }),
    (0, swagger_1.ApiQuery)({
        name: "urn",
        required: true,
        description: "조회할 상품 이미지 URN",
    }),
    (0, common_1.Get)("/image"),
    (0, common_1.UseGuards)(jwt_authentication_guard_1.JwtAuthenticationGuard),
    __param(0, (0, user_token_request_dto_1.GetUserInfo)()),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_f = typeof user_token_request_dto_1.UserTokenRequestDto !== "undefined" && user_token_request_dto_1.UserTokenRequestDto) === "function" ? _f : Object, String, typeof (_g = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _g : Object]),
    __metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], UserProductController.prototype, "viewImage", null);
exports.UserProductController = UserProductController = __decorate([
    (0, swagger_1.ApiTags)("이용자 상품 조회 서비스"),
    (0, common_1.Controller)("products"),
    __param(0, (0, common_1.Inject)("UserProductService")),
    __metadata("design:paramtypes", [typeof (_a = typeof user_product_service_1.UserProductService !== "undefined" && user_product_service_1.UserProductService) === "function" ? _a : Object])
], UserProductController);


/***/ }),
/* 100 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 101 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserProductServiceImpl = void 0;
const common_1 = __webpack_require__(6);
const typeorm_1 = __webpack_require__(14);
const typeorm_2 = __webpack_require__(17);
const page_1 = __webpack_require__(80);
const user_entity_1 = __webpack_require__(16);
const product_entity_1 = __webpack_require__(55);
const product_repository_1 = __webpack_require__(79);
const default_response_1 = __webpack_require__(20);
const product_list_response_dto_1 = __webpack_require__(78);
const product_detail_response_dto_1 = __webpack_require__(81);
const product_additional_image_entity_1 = __webpack_require__(62);
const product_detail_image_entity_1 = __webpack_require__(63);
const configuration_1 = __importDefault(__webpack_require__(8));
let UserProductServiceImpl = class UserProductServiceImpl {
    constructor(userRepository, productRepository, productAdditionalImageRepository, productDetailImageRepository, productQueryBuilderRepository) {
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.productAdditionalImageRepository = productAdditionalImageRepository;
        this.productDetailImageRepository = productDetailImageRepository;
        this.productQueryBuilderRepository = productQueryBuilderRepository;
    }
    async getUserProductList(productSearchRequestDto) {
        const findByProducts = await this.productQueryBuilderRepository.dynamicQuerySearchAndPagingByDto(productSearchRequestDto);
        if (!findByProducts || findByProducts[0].length === 0) {
            throw new common_1.BadRequestException({ statusCode: 404, message: "상품이 등록되지 않았어요. 상품 정보를 확인해 주세요." });
        }
        return default_response_1.DefaultResponse.responseWithPaginationAndData(common_1.HttpStatus.OK, "작업 성공!", new page_1.Page(findByProducts[0].length, findByProducts[1], findByProducts[0].map((product) => new product_list_response_dto_1.ProductListResponseDto(product))));
    }
    async getUserProductDetail(userTokenRequestDto, productId) {
        if (!productId || productId <= 0) {
            throw new common_1.BadRequestException({ statusCode: 400, message: "상품 정보를 확인해 주세요." });
        }
        this.permissionCheck(userTokenRequestDto);
        const product = await this.productQueryBuilderRepository.findByIdAndJoinOneThing(productId);
        if (!product) {
            throw new common_1.BadRequestException({ statusCode: 404, message: "상품 조회에 실패하였어요. 상품 정보를 확인해 주세요." });
        }
        return default_response_1.DefaultResponse.responseWithData(common_1.HttpStatus.OK, "작업 성공!", new product_detail_response_dto_1.ProductDetailResponseDto(product));
    }
    async viewImage(userTokenRequestDto, urn, response) {
        await this.permissionCheck(userTokenRequestDto);
        if (!urn) {
            throw new common_1.BadRequestException({ statusCode: 400, message: "이미지를 확인해 주세요." });
        }
        const fileUrn = urn["urn"];
        const storagePath = await this.parsingImageDivision(fileUrn);
        const fileNameMatch = fileUrn.match(/\/([^\/]+)$/);
        const fileName = fileNameMatch ? fileNameMatch[1] : null;
        console.log("viewImage()의 fileName: ", fileName);
        return default_response_1.DefaultResponse.responseWithData(common_1.HttpStatus.OK, "파일 조회 성공!", response.sendFile(fileName, { root: storagePath }));
    }
    async parsingImageDivision(fileUrn) {
        const regExpMatchArray = fileUrn.match(/\/product\/images\/([^\/]+)/);
        if (!regExpMatchArray) {
            throw new common_1.BadRequestException({ statusCode: 400, message: "이미지를 확인해 주세요." });
        }
        return await this.checkImageExistence(fileUrn, regExpMatchArray[1]);
    }
    async checkImageExistence(fileUrn, imageDivision) {
        const fileUrl = `${(0, configuration_1.default)().server.url}:${(0, configuration_1.default)().server.port}${fileUrn}`;
        if (imageDivision === "main") {
            if (!(await this.productRepository.findOne({ where: { productMainImageUrl: fileUrl } }))) {
                throw new common_1.BadRequestException({ statusCode: 404, message: "상품 정보를 확인해 주세요." });
            }
            return "./local/storage/product/main/images";
        }
        else if (imageDivision === "additional") {
            if (!(await this.productAdditionalImageRepository.findOne({ where: { url: fileUrl } }))) {
                throw new common_1.BadRequestException({ statusCode: 404, message: "상품 정보를 확인해 주세요." });
            }
            return "./local/storage/product/additional/images";
        }
        else {
            if (!(await this.productDetailImageRepository.findOne({ where: { url: fileUrl } }))) {
                throw new common_1.BadRequestException({ statusCode: 404, message: "상품 정보를 확인해 주세요." });
            }
            return "./local/storage/product/detail/images";
        }
    }
    async permissionCheck(userTokenRequestDto) {
        if (!userTokenRequestDto) {
            throw new common_1.BadRequestException({ statusCode: 400, message: "상품 정보를 확인해 주세요." });
        }
        const user = await this.userRepository.findOne({ where: { email: userTokenRequestDto.email } });
        if (!user || user.userRole === null) {
            throw new common_1.NotFoundException({ statusCode: 404, message: "찾을 수 없어요." });
        }
    }
};
exports.UserProductServiceImpl = UserProductServiceImpl;
exports.UserProductServiceImpl = UserProductServiceImpl = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __param(2, (0, typeorm_1.InjectRepository)(product_additional_image_entity_1.ProductAdditionalImage)),
    __param(3, (0, typeorm_1.InjectRepository)(product_detail_image_entity_1.ProductDetailImage)),
    __param(4, (0, common_1.Inject)("ProductQueryBuilderRepository")),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object, typeof (_c = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _c : Object, typeof (_d = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _d : Object, typeof (_e = typeof product_repository_1.ProductRepository !== "undefined" && product_repository_1.ProductRepository) === "function" ? _e : Object])
], UserProductServiceImpl);


/***/ }),
/* 102 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.swaggerConfig = void 0;
const swagger_1 = __webpack_require__(22);
const configuration_1 = __importDefault(__webpack_require__(8));
function swaggerConfig(app) {
    const serverEnvironment = (0, configuration_1.default)().server.environment;
    const options = new swagger_1.DocumentBuilder()
        .setTitle("Hello, Juny!!")
        .setDescription("<h1> 주니의 Nest.ts 실습!</h1> \n <h3> WAS 구동 환경: " + serverEnvironment)
        .setVersion("1.0.0")
        .addBearerAuth({
        type: "http",
        scheme: "bearer",
        description: "JWT Token을 입력해 주세요.",
        in: "header",
    }, "token")
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup("swagger-ui/index.html", app, document);
}
exports.swaggerConfig = swaggerConfig;


/***/ }),
/* 103 */
/***/ ((module) => {

"use strict";
module.exports = require("cookie-parser");

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			if (cachedModule.error !== undefined) throw cachedModule.error;
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		try {
/******/ 			var execOptions = { id: moduleId, module: module, factory: __webpack_modules__[moduleId], require: __webpack_require__ };
/******/ 			__webpack_require__.i.forEach(function(handler) { handler(execOptions); });
/******/ 			module = execOptions.module;
/******/ 			execOptions.factory.call(module.exports, module, module.exports, execOptions.require);
/******/ 		} catch(e) {
/******/ 			module.error = e;
/******/ 			throw e;
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = __webpack_module_cache__;
/******/ 	
/******/ 	// expose the module execution interceptor
/******/ 	__webpack_require__.i = [];
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/get javascript update chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference all chunks
/******/ 		__webpack_require__.hu = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + "." + __webpack_require__.h() + ".hot-update.js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get update manifest filename */
/******/ 	(() => {
/******/ 		__webpack_require__.hmrF = () => ("main." + __webpack_require__.h() + ".hot-update.json");
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => ("a5ef3ef864da4ef9df43")
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hot module replacement */
/******/ 	(() => {
/******/ 		var currentModuleData = {};
/******/ 		var installedModules = __webpack_require__.c;
/******/ 		
/******/ 		// module and require creation
/******/ 		var currentChildModule;
/******/ 		var currentParents = [];
/******/ 		
/******/ 		// status
/******/ 		var registeredStatusHandlers = [];
/******/ 		var currentStatus = "idle";
/******/ 		
/******/ 		// while downloading
/******/ 		var blockingPromises = 0;
/******/ 		var blockingPromisesWaiting = [];
/******/ 		
/******/ 		// The update info
/******/ 		var currentUpdateApplyHandlers;
/******/ 		var queuedInvalidatedModules;
/******/ 		
/******/ 		// eslint-disable-next-line no-unused-vars
/******/ 		__webpack_require__.hmrD = currentModuleData;
/******/ 		
/******/ 		__webpack_require__.i.push(function (options) {
/******/ 			var module = options.module;
/******/ 			var require = createRequire(options.require, options.id);
/******/ 			module.hot = createModuleHotObject(options.id, module);
/******/ 			module.parents = currentParents;
/******/ 			module.children = [];
/******/ 			currentParents = [];
/******/ 			options.require = require;
/******/ 		});
/******/ 		
/******/ 		__webpack_require__.hmrC = {};
/******/ 		__webpack_require__.hmrI = {};
/******/ 		
/******/ 		function createRequire(require, moduleId) {
/******/ 			var me = installedModules[moduleId];
/******/ 			if (!me) return require;
/******/ 			var fn = function (request) {
/******/ 				if (me.hot.active) {
/******/ 					if (installedModules[request]) {
/******/ 						var parents = installedModules[request].parents;
/******/ 						if (parents.indexOf(moduleId) === -1) {
/******/ 							parents.push(moduleId);
/******/ 						}
/******/ 					} else {
/******/ 						currentParents = [moduleId];
/******/ 						currentChildModule = request;
/******/ 					}
/******/ 					if (me.children.indexOf(request) === -1) {
/******/ 						me.children.push(request);
/******/ 					}
/******/ 				} else {
/******/ 					console.warn(
/******/ 						"[HMR] unexpected require(" +
/******/ 							request +
/******/ 							") from disposed module " +
/******/ 							moduleId
/******/ 					);
/******/ 					currentParents = [];
/******/ 				}
/******/ 				return require(request);
/******/ 			};
/******/ 			var createPropertyDescriptor = function (name) {
/******/ 				return {
/******/ 					configurable: true,
/******/ 					enumerable: true,
/******/ 					get: function () {
/******/ 						return require[name];
/******/ 					},
/******/ 					set: function (value) {
/******/ 						require[name] = value;
/******/ 					}
/******/ 				};
/******/ 			};
/******/ 			for (var name in require) {
/******/ 				if (Object.prototype.hasOwnProperty.call(require, name) && name !== "e") {
/******/ 					Object.defineProperty(fn, name, createPropertyDescriptor(name));
/******/ 				}
/******/ 			}
/******/ 			fn.e = function (chunkId) {
/******/ 				return trackBlockingPromise(require.e(chunkId));
/******/ 			};
/******/ 			return fn;
/******/ 		}
/******/ 		
/******/ 		function createModuleHotObject(moduleId, me) {
/******/ 			var _main = currentChildModule !== moduleId;
/******/ 			var hot = {
/******/ 				// private stuff
/******/ 				_acceptedDependencies: {},
/******/ 				_acceptedErrorHandlers: {},
/******/ 				_declinedDependencies: {},
/******/ 				_selfAccepted: false,
/******/ 				_selfDeclined: false,
/******/ 				_selfInvalidated: false,
/******/ 				_disposeHandlers: [],
/******/ 				_main: _main,
/******/ 				_requireSelf: function () {
/******/ 					currentParents = me.parents.slice();
/******/ 					currentChildModule = _main ? undefined : moduleId;
/******/ 					__webpack_require__(moduleId);
/******/ 				},
/******/ 		
/******/ 				// Module API
/******/ 				active: true,
/******/ 				accept: function (dep, callback, errorHandler) {
/******/ 					if (dep === undefined) hot._selfAccepted = true;
/******/ 					else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 					else if (typeof dep === "object" && dep !== null) {
/******/ 						for (var i = 0; i < dep.length; i++) {
/******/ 							hot._acceptedDependencies[dep[i]] = callback || function () {};
/******/ 							hot._acceptedErrorHandlers[dep[i]] = errorHandler;
/******/ 						}
/******/ 					} else {
/******/ 						hot._acceptedDependencies[dep] = callback || function () {};
/******/ 						hot._acceptedErrorHandlers[dep] = errorHandler;
/******/ 					}
/******/ 				},
/******/ 				decline: function (dep) {
/******/ 					if (dep === undefined) hot._selfDeclined = true;
/******/ 					else if (typeof dep === "object" && dep !== null)
/******/ 						for (var i = 0; i < dep.length; i++)
/******/ 							hot._declinedDependencies[dep[i]] = true;
/******/ 					else hot._declinedDependencies[dep] = true;
/******/ 				},
/******/ 				dispose: function (callback) {
/******/ 					hot._disposeHandlers.push(callback);
/******/ 				},
/******/ 				addDisposeHandler: function (callback) {
/******/ 					hot._disposeHandlers.push(callback);
/******/ 				},
/******/ 				removeDisposeHandler: function (callback) {
/******/ 					var idx = hot._disposeHandlers.indexOf(callback);
/******/ 					if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 				},
/******/ 				invalidate: function () {
/******/ 					this._selfInvalidated = true;
/******/ 					switch (currentStatus) {
/******/ 						case "idle":
/******/ 							currentUpdateApplyHandlers = [];
/******/ 							Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 								__webpack_require__.hmrI[key](
/******/ 									moduleId,
/******/ 									currentUpdateApplyHandlers
/******/ 								);
/******/ 							});
/******/ 							setStatus("ready");
/******/ 							break;
/******/ 						case "ready":
/******/ 							Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 								__webpack_require__.hmrI[key](
/******/ 									moduleId,
/******/ 									currentUpdateApplyHandlers
/******/ 								);
/******/ 							});
/******/ 							break;
/******/ 						case "prepare":
/******/ 						case "check":
/******/ 						case "dispose":
/******/ 						case "apply":
/******/ 							(queuedInvalidatedModules = queuedInvalidatedModules || []).push(
/******/ 								moduleId
/******/ 							);
/******/ 							break;
/******/ 						default:
/******/ 							// ignore requests in error states
/******/ 							break;
/******/ 					}
/******/ 				},
/******/ 		
/******/ 				// Management API
/******/ 				check: hotCheck,
/******/ 				apply: hotApply,
/******/ 				status: function (l) {
/******/ 					if (!l) return currentStatus;
/******/ 					registeredStatusHandlers.push(l);
/******/ 				},
/******/ 				addStatusHandler: function (l) {
/******/ 					registeredStatusHandlers.push(l);
/******/ 				},
/******/ 				removeStatusHandler: function (l) {
/******/ 					var idx = registeredStatusHandlers.indexOf(l);
/******/ 					if (idx >= 0) registeredStatusHandlers.splice(idx, 1);
/******/ 				},
/******/ 		
/******/ 				//inherit from previous dispose call
/******/ 				data: currentModuleData[moduleId]
/******/ 			};
/******/ 			currentChildModule = undefined;
/******/ 			return hot;
/******/ 		}
/******/ 		
/******/ 		function setStatus(newStatus) {
/******/ 			currentStatus = newStatus;
/******/ 			var results = [];
/******/ 		
/******/ 			for (var i = 0; i < registeredStatusHandlers.length; i++)
/******/ 				results[i] = registeredStatusHandlers[i].call(null, newStatus);
/******/ 		
/******/ 			return Promise.all(results);
/******/ 		}
/******/ 		
/******/ 		function unblock() {
/******/ 			if (--blockingPromises === 0) {
/******/ 				setStatus("ready").then(function () {
/******/ 					if (blockingPromises === 0) {
/******/ 						var list = blockingPromisesWaiting;
/******/ 						blockingPromisesWaiting = [];
/******/ 						for (var i = 0; i < list.length; i++) {
/******/ 							list[i]();
/******/ 						}
/******/ 					}
/******/ 				});
/******/ 			}
/******/ 		}
/******/ 		
/******/ 		function trackBlockingPromise(promise) {
/******/ 			switch (currentStatus) {
/******/ 				case "ready":
/******/ 					setStatus("prepare");
/******/ 				/* fallthrough */
/******/ 				case "prepare":
/******/ 					blockingPromises++;
/******/ 					promise.then(unblock, unblock);
/******/ 					return promise;
/******/ 				default:
/******/ 					return promise;
/******/ 			}
/******/ 		}
/******/ 		
/******/ 		function waitForBlockingPromises(fn) {
/******/ 			if (blockingPromises === 0) return fn();
/******/ 			return new Promise(function (resolve) {
/******/ 				blockingPromisesWaiting.push(function () {
/******/ 					resolve(fn());
/******/ 				});
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		function hotCheck(applyOnUpdate) {
/******/ 			if (currentStatus !== "idle") {
/******/ 				throw new Error("check() is only allowed in idle status");
/******/ 			}
/******/ 			return setStatus("check")
/******/ 				.then(__webpack_require__.hmrM)
/******/ 				.then(function (update) {
/******/ 					if (!update) {
/******/ 						return setStatus(applyInvalidatedModules() ? "ready" : "idle").then(
/******/ 							function () {
/******/ 								return null;
/******/ 							}
/******/ 						);
/******/ 					}
/******/ 		
/******/ 					return setStatus("prepare").then(function () {
/******/ 						var updatedModules = [];
/******/ 						currentUpdateApplyHandlers = [];
/******/ 		
/******/ 						return Promise.all(
/******/ 							Object.keys(__webpack_require__.hmrC).reduce(function (
/******/ 								promises,
/******/ 								key
/******/ 							) {
/******/ 								__webpack_require__.hmrC[key](
/******/ 									update.c,
/******/ 									update.r,
/******/ 									update.m,
/******/ 									promises,
/******/ 									currentUpdateApplyHandlers,
/******/ 									updatedModules
/******/ 								);
/******/ 								return promises;
/******/ 							},
/******/ 							[])
/******/ 						).then(function () {
/******/ 							return waitForBlockingPromises(function () {
/******/ 								if (applyOnUpdate) {
/******/ 									return internalApply(applyOnUpdate);
/******/ 								} else {
/******/ 									return setStatus("ready").then(function () {
/******/ 										return updatedModules;
/******/ 									});
/******/ 								}
/******/ 							});
/******/ 						});
/******/ 					});
/******/ 				});
/******/ 		}
/******/ 		
/******/ 		function hotApply(options) {
/******/ 			if (currentStatus !== "ready") {
/******/ 				return Promise.resolve().then(function () {
/******/ 					throw new Error(
/******/ 						"apply() is only allowed in ready status (state: " +
/******/ 							currentStatus +
/******/ 							")"
/******/ 					);
/******/ 				});
/******/ 			}
/******/ 			return internalApply(options);
/******/ 		}
/******/ 		
/******/ 		function internalApply(options) {
/******/ 			options = options || {};
/******/ 		
/******/ 			applyInvalidatedModules();
/******/ 		
/******/ 			var results = currentUpdateApplyHandlers.map(function (handler) {
/******/ 				return handler(options);
/******/ 			});
/******/ 			currentUpdateApplyHandlers = undefined;
/******/ 		
/******/ 			var errors = results
/******/ 				.map(function (r) {
/******/ 					return r.error;
/******/ 				})
/******/ 				.filter(Boolean);
/******/ 		
/******/ 			if (errors.length > 0) {
/******/ 				return setStatus("abort").then(function () {
/******/ 					throw errors[0];
/******/ 				});
/******/ 			}
/******/ 		
/******/ 			// Now in "dispose" phase
/******/ 			var disposePromise = setStatus("dispose");
/******/ 		
/******/ 			results.forEach(function (result) {
/******/ 				if (result.dispose) result.dispose();
/******/ 			});
/******/ 		
/******/ 			// Now in "apply" phase
/******/ 			var applyPromise = setStatus("apply");
/******/ 		
/******/ 			var error;
/******/ 			var reportError = function (err) {
/******/ 				if (!error) error = err;
/******/ 			};
/******/ 		
/******/ 			var outdatedModules = [];
/******/ 			results.forEach(function (result) {
/******/ 				if (result.apply) {
/******/ 					var modules = result.apply(reportError);
/******/ 					if (modules) {
/******/ 						for (var i = 0; i < modules.length; i++) {
/******/ 							outdatedModules.push(modules[i]);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			});
/******/ 		
/******/ 			return Promise.all([disposePromise, applyPromise]).then(function () {
/******/ 				// handle errors in accept handlers and self accepted module load
/******/ 				if (error) {
/******/ 					return setStatus("fail").then(function () {
/******/ 						throw error;
/******/ 					});
/******/ 				}
/******/ 		
/******/ 				if (queuedInvalidatedModules) {
/******/ 					return internalApply(options).then(function (list) {
/******/ 						outdatedModules.forEach(function (moduleId) {
/******/ 							if (list.indexOf(moduleId) < 0) list.push(moduleId);
/******/ 						});
/******/ 						return list;
/******/ 					});
/******/ 				}
/******/ 		
/******/ 				return setStatus("idle").then(function () {
/******/ 					return outdatedModules;
/******/ 				});
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		function applyInvalidatedModules() {
/******/ 			if (queuedInvalidatedModules) {
/******/ 				if (!currentUpdateApplyHandlers) currentUpdateApplyHandlers = [];
/******/ 				Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 					queuedInvalidatedModules.forEach(function (moduleId) {
/******/ 						__webpack_require__.hmrI[key](
/******/ 							moduleId,
/******/ 							currentUpdateApplyHandlers
/******/ 						);
/******/ 					});
/******/ 				});
/******/ 				queuedInvalidatedModules = undefined;
/******/ 				return true;
/******/ 			}
/******/ 		}
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/require chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded chunks
/******/ 		// "1" means "loaded", otherwise not loaded yet
/******/ 		var installedChunks = __webpack_require__.hmrS_require = __webpack_require__.hmrS_require || {
/******/ 			0: 1
/******/ 		};
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no chunk install function needed
/******/ 		
/******/ 		// no chunk loading
/******/ 		
/******/ 		// no external install chunk
/******/ 		
/******/ 		function loadUpdateChunk(chunkId, updatedModulesList) {
/******/ 			var update = require("./" + __webpack_require__.hu(chunkId));
/******/ 			var updatedModules = update.modules;
/******/ 			var runtime = update.runtime;
/******/ 			for(var moduleId in updatedModules) {
/******/ 				if(__webpack_require__.o(updatedModules, moduleId)) {
/******/ 					currentUpdate[moduleId] = updatedModules[moduleId];
/******/ 					if(updatedModulesList) updatedModulesList.push(moduleId);
/******/ 				}
/******/ 			}
/******/ 			if(runtime) currentUpdateRuntime.push(runtime);
/******/ 		}
/******/ 		
/******/ 		var currentUpdateChunks;
/******/ 		var currentUpdate;
/******/ 		var currentUpdateRemovedChunks;
/******/ 		var currentUpdateRuntime;
/******/ 		function applyHandler(options) {
/******/ 			if (__webpack_require__.f) delete __webpack_require__.f.requireHmr;
/******/ 			currentUpdateChunks = undefined;
/******/ 			function getAffectedModuleEffects(updateModuleId) {
/******/ 				var outdatedModules = [updateModuleId];
/******/ 				var outdatedDependencies = {};
/******/ 		
/******/ 				var queue = outdatedModules.map(function (id) {
/******/ 					return {
/******/ 						chain: [id],
/******/ 						id: id
/******/ 					};
/******/ 				});
/******/ 				while (queue.length > 0) {
/******/ 					var queueItem = queue.pop();
/******/ 					var moduleId = queueItem.id;
/******/ 					var chain = queueItem.chain;
/******/ 					var module = __webpack_require__.c[moduleId];
/******/ 					if (
/******/ 						!module ||
/******/ 						(module.hot._selfAccepted && !module.hot._selfInvalidated)
/******/ 					)
/******/ 						continue;
/******/ 					if (module.hot._selfDeclined) {
/******/ 						return {
/******/ 							type: "self-declined",
/******/ 							chain: chain,
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					if (module.hot._main) {
/******/ 						return {
/******/ 							type: "unaccepted",
/******/ 							chain: chain,
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					for (var i = 0; i < module.parents.length; i++) {
/******/ 						var parentId = module.parents[i];
/******/ 						var parent = __webpack_require__.c[parentId];
/******/ 						if (!parent) continue;
/******/ 						if (parent.hot._declinedDependencies[moduleId]) {
/******/ 							return {
/******/ 								type: "declined",
/******/ 								chain: chain.concat([parentId]),
/******/ 								moduleId: moduleId,
/******/ 								parentId: parentId
/******/ 							};
/******/ 						}
/******/ 						if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 						if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 							if (!outdatedDependencies[parentId])
/******/ 								outdatedDependencies[parentId] = [];
/******/ 							addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 							continue;
/******/ 						}
/******/ 						delete outdatedDependencies[parentId];
/******/ 						outdatedModules.push(parentId);
/******/ 						queue.push({
/******/ 							chain: chain.concat([parentId]),
/******/ 							id: parentId
/******/ 						});
/******/ 					}
/******/ 				}
/******/ 		
/******/ 				return {
/******/ 					type: "accepted",
/******/ 					moduleId: updateModuleId,
/******/ 					outdatedModules: outdatedModules,
/******/ 					outdatedDependencies: outdatedDependencies
/******/ 				};
/******/ 			}
/******/ 		
/******/ 			function addAllToSet(a, b) {
/******/ 				for (var i = 0; i < b.length; i++) {
/******/ 					var item = b[i];
/******/ 					if (a.indexOf(item) === -1) a.push(item);
/******/ 				}
/******/ 			}
/******/ 		
/******/ 			// at begin all updates modules are outdated
/******/ 			// the "outdated" status can propagate to parents if they don't accept the children
/******/ 			var outdatedDependencies = {};
/******/ 			var outdatedModules = [];
/******/ 			var appliedUpdate = {};
/******/ 		
/******/ 			var warnUnexpectedRequire = function warnUnexpectedRequire(module) {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" + module.id + ") to disposed module"
/******/ 				);
/******/ 			};
/******/ 		
/******/ 			for (var moduleId in currentUpdate) {
/******/ 				if (__webpack_require__.o(currentUpdate, moduleId)) {
/******/ 					var newModuleFactory = currentUpdate[moduleId];
/******/ 					/** @type {TODO} */
/******/ 					var result;
/******/ 					if (newModuleFactory) {
/******/ 						result = getAffectedModuleEffects(moduleId);
/******/ 					} else {
/******/ 						result = {
/******/ 							type: "disposed",
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					/** @type {Error|false} */
/******/ 					var abortError = false;
/******/ 					var doApply = false;
/******/ 					var doDispose = false;
/******/ 					var chainInfo = "";
/******/ 					if (result.chain) {
/******/ 						chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 					}
/******/ 					switch (result.type) {
/******/ 						case "self-declined":
/******/ 							if (options.onDeclined) options.onDeclined(result);
/******/ 							if (!options.ignoreDeclined)
/******/ 								abortError = new Error(
/******/ 									"Aborted because of self decline: " +
/******/ 										result.moduleId +
/******/ 										chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "declined":
/******/ 							if (options.onDeclined) options.onDeclined(result);
/******/ 							if (!options.ignoreDeclined)
/******/ 								abortError = new Error(
/******/ 									"Aborted because of declined dependency: " +
/******/ 										result.moduleId +
/******/ 										" in " +
/******/ 										result.parentId +
/******/ 										chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "unaccepted":
/******/ 							if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 							if (!options.ignoreUnaccepted)
/******/ 								abortError = new Error(
/******/ 									"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "accepted":
/******/ 							if (options.onAccepted) options.onAccepted(result);
/******/ 							doApply = true;
/******/ 							break;
/******/ 						case "disposed":
/******/ 							if (options.onDisposed) options.onDisposed(result);
/******/ 							doDispose = true;
/******/ 							break;
/******/ 						default:
/******/ 							throw new Error("Unexception type " + result.type);
/******/ 					}
/******/ 					if (abortError) {
/******/ 						return {
/******/ 							error: abortError
/******/ 						};
/******/ 					}
/******/ 					if (doApply) {
/******/ 						appliedUpdate[moduleId] = newModuleFactory;
/******/ 						addAllToSet(outdatedModules, result.outdatedModules);
/******/ 						for (moduleId in result.outdatedDependencies) {
/******/ 							if (__webpack_require__.o(result.outdatedDependencies, moduleId)) {
/******/ 								if (!outdatedDependencies[moduleId])
/******/ 									outdatedDependencies[moduleId] = [];
/******/ 								addAllToSet(
/******/ 									outdatedDependencies[moduleId],
/******/ 									result.outdatedDependencies[moduleId]
/******/ 								);
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 					if (doDispose) {
/******/ 						addAllToSet(outdatedModules, [result.moduleId]);
/******/ 						appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 			currentUpdate = undefined;
/******/ 		
/******/ 			// Store self accepted outdated modules to require them later by the module system
/******/ 			var outdatedSelfAcceptedModules = [];
/******/ 			for (var j = 0; j < outdatedModules.length; j++) {
/******/ 				var outdatedModuleId = outdatedModules[j];
/******/ 				var module = __webpack_require__.c[outdatedModuleId];
/******/ 				if (
/******/ 					module &&
/******/ 					(module.hot._selfAccepted || module.hot._main) &&
/******/ 					// removed self-accepted modules should not be required
/******/ 					appliedUpdate[outdatedModuleId] !== warnUnexpectedRequire &&
/******/ 					// when called invalidate self-accepting is not possible
/******/ 					!module.hot._selfInvalidated
/******/ 				) {
/******/ 					outdatedSelfAcceptedModules.push({
/******/ 						module: outdatedModuleId,
/******/ 						require: module.hot._requireSelf,
/******/ 						errorHandler: module.hot._selfAccepted
/******/ 					});
/******/ 				}
/******/ 			}
/******/ 		
/******/ 			var moduleOutdatedDependencies;
/******/ 		
/******/ 			return {
/******/ 				dispose: function () {
/******/ 					currentUpdateRemovedChunks.forEach(function (chunkId) {
/******/ 						delete installedChunks[chunkId];
/******/ 					});
/******/ 					currentUpdateRemovedChunks = undefined;
/******/ 		
/******/ 					var idx;
/******/ 					var queue = outdatedModules.slice();
/******/ 					while (queue.length > 0) {
/******/ 						var moduleId = queue.pop();
/******/ 						var module = __webpack_require__.c[moduleId];
/******/ 						if (!module) continue;
/******/ 		
/******/ 						var data = {};
/******/ 		
/******/ 						// Call dispose handlers
/******/ 						var disposeHandlers = module.hot._disposeHandlers;
/******/ 						for (j = 0; j < disposeHandlers.length; j++) {
/******/ 							disposeHandlers[j].call(null, data);
/******/ 						}
/******/ 						__webpack_require__.hmrD[moduleId] = data;
/******/ 		
/******/ 						// disable module (this disables requires from this module)
/******/ 						module.hot.active = false;
/******/ 		
/******/ 						// remove module from cache
/******/ 						delete __webpack_require__.c[moduleId];
/******/ 		
/******/ 						// when disposing there is no need to call dispose handler
/******/ 						delete outdatedDependencies[moduleId];
/******/ 		
/******/ 						// remove "parents" references from all children
/******/ 						for (j = 0; j < module.children.length; j++) {
/******/ 							var child = __webpack_require__.c[module.children[j]];
/******/ 							if (!child) continue;
/******/ 							idx = child.parents.indexOf(moduleId);
/******/ 							if (idx >= 0) {
/******/ 								child.parents.splice(idx, 1);
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// remove outdated dependency from module children
/******/ 					var dependency;
/******/ 					for (var outdatedModuleId in outdatedDependencies) {
/******/ 						if (__webpack_require__.o(outdatedDependencies, outdatedModuleId)) {
/******/ 							module = __webpack_require__.c[outdatedModuleId];
/******/ 							if (module) {
/******/ 								moduleOutdatedDependencies =
/******/ 									outdatedDependencies[outdatedModuleId];
/******/ 								for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 									dependency = moduleOutdatedDependencies[j];
/******/ 									idx = module.children.indexOf(dependency);
/******/ 									if (idx >= 0) module.children.splice(idx, 1);
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				},
/******/ 				apply: function (reportError) {
/******/ 					// insert new code
/******/ 					for (var updateModuleId in appliedUpdate) {
/******/ 						if (__webpack_require__.o(appliedUpdate, updateModuleId)) {
/******/ 							__webpack_require__.m[updateModuleId] = appliedUpdate[updateModuleId];
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// run new runtime modules
/******/ 					for (var i = 0; i < currentUpdateRuntime.length; i++) {
/******/ 						currentUpdateRuntime[i](__webpack_require__);
/******/ 					}
/******/ 		
/******/ 					// call accept handlers
/******/ 					for (var outdatedModuleId in outdatedDependencies) {
/******/ 						if (__webpack_require__.o(outdatedDependencies, outdatedModuleId)) {
/******/ 							var module = __webpack_require__.c[outdatedModuleId];
/******/ 							if (module) {
/******/ 								moduleOutdatedDependencies =
/******/ 									outdatedDependencies[outdatedModuleId];
/******/ 								var callbacks = [];
/******/ 								var errorHandlers = [];
/******/ 								var dependenciesForCallbacks = [];
/******/ 								for (var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 									var dependency = moduleOutdatedDependencies[j];
/******/ 									var acceptCallback =
/******/ 										module.hot._acceptedDependencies[dependency];
/******/ 									var errorHandler =
/******/ 										module.hot._acceptedErrorHandlers[dependency];
/******/ 									if (acceptCallback) {
/******/ 										if (callbacks.indexOf(acceptCallback) !== -1) continue;
/******/ 										callbacks.push(acceptCallback);
/******/ 										errorHandlers.push(errorHandler);
/******/ 										dependenciesForCallbacks.push(dependency);
/******/ 									}
/******/ 								}
/******/ 								for (var k = 0; k < callbacks.length; k++) {
/******/ 									try {
/******/ 										callbacks[k].call(null, moduleOutdatedDependencies);
/******/ 									} catch (err) {
/******/ 										if (typeof errorHandlers[k] === "function") {
/******/ 											try {
/******/ 												errorHandlers[k](err, {
/******/ 													moduleId: outdatedModuleId,
/******/ 													dependencyId: dependenciesForCallbacks[k]
/******/ 												});
/******/ 											} catch (err2) {
/******/ 												if (options.onErrored) {
/******/ 													options.onErrored({
/******/ 														type: "accept-error-handler-errored",
/******/ 														moduleId: outdatedModuleId,
/******/ 														dependencyId: dependenciesForCallbacks[k],
/******/ 														error: err2,
/******/ 														originalError: err
/******/ 													});
/******/ 												}
/******/ 												if (!options.ignoreErrored) {
/******/ 													reportError(err2);
/******/ 													reportError(err);
/******/ 												}
/******/ 											}
/******/ 										} else {
/******/ 											if (options.onErrored) {
/******/ 												options.onErrored({
/******/ 													type: "accept-errored",
/******/ 													moduleId: outdatedModuleId,
/******/ 													dependencyId: dependenciesForCallbacks[k],
/******/ 													error: err
/******/ 												});
/******/ 											}
/******/ 											if (!options.ignoreErrored) {
/******/ 												reportError(err);
/******/ 											}
/******/ 										}
/******/ 									}
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// Load self accepted modules
/******/ 					for (var o = 0; o < outdatedSelfAcceptedModules.length; o++) {
/******/ 						var item = outdatedSelfAcceptedModules[o];
/******/ 						var moduleId = item.module;
/******/ 						try {
/******/ 							item.require(moduleId);
/******/ 						} catch (err) {
/******/ 							if (typeof item.errorHandler === "function") {
/******/ 								try {
/******/ 									item.errorHandler(err, {
/******/ 										moduleId: moduleId,
/******/ 										module: __webpack_require__.c[moduleId]
/******/ 									});
/******/ 								} catch (err2) {
/******/ 									if (options.onErrored) {
/******/ 										options.onErrored({
/******/ 											type: "self-accept-error-handler-errored",
/******/ 											moduleId: moduleId,
/******/ 											error: err2,
/******/ 											originalError: err
/******/ 										});
/******/ 									}
/******/ 									if (!options.ignoreErrored) {
/******/ 										reportError(err2);
/******/ 										reportError(err);
/******/ 									}
/******/ 								}
/******/ 							} else {
/******/ 								if (options.onErrored) {
/******/ 									options.onErrored({
/******/ 										type: "self-accept-errored",
/******/ 										moduleId: moduleId,
/******/ 										error: err
/******/ 									});
/******/ 								}
/******/ 								if (!options.ignoreErrored) {
/******/ 									reportError(err);
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					return outdatedModules;
/******/ 				}
/******/ 			};
/******/ 		}
/******/ 		__webpack_require__.hmrI.require = function (moduleId, applyHandlers) {
/******/ 			if (!currentUpdate) {
/******/ 				currentUpdate = {};
/******/ 				currentUpdateRuntime = [];
/******/ 				currentUpdateRemovedChunks = [];
/******/ 				applyHandlers.push(applyHandler);
/******/ 			}
/******/ 			if (!__webpack_require__.o(currentUpdate, moduleId)) {
/******/ 				currentUpdate[moduleId] = __webpack_require__.m[moduleId];
/******/ 			}
/******/ 		};
/******/ 		__webpack_require__.hmrC.require = function (
/******/ 			chunkIds,
/******/ 			removedChunks,
/******/ 			removedModules,
/******/ 			promises,
/******/ 			applyHandlers,
/******/ 			updatedModulesList
/******/ 		) {
/******/ 			applyHandlers.push(applyHandler);
/******/ 			currentUpdateChunks = {};
/******/ 			currentUpdateRemovedChunks = removedChunks;
/******/ 			currentUpdate = removedModules.reduce(function (obj, key) {
/******/ 				obj[key] = false;
/******/ 				return obj;
/******/ 			}, {});
/******/ 			currentUpdateRuntime = [];
/******/ 			chunkIds.forEach(function (chunkId) {
/******/ 				if (
/******/ 					__webpack_require__.o(installedChunks, chunkId) &&
/******/ 					installedChunks[chunkId] !== undefined
/******/ 				) {
/******/ 					promises.push(loadUpdateChunk(chunkId, updatedModulesList));
/******/ 					currentUpdateChunks[chunkId] = true;
/******/ 				} else {
/******/ 					currentUpdateChunks[chunkId] = false;
/******/ 				}
/******/ 			});
/******/ 			if (__webpack_require__.f) {
/******/ 				__webpack_require__.f.requireHmr = function (chunkId, promises) {
/******/ 					if (
/******/ 						currentUpdateChunks &&
/******/ 						__webpack_require__.o(currentUpdateChunks, chunkId) &&
/******/ 						!currentUpdateChunks[chunkId]
/******/ 					) {
/******/ 						promises.push(loadUpdateChunk(chunkId));
/******/ 						currentUpdateChunks[chunkId] = true;
/******/ 					}
/******/ 				};
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.hmrM = function() {
/******/ 			return Promise.resolve().then(function() {
/******/ 				return require("./" + __webpack_require__.hmrF());
/******/ 			})['catch'](function(err) { if(err.code !== 'MODULE_NOT_FOUND') throw err; });
/******/ 		}
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// module cache are used so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	__webpack_require__(0);
/******/ 	var __webpack_exports__ = __webpack_require__(3);
/******/ 	
/******/ })()
;