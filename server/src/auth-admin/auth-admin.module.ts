import { Module } from '@nestjs/common';
import { AuthAdminController } from './auth-admin.controller';
import { AuthAdminService } from './auth-admin.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtAuthModule } from 'src/common/auth-strategies/jwt.strategy.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule, JwtAuthModule, JwtModule],

  controllers: [AuthAdminController],
  providers: [AuthAdminService],
})
export class AuthAdminModule {}
