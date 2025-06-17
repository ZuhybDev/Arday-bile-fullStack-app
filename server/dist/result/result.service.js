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
exports.ResultService = void 0;
const common_1 = require("@nestjs/common");
const grade_utilis_1 = require("../common/utils/grade.utilis");
const prisma_service_1 = require("../prisma/prisma.service");
let ResultService = class ResultService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createResult(user, grade, subjectId, studentId) {
        const subject = await this.prisma.subject.findUnique({
            where: { id: subjectId },
            select: {
                passMark: true,
                name: true,
                schoolId: true,
            },
        });
        if (!subject) {
            throw new common_1.NotFoundException('Subject does not exist. Try again');
        }
        if (grade > subject.passMark) {
            throw new common_1.NotAcceptableException('Grade must be equal to or less than the pass mark');
        }
        if (user.schoolId !== subject.schoolId) {
            throw new common_1.ForbiddenException('Access denied');
        }
        const letter = (0, grade_utilis_1.calculationLetterGrade)(grade, subject.passMark);
        const result = await this.prisma.result.upsert({
            where: {
                studentId_subjectId: {
                    studentId,
                    subjectId,
                },
            },
            update: {
                grade,
                status: letter,
            },
            create: {
                grade,
                subjectId,
                studentId,
                status: letter,
            },
        });
        return {
            id: result.id,
            name: subject.name,
            grade: result.grade,
            status: result.status,
            subjectId: result.subjectId,
            studentId: result.studentId,
            createdAt: result.createdAt,
        };
    }
    async clearResult(resultId) {
        const result = await this.prisma.result.delete({
            where: { id: resultId },
        });
        if (!result) {
            throw new common_1.NotFoundException('Not found does not exist');
        }
        return {
            message: 'successfully deleted',
        };
    }
};
exports.ResultService = ResultService;
exports.ResultService = ResultService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ResultService);
//# sourceMappingURL=result.service.js.map