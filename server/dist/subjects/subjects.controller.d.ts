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
            name: string;
            passMark: number;
            schoolId: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    findAllSubjects(id: string, req: any): Promise<{
        cound: number;
        allsubjects: {
            name: string;
            passMark: number;
            schoolId: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
        }[];
    }>;
    findOne(id: string, req: any): Promise<{
        subject: {
            name: string;
            passMark: number;
            schoolId: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
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
