import {
  ForbiddenException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/jwt/jwt.strategy';
import { Response } from 'express';

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
    res: Response,
  ) {
    if (schoolId == undefined) {
      throw new ForbiddenException(
        'School not found. Please create the school first.',
      );
    }

    if (name == undefined || email == undefined || password == undefined) {
      throw new NotAcceptableException('Fill all required feilds');
    }

    const school = await this.prisma.school.findUnique({
      where: { id: schoolId },
    });

    if (!school) {
      throw new ForbiddenException(
        'School not found. Please create the school first.',
      );
    }

    const existingAdmin = await this.prisma.admin.findUnique({
      where: { email },
    });

    if (existingAdmin)
      return {
        message: 'Email is already in used',
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

    const payload = {
      userId: admin.id,
      email: admin.email,
      role: admin.role,
      schoolId: admin.schoolId,
      // studentId:
    };
    // console.log(payload);
    const token = this.jwtService.sign(payload);

    res.cookie('token', token, {
      httpOnly: true, // ⚡️ Can't be accessed by JS (protects from XSS)
      secure: process.env.NODE_ENV === 'production', // ⚡️ HTTPS only in prod
      sameSite: 'lax', // prevents CSRF, but allows top-level navigation
      maxAge: 1000 * 60 * 60 * 24, // 1 day expiry
      path: '/', // cookie available on all routes
    });

    return {
      admin_info: {
        id: admin.id,
        admin: admin.name,
        email: admin.email,
        schoolId: admin.schoolId,
        role: admin.role,
      },
    };
  }

  async login(email: string, password: string, res: Response) {
    const admin = await this.prisma.admin.findUnique({
      where: { email },
    });

    if (!admin) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const validPassword = await bcrypt.compare(password, admin.password);

    if (!validPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = {
      userId: admin.id,
      email: admin.email,
      role: admin.role,
      schoolId: admin.schoolId,
    };

    // remove here

    const token = await this.jwtService.signAsync(payload);

    res.cookie('token', token, {
      httpOnly: true, // ⚡️ Can't be accessed by JS (protects from XSS)
      secure: process.env.NODE_ENV === 'production', // ⚡️ HTTPS only in prod
      sameSite: 'lax', // prevents CSRF, but allows top-level navigation
      maxAge: 1000 * 60 * 60 * 24, // 1 day expiry
      path: '/', // cookie available on all routes
    });

    return {
      id: admin.id,
      name: admin.name,
      email: admin.email,
    };
  }

  //update admin
  async updateAdmin(
    user: JwtPayload,
    id: string,
    name?: string,
    email?: string,
    password?: string,
  ) {
    const hasAdminExist = await this.prisma.admin.findUnique({
      where: { id },
    });

    if (!hasAdminExist) {
      throw new NotFoundException('Not found. Try again');
    }

    if (user.userId !== id) {
      throw new ForbiddenException('Access denied');
    }

    const updatingData: any = {};

    if (name) updatingData.name = name;
    if (email) updatingData.email = email;
    if (password) {
      password = await bcrypt.hash(password, 10);
    }
    const admin = await this.prisma.admin.update({
      where: { id },
      data: updatingData,
    });

    return {
      message: 'Successfully updated ',
      id: admin.id,
      name: admin.name,
      email: admin.email,
    };
  }

  // for debugiig only dont use this API in the frontend !!!!!

  async findAllAdmins() {
    return this.prisma.admin.findMany();
  }

  //remove admin
  async removeAdmin(user: JwtPayload, id: string) {
    const hasAdminExist = await this.prisma.admin.findUnique({
      where: { id },
    });

    if (!hasAdminExist) {
      throw new NotFoundException('Not found. Try again');
    }
    if (user.userId !== id) {
      throw new ForbiddenException('Access denied');
    }

    const deletedAdmin = await this.prisma.admin.delete({
      where: { id },
    });

    return {
      messasge: `${(await deletedAdmin).name} Successfully deleted.`,
    };
  }
}
