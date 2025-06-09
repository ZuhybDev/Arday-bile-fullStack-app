import { Body, Controller, Post } from '@nestjs/common';
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
}
