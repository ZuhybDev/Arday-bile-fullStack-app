import {
  ForbiddenException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { calculationLetterGrade } from 'src/common/utils/grade.utilis';
import { JwtPayload } from 'src/jwt/jwt.strategy';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ResultService {
  constructor(private readonly prisma: PrismaService) {}

  async createResult(
    user: JwtPayload,
    grade: number,
    subjectId: string,
    studentId: string,
  ) {
    // Fetch the subject's passMark, name, and schoolId
    const subject = await this.prisma.subject.findUnique({
      where: { id: subjectId },
      select: {
        passMark: true,
        name: true,
        schoolId: true,
      },
    });

    if (!subject) {
      throw new NotFoundException('Subject does not exist. Try again');
    }

    // Reject if the grade exceeds the pass mark
    if (grade > subject.passMark) {
      throw new NotAcceptableException(
        'Grade must be equal to or less than the pass mark',
      );
    }

    // Deny access if admin and subject are from different schools
    if (user.schoolId !== subject.schoolId) {
      throw new ForbiddenException('Access denied');
    }

    // Calculate letter grade
    const letter = calculationLetterGrade(grade, subject.passMark);

    // 🔁 Upsert: update if exists, otherwise create
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

  async clearResult(resultId: string) {
    const result = await this.prisma.result.delete({
      where: { id: resultId },
    });

    if (!result) {
      throw new NotFoundException('Not found does not exist');
    }
    return {
      message: 'successfully deleted',
    };
  }
}
