"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthAdminModule = void 0;
const common_1 = require("@nestjs/common");
const auth_admin_controller_1 = require("./auth-admin.controller");
const auth_admin_service_1 = require("./auth-admin.service");
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const jwt_strategy_1 = require("../jwt/jwt.strategy");
const prisma_module_1 = require("../prisma/prisma.module");
let AuthAdminModule = class AuthAdminModule {
};
exports.AuthAdminModule = AuthAdminModule;
exports.AuthAdminModule = AuthAdminModule = __decorate([
    (0, common_1.Module)({
        imports: [
            prisma_module_1.PrismaModule,
            passport_1.PassportModule,
            jwt_1.JwtModule.registerAsync({
                inject: [config_1.ConfigService],
                useFactory: (config) => ({
                    secret: config.get('JWT_SECRET_KEY'),
                    signOptions: { expiresIn: config.get('JWT_EXPIRY_IN') },
                }),
            }),
        ],
        controllers: [auth_admin_controller_1.AuthAdminController],
        providers: [auth_admin_service_1.AuthAdminService, jwt_strategy_1.JwtStrategy],
    })
], AuthAdminModule);
//# sourceMappingURL=auht-admin.module.js.map