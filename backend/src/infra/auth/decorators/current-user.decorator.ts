import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import {
  createParamDecorator,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

type DecodedToken = {
  sub: string;
  iat: number;
  exp: number;
};

@Injectable()
export class JwtKeyService {
  constructor(private readonly configService: ConfigService) {}

  getKey(): string {
    return this.configService.get<string>('JWT_SECRET');
  }
}

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }

    const token = authHeader.substring(7);
    const jwtKeyService = new JwtKeyService(new ConfigService());
    const jwtSecret = jwtKeyService.getKey();

    try {
      const decodedToken = jwt.verify(token, jwtSecret, {
        ignoreExpiration: false,
      }) as DecodedToken;

      return { userId: decodedToken.sub };
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new UnauthorizedException('Não autorizado!');
      }
      return null;
    }
  },
);
