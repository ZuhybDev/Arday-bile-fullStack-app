import { AuthAdminService } from './auth-admin.service';
export declare class AuthAdminController {
    private authAdmin;
    constructor(authAdmin: AuthAdminService);
    registerAdmin(body: {
        name: string;
        email: string;
        password: string;
        schoolId: string;
    }): Promise<{
        message: string;
        admin_info?: undefined;
        token_access?: undefined;
    } | {
        admin_info: {
            id: string;
            admin: string;
            email: string;
            schoolId: string;
            role: import(".prisma/client").$Enums.Role;
        };
        token_access: {
            token: string;
        };
        message?: undefined;
    }>;
}
