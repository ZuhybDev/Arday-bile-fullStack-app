import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthAdminService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    registerAdmin(name: string, email: string, password: string, schoolId: string): Promise<{
        message: string;
        admin_info?: undefined;
        token?: undefined;
    } | {
        admin_info: {
            id: string;
            admin: string;
            email: string;
            schoolId: string;
            role: import(".prisma/client").$Enums.Role;
        };
        token: string;
        message?: undefined;
    }>;
    login(email: string, password: string): Promise<{
        id: string;
        name: string;
        email: string;
        token: string;
    }>;
    updateAdmin(id: string, name?: string, email?: string, password?: string): Promise<{
        message: string;
        id: string;
        name: string;
        email: string;
    }>;
    findAllAdmins(): Promise<{
        id: string;
        name: string;
        email: string;
        password: string;
        role: import(".prisma/client").$Enums.Role;
        schoolId: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    removeAdmin(id: string): Promise<{
        messasge: string;
    }>;
}
