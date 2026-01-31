import { AuthAdminService } from './auth-admin.service';
import { Response } from 'express';
export declare class AuthAdminController {
    private authAdmin;
    constructor(authAdmin: AuthAdminService);
    registerAdmin(body: {
        name: string;
        email: string;
        password: string;
        schoolId: string;
    }, res: Response): Promise<{
        id: string;
        admin: string;
        email: string;
        schoolId: string;
        role: import("@prisma/client").$Enums.Role;
    }>;
    login(body: {
        password: string;
        email: string;
    }, res: Response): Promise<{
        id: string;
        name: string;
        email: string;
    }>;
    findAll(): Promise<{
        id: string;
        name: string;
        email: string;
        password: string;
        role: import("@prisma/client").$Enums.Role;
        schoolId: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    updateAdmin(body: {
        name?: string;
        email?: string;
        password?: string;
    }, req: any): Promise<{
        message: string;
        id: string;
        name: string;
        email: string;
    }>;
    logout(res: Response): {
        message: string;
    };
    remove(id: string, req: any): Promise<{
        message: string;
    }>;
    findOne(req: any): Promise<{
        admin: {
            id: string;
            name: string;
            email: string;
            createdAt: Date;
        }[];
    }>;
}
