import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { SchoolModule } from './school/school.module';
import { AuthAdminModule } from './auth-admin/auht-admin.module';
import { JwtModule } from '@nestjs/jwt';
import { StudentModule } from './student/student.module';
import { SubjectsModule } from './subjects/subjects.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthAdminModule,
    SchoolModule,
    JwtModule,
    StudentModule,
    SubjectsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
