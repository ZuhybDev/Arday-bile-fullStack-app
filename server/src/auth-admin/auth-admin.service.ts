import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthAdminService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async createAdmin(
    name: string,
    email: string,
    password: string,
    schoolId: string,
  ) {
    const existingadmin = await this.prisma.admin.findUnique({
      where: { email },
    });

    if (existingadmin) {
      return {
        message: 'Email-ka hore ayaa loo isticmaalay',
      };
    }

    // hashed password
    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await this.prisma.admin.create({
      data: {
        name,
        email,
        password: hashedPassword,
        schoolId,
      },
    });

    try {
      const payload = { sub: admin.id, email: admin.email, role: admin.role };

      const token = this.jwtService.sign(payload);
      return {
        admin: {
          admin_id: admin.id,
          admin: admin.role,
        },
        token: token,
      };
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
