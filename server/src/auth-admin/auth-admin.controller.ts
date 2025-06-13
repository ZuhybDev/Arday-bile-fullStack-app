import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AuthAdminService } from './auth-admin.service';

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
    return this.authAdmin.login(body.password, body.email);
  }

  @Get('admin-data')
  findAll() {
    return this.authAdmin.findAllAdmins();
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.authAdmin.removeAdmin(id);
  }
}
