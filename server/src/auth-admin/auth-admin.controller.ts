import { Body, Controller, Post } from '@nestjs/common';
import { AuthAdminService } from './auth-admin.service';

@Controller('auth-admin')
export class AuthAdminController {
  constructor(private authAdminService: AuthAdminService) {}
  @Post('register')
  async creaeteAdmin(
    @Body()
    body: {
      name: string;
      email: string;
      password: string;
      schoolId: string;
    },
  ) {
    return this.authAdminService.createAdmin(
      body.name,
      body.email,
      body.password,
      body.schoolId,
    );
  }
}
