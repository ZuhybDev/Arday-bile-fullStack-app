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
const getMostFrequentyLetter_1 = require("../common/utils/getMostFrequentyLetter");
const grade_utilis_1 = require("../common/utils/grade.utilis");
const totalAndAverage_1 = require("../common/utils/totalAndAverage");
const prisma_service_1 = require("../prisma/prisma.service");
let StudentService = class StudentService {
    prisma;
    jwtService;
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async createStudent(user, name, password, className, schoolId) {
        try {
            if (!name || !password || !schoolId) {
                throw new common_1.NotAcceptableException('Please fill in all required fields');
            }
            if (schoolId != user.schoolId) {
                throw new common_1.ForbiddenException('Acess denied');
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const studentCode = (0, student_code_generator_1.studentCodeGenerator)();
            const student = await this.prisma.student.create({
                data: {
                    name,
                    password: hashedPassword,
                    code: studentCode,
                    schoolId,
                    className: className,
                },
            });
            return {
                message: `Student ${student.name} is created successfully`,
                id: student.id,
                name: student.name,
                roll_no: student.code,
                class: student.className,
                schoolId: student.schoolId,
                role: student.role,
                created: student.createdAt,
            };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
    async loginStudent(code, password, res) {
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
                    school: {
                        select: { name: true },
                    },
                },
            });
            if (!student) {
                throw new common_1.NotFoundException('Student with this roll number does not exist.');
            }
            const result = await this.prisma.result.findMany({
                where: { studentId: student.id },
                select: {
                    grade: true,
                    status: true,
                    subject: {
                        select: {
                            passMark: true,
                            name: true,
                        },
                    },
                },
            });
            const letterStatus = result.map((r) => r.status);
            const priorityGrade = (0, getMostFrequentyLetter_1.getMostFrequentyLetter)(letterStatus);
            const grade = result.map((r) => r.grade);
            const { total, average } = (0, totalAndAverage_1.calculateTotalAndAverage)(grade);
            const formattedResult = result.map((r) => ({
                name: r.subject.name,
                grade: r.grade,
                status: (0, grade_utilis_1.calculationLetterGrade)(r.grade, r.subject.passMark),
            }));
            const isMatch = await bcrypt.compare(password, student.password);
            if (!isMatch) {
                throw new common_1.NotAcceptableException('Invalid RollNo or Password');
            }
            const payload = { userId: student.id, role: student.role };
            const token = this.jwtService.sign(payload);
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 8 * 60 * 1000,
                path: '/',
            });
            delete student.password;
            return {
                message: 'Student data',
                student,
                formattedResult,
                total,
                average,
                grade: priorityGrade,
            };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
    async updateStudent(user, id, name, password, className) {
        const student = await this.prisma.student.findUnique({
            where: { id },
        });
        if (!student) {
            throw new common_1.NotFoundException('Student not found with the given ID');
        }
        if (student.schoolId != user.schoolId) {
            throw new common_1.ForbiddenException('Access denied');
        }
        const updatingData = {};
        if (name)
            updatingData.name = name;
        if (password)
            updatingData.password = await bcrypt.hash(password, 10);
        if (className)
            updatingData.className = className;
        const updatedStudent = await this.prisma.student.update({
            where: { id },
            data: updatingData,
        });
        return {
            message: 'Student updated successfully',
            data: {
                id: updatedStudent.id,
                name: updatedStudent.name,
                class: updatedStudent.className,
            },
        };
    }
    async findOneStudent(user, id) {
        const student = await this.prisma.student.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                code: true,
                className: true,
                schoolId: true,
                role: true,
                school: {
                    select: { name: true },
                },
            },
        });
        if (!student) {
            throw new common_1.NotFoundException('Not found. Try again');
        }
        const result = await this.prisma.result.findMany({
            select: {
                grade: true,
                status: true,
                subject: {
                    select: {
                        name: true,
                        passMark: true,
                    },
                },
            },
        });
        const grade = result.map((g) => g.grade);
        const { total, average } = (0, totalAndAverage_1.calculateTotalAndAverage)(grade);
        const letterStatus = result.map((s) => s.status);
        const priorityGrade = (0, getMostFrequentyLetter_1.getMostFrequentyLetter)(letterStatus);
        const formattedResult = result.map((res) => ({
            name: res.subject.name,
            grade: res.grade,
            status: (0, grade_utilis_1.calculationLetterGrade)(res.grade, res.subject.passMark),
        }));
        if (student.schoolId != user.schoolId) {
            throw new common_1.ForbiddenException('Access denied');
        }
        return {
            student,
            formattedResult,
            grade: priorityGrade,
            total,
            average,
        };
    }
    async findAllStudent(schoolId, user) {
        if (user.schoolId !== schoolId) {
            throw new common_1.ForbiddenException('Access denied');
        }
        const students = await this.prisma.student.findMany({
            where: { schoolId },
            select: {
                id: true,
                code: true,
                name: true,
                className: true,
                result: {
                    select: {
                        grade: true,
                        status: true,
                        subject: {
                            select: {
                                name: true,
                                passMark: true,
                            },
                        },
                    },
                },
            },
        });
        if (students.length === 0) {
            return [];
        }
        return students.map((student) => {
            const formattedResult = student.result.map((res) => ({
                subject: res.subject.name,
                grade: res.grade,
                status: (0, grade_utilis_1.calculationLetterGrade)(res.grade, res.subject.passMark),
            }));
            const numericGrades = student.result.map((r) => r.grade).filter(Boolean);
            const { total, average } = (0, totalAndAverage_1.calculateTotalAndAverage)(numericGrades);
            const letterStatuses = student.result.map((r) => r.status);
            const overallGrade = (0, getMostFrequentyLetter_1.getMostFrequentyLetter)(letterStatuses);
            return {
                id: student.id,
                code: student.code,
                name: student.name,
                class: student.className,
                average,
                overallGrade: overallGrade ?? 'N/A',
                grades: formattedResult,
            };
        });
    }
    async searchStudentByName(user, name) {
        const students = await this.prisma.student.findMany({
            where: { name: { contains: name } },
            select: {
                id: true,
                code: true,
                name: true,
                className: true,
                schoolId: true,
                school: { select: { name: true } },
            },
        });
        const studentsInSchool = students.filter((student) => student.schoolId === user.schoolId && student.name.includes(name));
        if (studentsInSchool.length === 0) {
            throw new common_1.NotFoundException('No students found in this name creteria');
        }
        return studentsInSchool.map((student) => ({
            id: student.id,
            code: student.code,
            name: student.name,
            class: student.className,
            schoolId: student.schoolId,
            schoolName: student.school.name,
        }));
    }
    async deleteStudent(user, id) {
        const student = await this.prisma.student.findUnique({
            where: { id: id },
        });
        if (!student) {
            throw new common_1.NotFoundException('This student does not exist. Or already deleted');
        }
        if (student.schoolId != user.schoolId) {
            throw new common_1.ForbiddenException('Access denied');
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