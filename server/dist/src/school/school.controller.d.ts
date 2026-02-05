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
    readschoolData(req: any): Promise<0 | {
        message: string;
        school: {
            id: string;
            name: string;
            createdAt: Date;
        };
        totalAdmins: number;
        totalStudents: number;
        totalSubjects: number;
        passedCount: number;
        Admin: {
            name: string;
            createdAt: Date;
            email: string;
            role: import("@prisma/client").$Enums.Role;
        }[];
    }>;
    delete(id: string, req: any): Promise<{
        message: string;
    }>;
}
