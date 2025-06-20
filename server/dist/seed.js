"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculationLetterGrade = exports.studentCodeGenerator = void 0;
const client_1 = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new client_1.PrismaClient();
const studentCodeGenerator = () => Math.floor(1000 * Math.random() + 5000).toString();
exports.studentCodeGenerator = studentCodeGenerator;
const calculationLetterGrade = (grade, passMark) => {
    const percentBoundaries = {
        A: passMark,
        B: passMark * 0.8,
        C: passMark * 0.6,
        D: passMark * 0.5,
    };
    if (grade >= percentBoundaries.A)
        return 'A';
    if (grade >= percentBoundaries.B)
        return 'B';
    if (grade >= percentBoundaries.C)
        return 'C';
    if (grade >= percentBoundaries.D)
        return 'D';
    return 'F';
};
exports.calculationLetterGrade = calculationLetterGrade;
async function main() {
    const password = '';
    const hashedPassword = await bcrypt.hash(password, 10);
    const school = await prisma.school.create({
        data: {
            name: 'Arday-bile High School',
        },
    });
    const admin = await prisma.admin.create({
        data: {
            name: 'Admin User',
            email: 'admin@arday.com',
            password: hashedPassword,
            schoolId: school.id,
        },
    });
    const students = await prisma.student.createMany({
        data: [
            {
                name: 'Ali Mahdi',
                code: (0, exports.studentCodeGenerator)(),
                password: hashedPassword,
                class: 'Form 1',
                schoolId: school.id,
            },
            {
                name: 'Fatima Noor',
                code: (0, exports.studentCodeGenerator)(),
                password: hashedPassword,
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
                    status: (0, exports.calculationLetterGrade)(38, math.passMark),
                },
                {
                    studentId: fatima.id,
                    subjectId: math.id,
                    grade: 45,
                    status: (0, exports.calculationLetterGrade)(45, math.passMark),
                },
                {
                    studentId: ali.id,
                    subjectId: science.id,
                    grade: 52,
                    status: (0, exports.calculationLetterGrade)(52, science.passMark),
                },
                {
                    studentId: fatima.id,
                    subjectId: science.id,
                    grade: 25,
                    status: (0, exports.calculationLetterGrade)(25, science.passMark),
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