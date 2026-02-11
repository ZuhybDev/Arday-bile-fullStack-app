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
            createdAt: Date;
            name: string;
        };
        totalAdmins: number;
        totalStudents: number;
        totalSubjects: number;
        passedCount: number;
        Admin: {
            createdAt: Date;
            name: string;
            role: import("@prisma/client").$Enums.Role;
            email: string;
        }[];
    }>;
    deletedSchool(id: string, user: JwtPayload): Promise<{
        message: string;
    }>;
}
