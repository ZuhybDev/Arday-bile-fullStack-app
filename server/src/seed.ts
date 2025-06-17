import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const studentCodeGenerator = () =>
  Math.floor(1000 * Math.random() + 5000).toString();

export const calculationLetterGrade = (
  grade: number,
  passMark: number,
): string => {
  const percentBoundaries = {
    A: passMark,
    B: passMark * 0.8,
    C: passMark * 0.6,
    D: passMark * 0.5,
  };
  if (grade >= percentBoundaries.A) return 'A';
  if (grade >= percentBoundaries.B) return 'B';
  if (grade >= percentBoundaries.C) return 'C';
  if (grade >= percentBoundaries.D) return 'D';

  return 'F';
};

// const code = studentCodeGenerator();

async function main() {
  const password = '';

  const hashedPassword = await bcrypt.hash(password, 10);
  // Create school
  const school = await prisma.school.create({
    data: {
      name: 'Arday-bile High School',
    },
  });

  // Create admin
  const admin = await prisma.admin.create({
    data: {
      name: 'Admin User',
      email: 'admin@arday.com',
      password: hashedPassword,
      schoolId: school.id,
    },
  });

  // Create students
  const students = await prisma.student.createMany({
    data: [
      {
        name: 'Ali Mahdi',
        code: studentCodeGenerator(),
        password: hashedPassword,
        class: 'Form 1',
        schoolId: school.id,
      },
      {
        name: 'Fatima Noor',
        code: studentCodeGenerator(),
        password: hashedPassword,
        class: 'Form 1',
        schoolId: school.id,
      },
    ],
  });

  // Create subjects
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

  // Fetch the students by code
  const ali = await prisma.student.findUnique({ where: { code: 'STD001' } });
  const fatima = await prisma.student.findUnique({ where: { code: 'STD002' } });

  // Insert results with status using calculateLetterGrade
  if (ali && fatima) {
    await prisma.result.createMany({
      data: [
        {
          studentId: ali.id,
          subjectId: math.id,
          grade: 38,
          status: calculationLetterGrade(38, math.passMark),
        },
        {
          studentId: fatima.id,
          subjectId: math.id,
          grade: 45,
          status: calculationLetterGrade(45, math.passMark),
        },
        {
          studentId: ali.id,
          subjectId: science.id,
          grade: 52,
          status: calculationLetterGrade(52, science.passMark),
        },
        {
          studentId: fatima.id,
          subjectId: science.id,
          grade: 25,
          status: calculationLetterGrade(25, science.passMark),
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
