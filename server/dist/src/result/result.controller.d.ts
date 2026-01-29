import { ResultService } from './result.service';
export declare class ResultController {
    private readonly resultService;
    constructor(resultService: ResultService);
    createResult(body: {
        studentId: string;
        subjectId: string;
        grade: number;
    }, req: any): Promise<{
        id: string;
        name: string;
        grade: number;
        status: string;
        subjectId: string;
        studentId: string;
        createdAt: Date;
    }>;
    clearResult(id: string): Promise<{
        message: string;
    }>;
}
