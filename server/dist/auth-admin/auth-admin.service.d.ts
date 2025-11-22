import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/jwt/jwt.strategy';
import { Response } from 'express';
export declare class AuthAdminService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    registerAdmin(name: string, email: string, password: string, schoolId: string, res: Response): Promise<{
        id: string;
        admin: string;
        email: string;
        schoolId: string;
        role: import("@prisma/client").$Enums.Role;
    }>;
    login(email: string, password: string, res: Response): Promise<{
        id: string;
        name: string;
        email: string;
    }>;
    updateAdmin(user: JwtPayload, id: string, name?: string, email?: string, password?: string): Promise<{
        message: string;
        id: string;
        name: string;
        email: string;
    }>;
    findAllAdmins(): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        schoolId: string;
        password: string;
        role: import("@prisma/client").$Enums.Role;
        email: string;
    }[]>;
    removeAdmin(user: JwtPayload, id: string): Promise<{
        messasge: string;
    }>;
}
