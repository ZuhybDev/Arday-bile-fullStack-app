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
    }): Promise<{
        message: string;
        new_name: string;
    }>;
    readschoolData(): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    delete(id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    } | {
        message: string;
    }>;
}
