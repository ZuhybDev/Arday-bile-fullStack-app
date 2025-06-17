import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
// import bcrypt from 'bcrypt';
import * as bcrypt from 'bcrypt';
import { use } from 'passport';
import { studentCodeGenerator } from 'src/common/lib/student.code.generator';
import { JwtPayload } from 'src/jwt/jwt.strategy';

//yours
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StudentService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async createStudent(
    user: JwtPayload,
    name: string,
    password: string,
    className: string,
    schoolId: string,
  ) {
    try {
      //create student name others and code
      //preven nulls
      if (!name || !password || !schoolId) {
        throw new NotAcceptableException('Please fill in all required fields');
      }

      if (schoolId != user.schoolId) {
        throw new ForbiddenException('Acess denied');
      }

      //code and hash
      const hashedPassword = await bcrypt.hash(password, 10);

      const studentCode = studentCodeGenerator();

      const student = await this.prisma.student.create({
        data: {
          name,
          password: hashedPassword,
          code: studentCode,
          schoolId,
          class: className,
        },
      });
      return {
        message: `Student ${student.name} is created successfully`,
        id: student.id,
        name: student.name,
        roll_no: student.code,
        class: student.class,
        schoolId: student.schoolId,
        total: student.total,
        average: student.average,
        role: student.role,
        created: student.createdAt,
      };
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // student login with jwt for 8 minutes only

  async loginStudent(code: string, password: string) {
    try {
      if (!code || !password) {
        throw new NotAcceptableException('Please fill in all required fields');
      }

      // ONE single query with all needed fields
      const student = await this.prisma.student.findUnique({
        where: { code },
        select: {
          id: true,
          name: true,
          code: true,
          password: true,
          role: true,
          total: true,
          average: true,
          school: {
            select: { name: true },
          },
          result: {
            select: {
              grade: true,
              subject: {
                select: {
                  name: true,
                  createdAt: true,
                },
              },
            },
          },
        },
      });

      if (!student) {
        throw new NotFoundException(
          'Student with this roll number does not exist.',
        );
      }

      const isMatch = await bcrypt.compare(password, student.password);

      if (!isMatch) {
        throw new NotAcceptableException('Invalid RollNo or Password');
      }

      // Generate JWT token
      const payload = { userId: student.id, role: student.role };
      const token = this.jwtService.sign(payload);

      // Remove password before sending response
      delete (student as any).password;

      return {
        message: 'Student data',
        data: student,
        token,
      };
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // edit student
  async updateStudent(
    user: JwtPayload,
    id: string,
    name?: string,
    password?: string,
    code?: string,
  ) {
    const student = await this.prisma.student.findUnique({
      where: { id },
    });

    if (!student) {
      throw new NotFoundException('Student not found with the given ID');
    }

    /**
     * chech if @Admin schoolId in the jwt are same to the student schoolId if doesnt throw an Error
     */

    if (student.schoolId != user.schoolId) {
      throw new ForbiddenException('Access denied');
    }

    //handle it sepratle its challenge when  it comes to beginner

    const updatingData: any = {};

    if (name) updatingData.name = name;
    if (password) updatingData.password = await bcrypt.hash(password, 10);
    if (code) updatingData.name = code;

    const updatedStudent = await this.prisma.student.update({
      where: { id },
      data: updatingData,
    });

    return {
      message: 'Student updated successfully',
      data: {
        id: updatedStudent.id,
        name: updatedStudent.name,
        code: updatedStudent.code,
      },
    };
  }

  // get single student data

  async findOneStudent(user: JwtPayload, id: string) {
    const student = await this.prisma.student.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        code: true,
        role: true,
        total: true,
        average: true,
        schoolId: true,
        school: {
          select: { name: true },
        },

        result: {
          select: {
            grade: true,
            subject: {
              select: {
                name: true,
                createdAt: true,
              },
            },
          },
        },
      },
    });

    if (!student) {
      throw new NotFoundException('Not found. Try again');
    }

    if (student.schoolId != user.schoolId) {
      throw new ForbiddenException('Access denied');
    }

    return {
      student,
    };
  }

  // find all student of the school by school Id

  async findAllStudent(schoolId: string, user: JwtPayload) {
    const students = await this.prisma.student.findMany({
      where: { schoolId },
      select: {
        code: true,
        name: true,
      },
    });

    if (!students) {
      throw new NotFoundException('Not found. Try again');
    }
  }

  // delete student their ID in the param

  async deleteStudent(user: JwtPayload, id: string) {
    const student = await this.prisma.student.findUnique({
      where: { id: id },
    });

    if (!student) {
      throw new NotFoundException(
        'This student does not exist. Or already deleted',
      );
    }

    if (student.schoolId != user.schoolId) {
      throw new ForbiddenException('Access denied');
    }

    const deleteStudent = await this.prisma.student.delete({
      where: { id: id },
    });

    return {
      message: `successfully deleted ${deleteStudent.name}`,
    };
  }
}
