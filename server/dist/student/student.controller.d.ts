import { StudentService } from './student.service';
export declare class StudentController {
    private studentService;
    constructor(studentService: StudentService);
    createStudent(body: {
        name: string;
        password: string;
        schoolId: string;
    }): Promise<any>;
    loginStudent(body: {
        code: string;
        password: string;
    }): Promise<{
        message: string;
        data: {
            school: {
                name: string;
            };
            result: {
                subject: {
                    name: string;
                    createdAt: Date;
                };
                grade: number;
            }[];
            id: string;
            name: string;
            role: import(".prisma/client").$Enums.Role;
            password: string;
            code: string;
            total: number | null;
            average: number | null;
        };
        token: string;
    }>;
    updateStudent(id: string, body: {
        name: string;
        password: string;
        code: string;
    }): Promise<{
        message: string;
        data: {
            id: string;
            name: string;
            code: string;
        };
    }>;
    deleteStudent(id: string): Promise<{
        messasge: string;
    }>;
}
