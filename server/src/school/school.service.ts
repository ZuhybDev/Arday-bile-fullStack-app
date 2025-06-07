import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SchoolService {
  constructor(private prisma: PrismaService) {}

  //create a school
  async createSchool(data: { name: string }) {
    const school = await this.prisma.school.create({
      data,
    });
    return {
      message: `${school.name} waa la abuuray`,
      school: school,
    };
  }

  // update a school

  async updateSchool(id: string, name: string) {
    const updatedSchool = await this.prisma.school.update({
      where: { id },
      data: {
        name,
      },
    });
    return {
      message: 'Waad ku guulaysatay inaad wax ka badasho',
      school_data: updatedSchool,
    };
  }

  // only admins for get all the school data
  async getAllSchools() {
    const schols = await this.prisma.school.findMany({});

    return schols;
  }

  async deleteSchool(id: string) {
    const deletedSchool = await this.prisma.school.delete({
      where: { id },
    });

    if (!deletedSchool)
      return {
        message: 'Hore ayaa loo tirtiray',
      };
    else
      return {
        message: `waad ku guulaysatay inaad saarto (${deletedSchool.name})`,
      };
  }
}
