import { StudentService } from './student.service';
import { Response } from 'express';
export declare class StudentController {
    private studentService;
    constructor(studentService: StudentService);
    createStudent(body: {
        name: string;
        password: string;
        schoolId: string;
        className: string;
    }, req: any): Promise<{
        message: string;
        id: string;
        name: string;
        roll_no: string;
        class: string;
        schoolId: string;
        role: import("@prisma/client").$Enums.Role;
        created: Date;
    }>;
    loginStudent(body: {
        code: string;
        password: string;
    }, res: Response): Promise<{
        message: string;
        student: {
            school: {
                name: string;
            };
            id: string;
            name: string;
            password: string;
            role: import("@prisma/client").$Enums.Role;
            code: string;
        };
        formattedResult: {
            name: string;
            grade: number;
            status: string;
        }[];
        total: number;
        average: number;
        grade: string;
    }>;
    updateStudent(id: string, body: {
        name: string;
        password: string;
        code: string;
    }, req: any): Promise<{
        message: string;
        data: {
            id: string;
            name: string;
            code: string;
        };
    }>;
    studentData(id: string, req: any): Promise<{
        student: {
            school: {
                name: string;
            };
            id: string;
            name: string;
            role: import("@prisma/client").$Enums.Role;
            schoolId: string;
            code: string;
        };
        formattedResult: {
            name: string;
            grade: number;
            status: string;
        }[];
        grade: string;
    }>;
    deleteStudent(id: string, req: any): Promise<{
        message: string;
    }>;
}
