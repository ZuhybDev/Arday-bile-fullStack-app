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
        message: string;
        admin_info?: undefined;
    } | {
        admin_info: {
            id: string;
            admin: string;
            email: string;
            schoolId: string;
            role: import("@prisma/client").$Enums.Role;
        };
        message?: undefined;
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
        createdAt: Date;
        updatedAt: Date;
        email: string;
        password: string;
        role: import("@prisma/client").$Enums.Role;
        schoolId: string;
    }[]>;
    updateAdmin(id: string, body: {
        name?: string;
        email?: string;
        password?: string;
    }, req: any): Promise<{
        message: string;
        id: string;
        name: string;
        email: string;
    }>;
    remove(id: string, req: any): Promise<{
        messasge: string;
    }>;
}
