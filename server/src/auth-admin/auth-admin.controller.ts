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
import { AuthAdminService } from './auth-admin.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/jwt/roles/roles.guard';
import { Roles } from 'src/jwt/roles/roles.decorator';

@Controller('auth-admin')
export class AuthAdminController {
  constructor(private authAdmin: AuthAdminService) {}

  @Post('register')
  async registerAdmin(
    @Body()
    body: {
      name: string;
      email: string;
      password: string;
      schoolId: string;
    },
  ) {
    return this.authAdmin.registerAdmin(
      body.name,
      body.email,
      body.password,
      body.schoolId,
    );
  }

  @Post('login')
  login(@Body() body: { password: string; email: string }) {
    return this.authAdmin.login(body.email, body.password);
  }

  // for dev only
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  @Get('admin-data')
  findAll() {
    return this.authAdmin.findAllAdmins();
  }

  //update admin
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  @Patch('update/:id')
  updateAdmin(
    @Param('id') id: string,
    @Body()
    @Body()
    body: { name?: string; email?: string; password?: string },
    @Req() req,
  ) {
    return this.authAdmin.updateAdmin(
      req.user,
      id,
      body.name,
      body.email,
      body.password,
    );
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  @Delete('delete/:id')
  remove(@Param('id') id: string, @Req() req) {
    return this.authAdmin.removeAdmin(req.user, id);
  }
}
