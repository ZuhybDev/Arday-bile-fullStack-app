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
exports.SubjectsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let SubjectsService = class SubjectsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createSubject(user, name, passMark, schoolId) {
        if (!name || !schoolId || !passMark) {
            throw new common_1.NotAcceptableException('Please fill in all required fields');
        }
        if (schoolId != user.schoolId) {
            throw new common_1.ForbiddenException('Access denied');
        }
        const subject = await this.prisma.subject.create({
            data: {
                name,
                passMark,
                schoolId,
            },
        });
        return {
            subject,
        };
    }
    async findAllSubjects(schoolId, user) {
        if (!schoolId) {
            throw new common_1.ForbiddenException('Invalid or missing school ID');
        }
        const allsubjects = await this.prisma.subject.findMany({
            where: { schoolId },
        });
        if (!allsubjects || allsubjects.length == 0) {
            return [];
        }
        if (schoolId != user.schoolId) {
            throw new common_1.ForbiddenException('Access denied');
        }
        return {
            cound: allsubjects.length,
            allsubjects,
        };
    }
    async findOneSubject(id, user) {
        const subject = await this.prisma.subject.findUnique({
            where: { id },
        });
        if (!subject) {
            throw new common_1.NotFoundException('Not found. Try again');
        }
        if (user.schoolId != subject.schoolId) {
            throw new common_1.ForbiddenException('Access denied');
        }
        return {
            subject,
        };
    }
    async updateSubject(user, id, name, passMark) {
        const subject = await this.prisma.subject.findUnique({
            where: { id },
        });
        if (!subject) {
            throw new common_1.NotFoundException('Not found.Try again');
        }
        if (subject.schoolId != user.schoolId) {
            throw new common_1.ForbiddenException('Access denied');
        }
        const updatingData = {};
        if (name)
            updatingData.name = name;
        if (passMark)
            updatingData.passMark = passMark;
        const updatingDatasubject = await this.prisma.subject.update({
            where: { id },
            data: updatingData,
        });
        return {
            id: updatingDatasubject.id,
            name: updatingDatasubject.name,
            passMark: updatingDatasubject.passMark,
        };
    }
    async removeSubject(id, user) {
        const subject = await this.prisma.subject.delete({
            where: { id },
        });
        if (!subject) {
            throw new common_1.NotFoundException('Not found or already deleted. Try again');
        }
        if (user.schoolId != subject.schoolId) {
            throw new common_1.ForbiddenException('Access deneid');
        }
        return {
            message: `${subject.name} successfully deleted.`,
        };
    }
};
exports.SubjectsService = SubjectsService;
exports.SubjectsService = SubjectsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SubjectsService);
//# sourceMappingURL=subjects.service.js.map