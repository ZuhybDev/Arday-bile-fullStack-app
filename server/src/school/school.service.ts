import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

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

  async updateSchool(id: string, newName?: string) {
    const school = await this.prisma.school.findUnique({
      where: { id },
    });

    if (!school) {
      throw new NotFoundException('not foud. Try again'); // Not found
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

  async readSchoolData() {
    const schoolData = await this.prisma.school.findMany();

    return schoolData;
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
