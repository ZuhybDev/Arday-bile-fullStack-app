import { SchoolService } from './school.service';
export declare class SchoolController {
    private schoolservice;
    constructor(schoolservice: SchoolService);
    register(body: {
        name: string;
    }): Promise<{
        message: string;
        schoolId: string;
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
            createdAt: Date;
            updatedAt: Date;
            name: string;
        };
        admins: string[];
    }>;
    delete(id: string, req: any): Promise<{
        message: string;
    }>;
}
