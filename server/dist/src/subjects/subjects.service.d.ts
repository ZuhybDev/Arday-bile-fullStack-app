import { JwtPayload } from 'src/jwt/jwt.strategy';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class SubjectsService {
    private prisma;
    constructor(prisma: PrismaService);
    createSubject(user: JwtPayload, name: string, passMark: number, schoolId: string): Promise<{
        subject: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            passMark: number;
            schoolId: string;
        };
    }>;
    findAllSubjects(user: JwtPayload): Promise<any[] | {
        cound: number;
        allsubjects: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            passMark: number;
            schoolId: string;
        }[];
    }>;
    findOneSubject(id: string, user: JwtPayload): Promise<{
        data: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            passMark: number;
            schoolId: string;
        };
    }>;
    updateSubject(user: JwtPayload, id: string, name?: string, passMark?: number): Promise<{
        id: string;
        name: string;
        passMark: number;
    }>;
    removeSubject(id: string, user: JwtPayload): Promise<{
        message: string;
    }>;
}
