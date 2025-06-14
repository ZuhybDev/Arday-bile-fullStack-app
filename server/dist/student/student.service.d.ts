import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class StudentService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    createStudent(name: string, password: string, schoolId: string): Promise<{
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
            result: {
                grade: number;
                subject: {
                    name: string;
                    createdAt: Date;
                };
            }[];
            id: string;
            name: string;
            code: string;
            password: string;
            total: number | null;
            average: number | null;
            role: import(".prisma/client").$Enums.Role;
            school: {
                name: string;
            };
        };
        token: string;
    }>;
    updateStudent(id: string, name?: string, password?: string, code?: string): Promise<{
        message: string;
        data: {
            id: string;
            name: string;
            code: string;
        };
    }>;
    deleteStudent(id: string): Promise<{
        message: string;
    }>;
}
