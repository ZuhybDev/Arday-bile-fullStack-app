import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PrismaModule } from './prisma/prisma.module';
import { SchoolModule } from './school/school.module';
import { AuthAdminModule } from './auth-admin/auth-admin.module';
import { JwtAuthModule } from 'src/common/auth-strategies/jwt.strategy.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { StudentModule } from './student/student.module';

@Module({
  imports: [
    PrismaModule,
    SchoolModule,
    AuthAdminModule,
    //jwt issue
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtAuthModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      global: true,
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET')!,
      }),
    }),
    StudentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
