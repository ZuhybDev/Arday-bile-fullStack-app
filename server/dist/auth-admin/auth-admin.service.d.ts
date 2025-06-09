import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthAdminService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    registerAdmin(name: string, email: string, password: string, schoolId: string): Promise<{
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
