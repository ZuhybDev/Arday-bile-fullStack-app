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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthAdminService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
let AuthAdminService = class AuthAdminService {
    prisma;
    jwtService;
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async registerAdmin(name, email, password, schoolId) {
        const existingAdmin = await this.prisma.admin.findUnique({
            where: { email },
        });
        if (existingAdmin)
            return {
                message: 'Email-ka hore ayaa loo isticmaalay',
            };
        if (password.length < 6) {
            throw new common_1.UnprocessableEntityException('Password-ka waa inaa ka badnaada 6 xaraf');
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const admin = await this.prisma.admin.create({
            data: {
                name,
                email,
                password: hashedPassword,
                schoolId,
            },
        });
        const payload = { sub: admin.id, email: admin.email, role: admin.role };
        const token = this.jwtService.sign(payload);
        return {
            admin_info: {
                id: admin.id,
                admin: admin.name,
                email: admin.email,
                schoolId: admin.schoolId,
                role: admin.role,
            },
            token_access: {
                token,
            },
        };
    }
};
exports.AuthAdminService = AuthAdminService;
exports.AuthAdminService = AuthAdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AuthAdminService);
//# sourceMappingURL=auth-admin.service.js.map