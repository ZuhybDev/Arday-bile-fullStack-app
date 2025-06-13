import {
  Injectable,
  InternalServerErrorException,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
// import bcrypt from 'bcrypt';
import * as bcrypt from 'bcrypt';
import { studentCodeGenerator } from 'src/common/lib/student.code.generator';

//yours
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StudentService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async createStudent(name: string, password: string, schoolId: string) {
    try {
      //create student name others and code

      //preven nulls
      if (!name || !password || !schoolId) {
        throw new NotAcceptableException('Please fill in all required fields');
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
        },
      });

      // move to login please
      // const payload = { userId: student.id, role: student.role };

      // const token = this.jwtService.sign(payload);

      return {
        message: `Student ${student.name} is created successfully`,
        id: student.id,
        name: student.name,
        roll_no: student.code,
        schoolId: student.schoolId,
        total: student.total,
        average: student.average,
        role: student.role,
        created: student.createdAt,
      };
    } catch (error: any) {
      return error.message;
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
          password: true, // needed for comparison, but removed later
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

    //handle it sepratle its challenge when  it comes to beginner
    if (password) {
      password = await bcrypt.hash(password, 10);
    }

    const updatedStudent = await this.prisma.student.update({
      where: { id },
      data: {
        name: name,
        password: password,
        code: code,
      },
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

  // delete student their ID in the param

  async deleteStudent(id: string) {
    const student = await this.prisma.student.findUnique({
      where: { id: id },
    });

    if (!student) {
      throw new NotFoundException(
        'This student does not exist. Or already deleted',
      );
    }

    const deleteStudent = await this.prisma.student.delete({
      where: { id: id },
    });

    return {
      messasge: `successfully deleted ${deleteStudent.name}`,
    };
  }
}
