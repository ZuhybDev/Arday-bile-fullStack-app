import { SubjectsService } from './subjects.service';
export declare class SubjectsController {
    private readonly subjectsService;
    constructor(subjectsService: SubjectsService);
    create(body: {
        name: string;
        passMark: number;
        schoolId: string;
    }, req: any): Promise<{
        subject: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            schoolId: string;
            passMark: number;
        };
    }>;
    findAllSubjects(id: string, req: any): Promise<{
        cound: number;
        allsubjects: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            schoolId: string;
            passMark: number;
        }[];
    }>;
    findOne(id: string, req: any): Promise<{
        subject: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            schoolId: string;
            passMark: number;
        };
    }>;
    update(id: string, body: {
        name?: string;
        passMark?: number;
    }, req: any): Promise<{
        id: string;
        name: string;
        passMark: number;
    }>;
    remove(id: string, req: any): Promise<{
        message: string;
    }>;
}
