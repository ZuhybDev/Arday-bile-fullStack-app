import { JwtPayload } from 'src/jwt/jwt.strategy';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class ResultService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createResult(user: JwtPayload, grade: number, subjectId: string, studentId: string): Promise<{
        id: string;
        name: string;
        grade: number;
        status: string;
        subjectId: string;
        studentId: string;
        createdAt: Date;
    }>;
    clearResult(resultId: string): Promise<{
        message: string;
    }>;
}
