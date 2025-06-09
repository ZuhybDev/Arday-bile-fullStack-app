import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthAdminService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async registerAdmin(
    name: string,
    email: string,
    password: string,
    schoolId: string,
  ) {
    const existingAdmin = await this.prisma.admin.findUnique({
      where: { email },
    });

    if (existingAdmin)
      return {
        message: 'Email-ka hore ayaa loo isticmaalay',
      };

    if (password.length < 6) {
      throw new UnprocessableEntityException(
        'Password-ka waa inaa ka badnaada 6 xaraf',
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const admin = await this.prisma.admin.create({
      data: {
        name,
        email,
        password: hashedPassword,
        schoolId,
      },
    });

    const payload = { sub: admin.id, email: admin.email, role: admin.role };

    const token = this.jwtService.sign(payload);
    return {
      admin_info: {
        id: admin.id,
        admin: admin.name,
        email: admin.email,
        schoolId: admin.schoolId,
        role: admin.role,
      },

      token_access: {
        token,
      },
    };
  }
}
