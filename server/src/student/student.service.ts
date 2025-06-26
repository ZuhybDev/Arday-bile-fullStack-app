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
import { Response } from 'express';
import { use } from 'passport';
import { studentCodeGenerator } from 'src/common/lib/student.code.generator';
import { getMostFrequentyLetter } from 'src/common/utils/getMostFrequentyLetter';
import { calculationLetterGrade } from 'src/common/utils/grade.utilis';
import { calculateTotalAndAverage } from 'src/common/utils/totalAndAverage';
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
        role: student.role,
        created: student.createdAt,
      };
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // student login with jwt for 8 minutes only
  async loginStudent(code: string, password: string, res: Response) {
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
          school: {
            select: { name: true },
          },
        },
      });

      if (!student) {
        throw new NotFoundException(
          'Student with this roll number does not exist.',
        );
      }

      // calculate total and average of the student
      const result = await this.prisma.result.findMany({
        where: { studentId: student.id },
        select: {
          grade: true,
          status: true,
          subject: {
            select: {
              passMark: true,
              name: true,
            },
          },
        },
      });

      // get most frequency letterStatus

      const letterStatus = result.map((r) => r.status);
      const priorityGrade = getMostFrequentyLetter(letterStatus);

      //calculate total and grade function
      const grade = result.map((r) => r.grade);
      const { total, average } = calculateTotalAndAverage(grade);

      // calculate Letter of the subject based on the passMark
      const formattedResult = result.map((r) => ({
        name: r.subject.name,
        grade: r.grade,
        status: calculationLetterGrade(r.grade, r.subject.passMark),
      }));

      const isMatch = await bcrypt.compare(password, student.password);
      if (!isMatch) {
        throw new NotAcceptableException('Invalid RollNo or Password');
      }

      // Generate JWT token
      const payload = { userId: student.id, role: student.role };
      const token = this.jwtService.sign(payload);

      res.cookie('token', token, {
        httpOnly: true, // ⚡️ Can't be accessed by JS (protects from XSS)
        secure: process.env.NODE_ENV === 'production', // ⚡️ HTTPS only in prod
        sameSite: 'lax', // prevents CSRF, but allows top-level navigation
        maxAge: 8 * 60 * 1000, // 1 day expiry
        path: '/', // cookie available on all routes
      });
      // Remove password before sending response
      delete (student as any).password;

      return {
        message: 'Student data',
        student,
        formattedResult,
        total,
        average,
        grade: priorityGrade,
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
        schoolId: true,
        role: true,
        school: {
          select: { name: true },
        },
      },
    });

    if (!student) {
      throw new NotFoundException('Not found. Try again');
    }

    // fetch the result to to calculate grade and average also overall grade
    const result = await this.prisma.result.findMany({
      select: {
        grade: true,
        status: true,
        subject: {
          select: {
            name: true,
            passMark: true,
          },
        },
      },
    });

    // calculate the average and total
    const grade = result.map((g) => g.grade);
    const { total, average } = calculateTotalAndAverage(grade);

    // calculate the frequency letterStatus and get it using this seprate func
    const letterStatus = result.map((s) => s.status);
    const priorityGrade = getMostFrequentyLetter(letterStatus);

    // we make it readable so we are making it pretty 😎

    const formattedResult = result.map((res) => ({
      name: res.subject.name,
      grade: res.grade,
      status: calculationLetterGrade(res.grade, res.subject.passMark),
    }));

    if (student.schoolId != user.schoolId) {
      throw new ForbiddenException('Access denied');
    }
    return {
      student,
      formattedResult,
      grade: priorityGrade,
    };
  }

  // find all student of the school by school Id
  async findAllStudent(schoolId: string, user: JwtPayload) {
    if (user.schoolId !== schoolId) {
      throw new ForbiddenException('Access denied');
    }

    const students = await this.prisma.student.findMany({
      where: { schoolId },
      select: {
        id: true,
        code: true,
        name: true,
        class: true,
        result: {
          select: {
            grade: true,
            status: true,
            subject: {
              select: {
                name: true,
                passMark: true,
              },
            },
          },
        },
      },
    });

    if (students.length === 0) {
      return [];
    }

    return students.map((student) => {
      const formattedResult = student.result.map((res) => ({
        subject: res.subject.name,
        grade: res.grade,
        status: calculationLetterGrade(res.grade, res.subject.passMark),
      }));

      const numericGrades = student.result.map((r) => r.grade).filter(Boolean);
      const { total, average } = calculateTotalAndAverage(numericGrades);

      const letterStatuses = student.result.map((r) => r.status);
      const overallGrade = getMostFrequentyLetter(letterStatuses);

      return {
        id: student.id,
        code: student.code,
        name: student.name,
        class: student.class,
        average,
        overallGrade: overallGrade ?? 'N/A',
        grades: formattedResult,
      };
    });
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
