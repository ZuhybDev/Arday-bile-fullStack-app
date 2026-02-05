import { JwtPayload } from 'src/jwt/jwt.strategy';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class SubjectsService {
    private prisma;
    constructor(prisma: PrismaService);
    createSubject(user: JwtPayload, name: string, passMark: number, schoolId: string): Promise<{
        subject: {
            id: string;
            name: string;
            passMark: number;
            schoolId: string;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    findAllSubjects(user: JwtPayload): Promise<never[] | {
        cound: number;
        allsubjects: {
            id: string;
            name: string;
            passMark: number;
            schoolId: string;
            createdAt: Date;
            updatedAt: Date;
        }[];
    }>;
    findOneSubject(id: string, user: JwtPayload): Promise<{
        data: {
            id: string;
            name: string;
            passMark: number;
            schoolId: string;
            createdAt: Date;
            updatedAt: Date;
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
