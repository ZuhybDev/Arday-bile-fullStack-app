import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { SchoolService } from './school.service';
import { jwtAuthGuard } from 'src/common/auth-strategies/jwt.auth.guards';
import { RolesGaurd } from 'src/common/auth-strategies/roles.guard';
import { Roles } from 'src/common/roles/decorator';

@Controller('school')
export class SchoolController {
  constructor(private schoolService: SchoolService) {}
  @Post('register')
  create(@Body() body: { name: string }) {
    return this.schoolService.createSchool(body);
  }

  //update School route

  @Patch(':id')
  @UseGuards(jwtAuthGuard, RolesGaurd)
  @Roles('admin')
  async updateSchool(
    @Param('id') id: string,
    @Body()
    body: { name: string },
  ) {
    return this.schoolService.updateSchool(id, body.name);
  }

  @Get()
  @UseGuards(jwtAuthGuard, RolesGaurd)
  @Roles('admin')
  async getSchools() {
    return this.schoolService.getAllSchools();
  }

  @Delete('delete/:id')
  @UseGuards(jwtAuthGuard, RolesGaurd)
  @Roles('admin')
  async deletedSchool(@Param('id') id: string) {
    return await this.schoolService.deleteSchool(id);
  }
}
