import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/jwt/roles/roles.guard';
import { Roles } from 'src/jwt/roles/roles.decorator';

@Controller('subjects')
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  //create subject
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  @Post('register')
  create(
    @Body() body: { name: string; passMark: number; schoolId: string },
    @Req() req,
  ) {
    const { name, passMark, schoolId } = body;
    return this.subjectsService.createSubject(
      req.user,
      name,
      passMark,
      schoolId,
    );
  }

  // get all subject by schoolID
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  @Get('subject-data/:id')
  findAllSubjects(@Param('id') id: string, @Req() req) {
    return this.subjectsService.findAllSubjects(id, req.user);
  }
  // get One subject by its id
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  @Get('subject/:id')
  findOne(@Param('id') id: string, @Req() req) {
    return this.subjectsService.findOneSubject(id, req.user);
  }

  //update subject with thier id only
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  @Patch('update/:id')
  update(
    @Param('id') id: string,
    @Body() body: { name?: string; passMark?: number },
    @Req() req,
  ) {
    const { name, passMark } = body;
    return this.subjectsService.updateSubject(req.user, id, name, passMark);
  }

  // delete subject
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  @Delete('delete/:id')
  remove(@Param('id') id: string, @Req() req) {
    return this.subjectsService.removeSubject(id, req.user);
  }
}
