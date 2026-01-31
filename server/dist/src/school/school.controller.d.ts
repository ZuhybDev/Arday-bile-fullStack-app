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
    readschoolData(req: any, id: string): Promise<0 | {
        message: string;
        school: {
            id: string;
            createdAt: Date;
            name: string;
        };
        totalAdmins: number;
        totalStudents: number;
        Admin: {
            createdAt: Date;
            name: string;
            role: import("@prisma/client").$Enums.Role;
            email: string;
        }[];
    }>;
    delete(id: string, req: any): Promise<{
        message: string;
    }>;
}
