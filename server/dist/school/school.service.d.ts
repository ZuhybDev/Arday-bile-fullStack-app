import { PrismaService } from 'src/prisma/prisma.service';
export interface JwtPayload {
    schoolId: string;
}
export declare class SchoolService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    registerSchools(data: {
        name: string;
    }): Promise<{
        message: string;
        id: string;
        school: string;
        created: Date;
    }>;
    updateSchool(user: JwtPayload, id: string, newName?: string): Promise<{
        message: string;
        new_name: string;
    }>;
    readSchoolData(): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    deletedSchool(id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    } | {
        message: string;
    }>;
}
