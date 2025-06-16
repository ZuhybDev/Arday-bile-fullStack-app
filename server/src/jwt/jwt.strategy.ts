// jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get<string>('JWT_SECRET_KEY')!, // Move to ConfigService later
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
