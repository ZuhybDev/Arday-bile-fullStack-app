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
    async registerAdmin(name, email, password, schoolId, res) {
        if (schoolId == undefined) {
            throw new common_1.ForbiddenException('School not found. Please create the school first.');
        }
        if (name == undefined || email == undefined || password == undefined) {
            throw new common_1.NotAcceptableException('Fill all required feilds');
        }
        const school = await this.prisma.school.findUnique({
            where: { id: schoolId },
        });
        if (!school) {
            throw new common_1.ForbiddenException('School not found. Please create the school first.');
        }
        const existingAdmin = await this.prisma.admin.findUnique({
            where: { email },
        });
        if (existingAdmin)
            return {
                message: 'Email is already in used',
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
        const payload = {
            userId: admin.id,
            email: admin.email,
            role: admin.role,
            schoolId: admin.schoolId,
        };
        const token = this.jwtService.sign(payload);
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 1000 * 60 * 60 * 24,
            path: '/',
        });
        return {
            admin_info: {
                id: admin.id,
                admin: admin.name,
                email: admin.email,
                schoolId: admin.schoolId,
                role: admin.role,
            },
        };
    }
    async login(email, password, res) {
        const admin = await this.prisma.admin.findUnique({
            where: { email },
        });
        if (!admin) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const validPassword = await bcrypt.compare(password, admin.password);
        if (!validPassword) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const payload = {
            userId: admin.id,
            email: admin.email,
            role: admin.role,
            schoolId: admin.schoolId,
        };
        const token = await this.jwtService.signAsync(payload);
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 1000 * 60 * 60 * 24,
            path: '/',
        });
        return {
            id: admin.id,
            name: admin.name,
            email: admin.email,
        };
    }
    async updateAdmin(user, id, name, email, password) {
        const hasAdminExist = await this.prisma.admin.findUnique({
            where: { id },
        });
        if (!hasAdminExist) {
            throw new common_1.NotFoundException('Not found. Try again');
        }
        if (user.userId !== id) {
            throw new common_1.ForbiddenException('Access denied');
        }
        const updatingData = {};
        if (name)
            updatingData.name = name;
        if (email)
            updatingData.email = email;
        if (password) {
            password = await bcrypt.hash(password, 10);
        }
        const admin = await this.prisma.admin.update({
            where: { id },
            data: updatingData,
        });
        return {
            message: 'Successfully updated ',
            id: admin.id,
            name: admin.name,
            email: admin.email,
        };
    }
    async findAllAdmins() {
        return this.prisma.admin.findMany();
    }
    async removeAdmin(user, id) {
        const hasAdminExist = await this.prisma.admin.findUnique({
            where: { id },
        });
        if (!hasAdminExist) {
            throw new common_1.NotFoundException('Not found. Try again');
        }
        if (user.userId !== id) {
            throw new common_1.ForbiddenException('Access denied');
        }
        const deletedAdmin = await this.prisma.admin.delete({
            where: { id },
        });
        return {
            messasge: `${(await deletedAdmin).name} Successfully deleted.`,
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