import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;
    if (!token) {
      throw new UnauthorizedException('Não autorizado');
    }

    try {
      const decodedToken = this.jwtService.verify(token.replace('Bearer ', ''));
      req['user'] = decodedToken;
      next();
    } catch (error) {
      throw new UnauthorizedException('Não autorizado');
    }
  }
}
