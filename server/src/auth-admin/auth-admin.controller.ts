import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthAdminService } from './auth-admin.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/jwt/roles/roles.guard';
import { Roles } from 'src/jwt/roles/roles.decorator';
import { Response } from 'express';

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
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authAdmin.registerAdmin(
      body.name,
      body.email,
      body.password,
      body.schoolId,
      res,
    );
  }

  @Post('login')
  login(
    @Body() body: { password: string; email: string },
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authAdmin.login(body.email, body.password, res);
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

  // logoutjust delete the cookies
  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('token', {
      path: '/',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      secure: process.env.NODE_ENV === 'production',
    });
    return { message: 'Logged out' };
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  @Delete('delete/:id')
  remove(@Param('id') id: string, @Req() req) {
    return this.authAdmin.removeAdmin(req.user, id);
  }
}
