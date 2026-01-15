import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { JwtPayload } from 'src/jwt/jwt.strategy';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class StudentService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    createStudent(user: JwtPayload, name: string, password: string, className: string, schoolId: string): Promise<{
        message: string;
        id: string;
        name: string;
        roll_no: string;
        class: string;
        schoolId: string;
        role: import("@prisma/client").$Enums.Role;
        created: Date;
    }>;
    loginStudent(code: string, password: string, res: Response): Promise<{
        message: string;
        student: {
            id: string;
            name: string;
            school: {
                name: string;
            };
            code: string;
            password: string;
            role: import("@prisma/client").$Enums.Role;
        };
        formattedResult: {
            name: string;
            grade: number;
            status: string;
        }[];
        total: number;
        average: number;
        grade: string;
    }>;
    updateStudent(user: JwtPayload, id: string, name?: string, password?: string, className?: string): Promise<{
        message: string;
        data: {
            id: string;
            name: string;
            class: string;
        };
    }>;
    findOneStudent(user: JwtPayload, id: string): Promise<{
        student: {
            id: string;
            name: string;
            schoolId: string;
            school: {
                name: string;
            };
            code: string;
            className: string;
            role: import("@prisma/client").$Enums.Role;
        };
        formattedResult: {
            name: string;
            grade: number;
            status: string;
        }[];
        grade: string;
    }>;
    findAllStudent(schoolId: string, user: JwtPayload): Promise<{
        id: string;
        code: string;
        name: string;
        class: string;
        average: number;
        overallGrade: string;
        grades: {
            subject: string;
            grade: number;
            status: string;
        }[];
    }[]>;
    deleteStudent(user: JwtPayload, id: string): Promise<{
        message: string;
    }>;
}
