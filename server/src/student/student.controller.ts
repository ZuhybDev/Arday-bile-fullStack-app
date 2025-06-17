import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/jwt/roles/roles.decorator';
import { RolesGuard } from 'src/jwt/roles/roles.guard';
import { StudentService } from './student.service';

//intialize
@Controller('student')
export class StudentController {
  constructor(private studentService: StudentService) {}

  //register student
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  @Post('register')
  createStudent(
    @Body()
    body: {
      name: string;
      password: string;
      schoolId: string;
      className: string;
    },
    @Req() req,
  ) {
    const { name, password, schoolId, className } = body;
    return this.studentService.createStudent(
      req.user,
      name,
      password,
      className,
      schoolId,
    );
  }

  //login student
  @Post('login')
  loginStudent(@Body() body: { code: string; password: string }) {
    const { code, password } = body;
    return this.studentService.loginStudent(code, password);
  }

  //update student
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  @Patch('update/:id')
  updateStudent(
    @Param('id') id: string,
    @Body()
    body: {
      name: string;
      password: string;
      code: string;
    },
    @Req() req,
  ) {
    return this.studentService.updateStudent(
      req.user,
      id,
      body.name,
      body.password,
      body.code,
    );
  }

  // find one student data
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  @Get('student-data/:id')
  studentData(@Param('id') id: string, @Req() req) {
    return this.studentService.findOneStudent(req.user, id);
  }

  // delete student route
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  @Delete('delete/:id')
  deleteStudent(@Param('id') id: string, @Req() req) {
    return this.studentService.deleteStudent(req.user, id);
  }
}
