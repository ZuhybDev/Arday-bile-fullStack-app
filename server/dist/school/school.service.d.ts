import { PrismaService } from 'src/prisma/prisma.service';
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
    updateSchool(id: string, newName?: string): Promise<{
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
