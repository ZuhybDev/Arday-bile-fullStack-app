// jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => req?.cookies?.token,
      ]),

      ignoreExpiration: false,
      secretOrKey: config.get<string>('JWT_SECRET_KEY')!,
    });
  }

  async validate(payload: any) {
    return {
      userId: payload.userId,
      email: payload.email,
      role: payload.role,
      schoolId: payload.schoolId,
    };
  }
}

// jwt-payload.interface.ts
export interface JwtPayload {
  userId: string;
  email: string;
  role: string;
  schoolId: string;
}
