import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
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
    };
    const token = this.jwtService.sign(payload);
    return {
      admin_info: {
        id: admin.id,
        admin: admin.name,
        email: admin.email,
        schoolId: admin.schoolId,
        role: admin.role,
      },

      token,
    };
  }

  async login(email: string, password: string) {
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
    const token = await this.jwtService.signAsync(payload);

    return {
      id: admin.id,
      name: admin.name,
      email: admin.email,
      token,
    };
  }
  //update admin
  async updateAdmin(
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

    if (password) {
      password = await bcrypt.hash(password, 10);
    }
    const admin = await this.prisma.admin.update({
      where: { id },
      data: {
        name: name,
        email: email,
        password: password,
      },
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
  async removeAdmin(id: string) {
    const hasAdminExist = await this.prisma.admin.findUnique({
      where: { id },
    });

    if (!hasAdminExist) {
      throw new NotFoundException('Not found. Try again');
    }

    const deletedAdmin = await this.prisma.admin.delete({
      where: { id },
    });

    return {
      messasge: `${(await deletedAdmin).name} Successfully deleted.`,
    };
  }
}
