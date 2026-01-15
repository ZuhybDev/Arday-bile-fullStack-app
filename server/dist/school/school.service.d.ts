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
    readSchoolData(user: JwtPayload, id: string): Promise<{
        message: string;
        schoolData: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
        };
        admins: string[];
    }>;
    deletedSchool(id: string, user: JwtPayload): Promise<{
        message: string;
    }>;
}
