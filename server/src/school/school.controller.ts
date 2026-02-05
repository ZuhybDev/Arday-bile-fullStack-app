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
import { SchoolService } from './school.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/jwt/roles/roles.guard';
import { Roles } from 'src/jwt/roles/roles.decorator';

@Controller('school')
export class SchoolController {
  constructor(private schoolservice: SchoolService) {}

  // explanation
  /**
   * @RolesGuard comes from  this folder src/jwt/roles/roles.guard';
   * @Roles  trigers if the role does not eqaul to @ADMIN throws an Error
   * @AuthGuard
   */

  @Post('register')
  register(@Body() body: { name: string }) {
    return this.schoolservice.registerSchools(body);
  }
  // update school
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  @Patch('update/:id')
  update(@Param('id') id: string, @Body() body: { name: string }, @Req() req) {
    return this.schoolservice.updateSchool(req.user, id, body.name);
  }

  // read school data
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  @Get('school-data/')
  readschoolData(@Req() req) {
    return this.schoolservice.readSchoolData(req.user);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  @Delete('delete/:id')
  delete(@Param('id') id: string, @Req() req) {
    return this.schoolservice.deletedSchool(id, req.user);
  }
}
