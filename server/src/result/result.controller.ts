import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/jwt/roles/roles.decorator';
import { RolesGuard } from 'src/jwt/roles/roles.guard';
import { ResultService } from './result.service';

@Controller('result')
export class ResultController {
  constructor(private readonly resultService: ResultService) {}

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  @Post('register')
  createResult(
    @Body() body: { studentId: string; subjectId: string; grade: number },
    @Req() req,
  ) {
    const { studentId, subjectId, grade } = body;
    return this.resultService.createResult(
      req.user,
      grade,
      subjectId,
      studentId,
    );
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  @Delete('clear/:id')
  clearResult(@Param('id') id: string) {
    return this.resultService.clearResult(id);
  }
}
