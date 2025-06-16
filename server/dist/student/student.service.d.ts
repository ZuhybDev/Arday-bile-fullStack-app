import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/jwt/jwt.strategy';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class StudentService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    createStudent(user: JwtPayload, name: string, password: string, classname: string, schoolId: string): Promise<{
        message: string;
        id: string;
        name: string;
        roll_no: string;
        schoolId: string;
        total: number | null;
        average: number | null;
        role: import(".prisma/client").$Enums.Role;
        created: Date;
    }>;
    loginStudent(code: string, password: string): Promise<{
        message: string;
        data: {
            school: {
                name: string;
            };
            result: {
                subject: {
                    name: string;
                    createdAt: Date;
                };
                grade: number;
            }[];
            id: string;
            name: string;
            role: import(".prisma/client").$Enums.Role;
            password: string;
            code: string;
            total: number | null;
            average: number | null;
        };
        token: string;
    }>;
    updateStudent(user: JwtPayload, id: string, name?: string, password?: string, code?: string): Promise<{
        message: string;
        data: {
            id: string;
            name: string;
            code: string;
        };
    }>;
    findOneStudent(user: JwtPayload, id: string): Promise<{
        student: {
            school: {
                name: string;
            };
            result: {
                subject: {
                    name: string;
                    createdAt: Date;
                };
                grade: number;
            }[];
            id: string;
            name: string;
            role: import(".prisma/client").$Enums.Role;
            schoolId: string;
            code: string;
            total: number | null;
            average: number | null;
        };
    }>;
    findAllStudent(schoolId: string, user: JwtPayload): Promise<void>;
    deleteStudent(user: JwtPayload, id: string): Promise<{
        message: string;
    }>;
}
