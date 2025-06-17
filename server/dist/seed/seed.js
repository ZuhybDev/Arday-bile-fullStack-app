"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const student_code_generator_1 = require("../common/lib/student.code.generator");
const grade_utilis_1 = require("../common/utils/grade.utilis");
const prisma = new client_1.PrismaClient();
const code = (0, student_code_generator_1.studentCodeGenerator)();
async function main() {
    const school = await prisma.school.create({
        data: {
            name: 'Arday High School',
        },
    });
    const admin = await prisma.admin.create({
        data: {
            name: 'Admin User',
            email: 'admin@arday.com',
            password: 'hashed_password_here',
            schoolId: school.id,
        },
    });
    const students = await prisma.student.createMany({
        data: [
            {
                name: 'Ali Mahdi',
                code: code,
                password: 'pass123',
                class: 'Form 1',
                schoolId: school.id,
            },
            {
                name: 'Fatima Noor',
                code: code,
                password: 'pass123',
                class: 'Form 1',
                schoolId: school.id,
            },
        ],
    });
    const math = await prisma.subject.create({
        data: {
            name: 'Mathematics',
            passMark: 40,
            schoolId: school.id,
        },
    });
    const science = await prisma.subject.create({
        data: {
            name: 'Science',
            passMark: 50,
            schoolId: school.id,
        },
    });
    const ali = await prisma.student.findUnique({ where: { code: 'STD001' } });
    const fatima = await prisma.student.findUnique({ where: { code: 'STD002' } });
    if (ali && fatima) {
        await prisma.result.createMany({
            data: [
                {
                    studentId: ali.id,
                    subjectId: math.id,
                    grade: 38,
                    status: (0, grade_utilis_1.calculationLetterGrade)(38, math.passMark),
                },
                {
                    studentId: fatima.id,
                    subjectId: math.id,
                    grade: 45,
                    status: (0, grade_utilis_1.calculationLetterGrade)(45, math.passMark),
                },
                {
                    studentId: ali.id,
                    subjectId: science.id,
                    grade: 52,
                    status: (0, grade_utilis_1.calculationLetterGrade)(52, science.passMark),
                },
                {
                    studentId: fatima.id,
                    subjectId: science.id,
                    grade: 25,
                    status: (0, grade_utilis_1.calculationLetterGrade)(25, science.passMark),
                },
            ],
        });
    }
}
main()
    .then(() => {
    console.log('🌱 Seed complete.');
    return prisma.$disconnect();
})
    .catch((e) => {
    console.error('❌ Seed failed:', e);
    return prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map