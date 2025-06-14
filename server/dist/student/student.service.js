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
exports.StudentService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const student_code_generator_1 = require("../common/lib/student.code.generator");
const prisma_service_1 = require("../prisma/prisma.service");
let StudentService = class StudentService {
    prisma;
    jwtService;
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async createStudent(name, password, schoolId) {
        try {
            if (!name || !password || !schoolId) {
                throw new common_1.NotAcceptableException('Please fill in all required fields');
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const studentCode = (0, student_code_generator_1.studentCodeGenerator)();
            const student = await this.prisma.student.create({
                data: {
                    name,
                    password: hashedPassword,
                    code: studentCode,
                    schoolId,
                },
            });
            return {
                message: `Student ${student.name} is created successfully`,
                id: student.id,
                name: student.name,
                roll_no: student.code,
                schoolId: student.schoolId,
                total: student.total,
                average: student.average,
                role: student.role,
                created: student.createdAt,
            };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
    async loginStudent(code, password) {
        try {
            if (!code || !password) {
                throw new common_1.NotAcceptableException('Please fill in all required fields');
            }
            const student = await this.prisma.student.findUnique({
                where: { code },
                select: {
                    id: true,
                    name: true,
                    code: true,
                    password: true,
                    role: true,
                    total: true,
                    average: true,
                    school: {
                        select: { name: true },
                    },
                    result: {
                        select: {
                            grade: true,
                            subject: {
                                select: {
                                    name: true,
                                    createdAt: true,
                                },
                            },
                        },
                    },
                },
            });
            if (!student) {
                throw new common_1.NotFoundException('Student with this roll number does not exist.');
            }
            const isMatch = await bcrypt.compare(password, student.password);
            if (!isMatch) {
                throw new common_1.NotAcceptableException('Invalid RollNo or Password');
            }
            const payload = { userId: student.id, role: student.role };
            const token = this.jwtService.sign(payload);
            delete student.password;
            return {
                message: 'Student data',
                data: student,
                token,
            };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
    async updateStudent(id, name, password, code) {
        const student = await this.prisma.student.findUnique({
            where: { id },
        });
        if (!student) {
            throw new common_1.NotFoundException('Student not found with the given ID');
        }
        if (password) {
            password = await bcrypt.hash(password, 10);
        }
        const updatingData = {};
        if (name)
            updatingData.name = name;
        if (password)
            updatingData.name = password;
        if (code)
            updatingData.name = code;
        const updatedStudent = await this.prisma.student.update({
            where: { id },
            data: updatingData,
        });
        return {
            message: 'Student updated successfully',
            data: {
                id: updatedStudent.id,
                name: updatedStudent.name,
                code: updatedStudent.code,
            },
        };
    }
    async deleteStudent(id) {
        const student = await this.prisma.student.findUnique({
            where: { id: id },
        });
        if (!student) {
            throw new common_1.NotFoundException('This student does not exist. Or already deleted');
        }
        const deleteStudent = await this.prisma.student.delete({
            where: { id: id },
        });
        return {
            message: `successfully deleted ${deleteStudent.name}`,
        };
    }
};
exports.StudentService = StudentService;
exports.StudentService = StudentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], StudentService);
//# sourceMappingURL=student.service.js.map