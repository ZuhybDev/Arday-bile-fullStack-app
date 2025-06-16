import {
  ForbiddenException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { JwtPayload } from 'src/jwt/jwt.strategy';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SubjectsService {
  constructor(private prisma: PrismaService) {}

  //create subjects
  async createSubject(
    user: JwtPayload,
    name: string,
    passMark: number,
    schoolId: string,
  ) {
    //preven nulls
    if (!name || !schoolId || !passMark) {
      throw new NotAcceptableException('Please fill in all required fields');
    }
    // console.log(user.schoolId);
    if (schoolId != user.schoolId) {
      throw new ForbiddenException('Access denied');
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
  // find all subject
  async findAllSubjects(schoolId: string, user: JwtPayload) {
    // prevent nulls
    if (!schoolId) {
      throw new ForbiddenException('Invalid or missing school ID');
    }
    const allsubjects = await this.prisma.subject.findMany({
      where: { schoolId },
    });

    if (!allsubjects || allsubjects.length == 0) {
      throw new NotFoundException('No subjects found for this school.');
    }

    if (schoolId != user.schoolId) {
      throw new ForbiddenException('Access denied');
    }

    return {
      cound: allsubjects.length,
      allsubjects,
    };
  }

  async findOneSubject(id: string, user: JwtPayload) {
    const subject = await this.prisma.subject.findUnique({
      where: { id },
    });

    if (!subject) {
      throw new NotFoundException('Not found. Try again');
    }
    if (user.schoolId != subject.schoolId) {
      throw new ForbiddenException('Access denied');
    }

    return {
      subject,
    };
  }

  async updateSubject(
    user: JwtPayload,
    id: string,
    name?: string,
    passMark?: number,
  ) {
    const subject = await this.prisma.subject.findUnique({
      where: { id },
    });

    if (!subject) {
      throw new NotFoundException('Not found.Try again');
    }

    if (subject.schoolId != user.schoolId) {
      throw new ForbiddenException('Access denied');
    }

    const updatingData: any = {};

    if (name) updatingData.name = name;
    if (passMark) updatingData.passMark = passMark;

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

  async removeSubject(id: string, user: JwtPayload) {
    const subject = await this.prisma.subject.delete({
      where: { id },
    });

    if (!subject) {
      throw new NotFoundException('Not found or already deleted. Try again');
    }

    if (user.schoolId != subject.schoolId) {
      throw new ForbiddenException('Access deneid');
    }

    return {
      message: `${subject.name} successfully deleted.`,
    };
  }
}
