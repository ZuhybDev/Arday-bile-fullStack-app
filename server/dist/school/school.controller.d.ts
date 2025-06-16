import { SchoolService } from './school.service';
export declare class SchoolController {
    private schoolservice;
    constructor(schoolservice: SchoolService);
    register(body: {
        name: string;
    }): Promise<{
        message: string;
        id: string;
        school: string;
        created: Date;
    }>;
    update(id: string, body: {
        name: string;
    }, req: any): Promise<{
        message: string;
        new_name: string;
    }>;
    readschoolData(req: any, id: string): Promise<{
        message: string;
        schoolData: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    delete(id: string, req: any): Promise<{
        message: string;
    }>;
}
