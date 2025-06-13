import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/jwt/roles/roles.decorator';
import { RolesGuard } from 'src/jwt/roles/roles.guard';
import { StudentService } from './student.service';

//intialize
interface StudentDto {
  name: string;
  password: string;
  schoolId: string;
}
@Controller('student')
export class StudentController {
  constructor(private studentService: StudentService) {}

  //register student
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  @Post('register')
  createStudent(
    @Body() body: { name: string; password: string; schoolId: string },
  ) {
    const { name, password, schoolId } = body;
    return this.studentService.createStudent(name, password, schoolId);
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
  ) {
    return this.studentService.updateStudent(
      id,
      body.name,
      body.password,
      body.code,
    );
  }

  // delete student route

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  @Delete('delete/:id')
  deleteStudent(@Param('id') id: string) {
    return this.studentService.deleteStudent(id);
  }
}
