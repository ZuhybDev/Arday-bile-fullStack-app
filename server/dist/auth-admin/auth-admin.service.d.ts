import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/jwt/jwt.strategy';
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
    updateAdmin(user: JwtPayload, id: string, name?: string, email?: string, password?: string): Promise<{
        message: string;
        id: string;
        name: string;
        email: string;
    }>;
    findAllAdmins(): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        role: import(".prisma/client").$Enums.Role;
        email: string;
        password: string;
        schoolId: string;
    }[]>;
    removeAdmin(user: JwtPayload, id: string): Promise<{
        messasge: string;
    }>;
}
