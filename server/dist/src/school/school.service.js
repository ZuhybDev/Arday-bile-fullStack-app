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
exports.SchoolService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let SchoolService = class SchoolService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async registerSchools(data) {
        const registerSchool = await this.prisma.school.create({
            data,
        });
        return {
            message: `"${registerSchool.name} " Created successfully`,
            schoolId: registerSchool.id,
            school: registerSchool.name,
            created: registerSchool.createdAt,
        };
    }
    async updateSchool(user, id, newName) {
        if (!newName || newName.trim() === '') {
            throw new common_1.BadRequestException('New name is required');
        }
        const school = await this.prisma.school.findUnique({
            where: { id },
        });
        if (!school) {
            throw new common_1.NotFoundException('not foud. Try again');
        }
        if (user.schoolId !== school.id) {
            throw new common_1.ForbiddenException('Access denied');
        }
        const updatedSchool = await this.prisma.school.update({
            where: { id },
            data: { name: newName },
        });
        return {
            message: 'Successfully updated',
            new_name: updatedSchool.name,
        };
    }
    async readSchoolData(user) {
        const schoolData = await this.prisma.school.findUnique({
            where: { id: user.schoolId },
            select: {
                id: true,
                name: true,
                createdAt: true,
            },
        });
        if (!schoolData) {
            throw new common_1.NotFoundException('School does not Exist. Try again');
        }
        const totalAdmin = await this.prisma.admin.count();
        const adminData = await this.prisma.admin.findMany({
            where: { schoolId: user.schoolId },
            select: {
                name: true,
                email: true,
                role: true,
                createdAt: true,
            },
        });
        if (!totalAdmin) {
            return 0;
        }
        const totalStudent = await this.prisma.student.count({
            where: {
                schoolId: user.schoolId,
            },
        });
        const subjects = await this.prisma.subject.findMany({
            where: {
                schoolId: user.schoolId,
            },
            select: {
                id: true,
            },
        });
        const totalSubjects = subjects.length;
        const subjectIds = subjects.map((s) => s.id);
        if (!totalStudent) {
            return 0;
        }
        const passedCount = await this.prisma.result.count({
            where: {
                subjectId: {
                    in: subjectIds,
                },
                grade: {
                    gte: 50,
                },
            },
        });
        if (user.schoolId !== schoolData.id) {
            throw new common_1.ForbiddenException('Access denied');
        }
        return {
            message: 'School data',
            school: schoolData,
            totalAdmins: totalAdmin,
            totalStudents: totalStudent,
            totalSubjects: totalSubjects,
            passedCount: passedCount,
            Admin: adminData,
        };
    }
    async deletedSchool(id, user) {
        const existingSchool = await this.prisma.school.findUnique({
            where: { id: id },
        });
        if (!existingSchool) {
            throw new common_1.NotFoundException('Not foud. Try again');
        }
        if (user.schoolId !== existingSchool.id) {
            throw new common_1.ForbiddenException('Access denied');
        }
        const deletedSchool = await this.prisma.school.delete({
            where: { id: id },
        });
        return {
            message: `Successfully deleted ${deletedSchool.name}`,
        };
    }
};
exports.SchoolService = SchoolService;
exports.SchoolService = SchoolService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SchoolService);
//# sourceMappingURL=school.service.js.map