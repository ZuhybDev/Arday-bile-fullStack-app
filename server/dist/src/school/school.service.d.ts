import { JwtPayload } from 'src/jwt/jwt.strategy';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class SchoolService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    registerSchools(data: {
        name: string;
    }): Promise<{
        message: string;
        schoolId: string;
        school: string;
        created: Date;
    }>;
    updateSchool(user: JwtPayload, id: string, newName?: string): Promise<{
        message: string;
        new_name: string;
    }>;
    readSchoolData(user: JwtPayload): Promise<0 | {
        message: string;
        school: {
            id: string;
            name: string;
            createdAt: Date;
        };
        totalAdmins: number;
        totalStudents: number;
        totalSubjects: number;
        passedCount: number;
        Admin: {
            name: string;
            createdAt: Date;
            email: string;
            role: import("@prisma/client").$Enums.Role;
        }[];
    }>;
    deletedSchool(id: string, user: JwtPayload): Promise<{
        message: string;
    }>;
}
