import { StudentService } from './student.service';
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
        total: number | null;
        average: number | null;
        role: import(".prisma/client").$Enums.Role;
        created: Date;
    }>;
    loginStudent(body: {
        code: string;
        password: string;
    }): Promise<{
        message: string;
        data: {
            result: {
                subject: {
                    name: string;
                    createdAt: Date;
                };
                grade: number;
            }[];
            id: string;
            name: string;
            code: string;
            password: string;
            total: number | null;
            average: number | null;
            role: import(".prisma/client").$Enums.Role;
            school: {
                name: string;
            };
        };
        token: string;
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
            result: {
                subject: {
                    name: string;
                    createdAt: Date;
                };
                grade: number;
            }[];
            id: string;
            name: string;
            code: string;
            total: number | null;
            average: number | null;
            role: import(".prisma/client").$Enums.Role;
            schoolId: string;
            school: {
                name: string;
            };
        };
    }>;
    deleteStudent(id: string, req: any): Promise<{
        message: string;
    }>;
}
