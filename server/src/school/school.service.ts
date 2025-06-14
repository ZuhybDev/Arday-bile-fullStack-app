import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

// jwt-payload.interface.ts
export interface JwtPayload {
  schoolId: string;
}

@Injectable()
export class SchoolService {
  constructor(private readonly prisma: PrismaService) {}

  async registerSchools(data: { name: string }) {
    const registerSchool = await this.prisma.school.create({
      data,
    });
    return {
      message: `School-ka "${registerSchool.name}" waa la abuuray`,
      id: registerSchool.id,
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

  async readSchoolData(user: JwtPayload, id: string) {
    const schoolData = await this.prisma.school.findUnique({
      where: { id },
    });

    if (!schoolData) {
      throw new NotFoundException();
    }

    if (user.schoolId !== schoolData.id) return schoolData;
  }

  // delete statement

  async deletedSchool(id: string) {
    try {
      const existingSchool = await this.prisma.school.findUnique({
        where: { id: id },
      });

      if (!existingSchool) {
        throw new NotFoundException('Not foud. Try again');
      }

      return this.prisma.school.delete({
        where: { id: id },
      });
    } catch (error: any) {
      return {
        message: `Interal error ${error}`,
      };
    }
  }
}
