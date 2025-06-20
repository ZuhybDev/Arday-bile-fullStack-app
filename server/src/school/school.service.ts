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
      message: `"${registerSchool.name} " created successfully`,
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
      throw new NotFoundException('School does not Exist. Try again');
    }

    const schoolAdmins = await this.prisma.admin.findMany({
      select: {
        name: true,
      },
    });

    const admins = schoolAdmins.map((a) => a.name);

    if (user.schoolId !== schoolData.id) {
      throw new ForbiddenException('Access deneid');
    }

    return {
      message: `${schoolData.name} Data`,
      schoolData,
      admins,
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
