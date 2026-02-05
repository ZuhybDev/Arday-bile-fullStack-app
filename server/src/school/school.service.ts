import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtPayload } from 'src/jwt/jwt.strategy';
import { PrismaService } from 'src/prisma/prisma.service';

// Explanation
/**
 * if you are @NEW to a @NESTJS read this
 * @JwtPaylaod it checking if the @ADMIN doesnt eqaul to @schoolId that he provides
 * we add the in the @JWT for the @schoolId so if he doesnt graps the @ID it throws an Error
 */

@Injectable()
export class SchoolService {
  constructor(private readonly prisma: PrismaService) {}

  async registerSchools(data: { name: string }) {
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

  // update

  async updateSchool(user: JwtPayload, id: string, newName?: string) {
    if (!newName || newName.trim() === '') {
      throw new BadRequestException('New name is required');
    }

    const school = await this.prisma.school.findUnique({
      where: { id },
    });

    if (!school) {
      throw new NotFoundException('not foud. Try again'); // Not found
    }

    // ⛔️ Only allow update if this is their school
    if (user.schoolId !== school.id) {
      throw new ForbiddenException('Access denied');
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

  // get all schools only admins and debuging purpose

  async readSchoolData(user: JwtPayload) {
    const schoolData = await this.prisma.school.findUnique({
      where: { id: user.schoolId },
      select: {
        id: true,
        name: true,
        createdAt: true,
      },
    });

    if (!schoolData) {
      throw new NotFoundException('School does not Exist. Try again');
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
        id: true, // Only fetch the IDs to keep the query fast
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
          gte: 50, // "Greater Than or Equal" to 50
        },
      },
    });

    if (user.schoolId !== schoolData.id) {
      throw new ForbiddenException('Access denied');
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

  // delete statement

  async deletedSchool(id: string, user: JwtPayload) {
    const existingSchool = await this.prisma.school.findUnique({
      where: { id: id },
    });
    // chech if school exist
    if (!existingSchool) {
      throw new NotFoundException('Not foud. Try again');
    }

    //only school's admin can delete
    if (user.schoolId !== existingSchool.id) {
      throw new ForbiddenException('Access denied');
    }
    // delete if admin it allowed and it exist
    const deletedSchool = await this.prisma.school.delete({
      where: { id: id },
    });

    return {
      message: `Successfully deleted ${deletedSchool.name}`,
    };
  }
}
