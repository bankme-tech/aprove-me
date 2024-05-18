import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { verifyToken } from 'src/services/jwt';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    const token = req.headers.authorization;
    if (!token) throw new HttpException('Empty Authorization Header!', HttpStatus.BAD_REQUEST);

    const isValid = verifyToken(token);

    if (!isValid) throw new HttpException('Invalid JWT Token!', HttpStatus.BAD_REQUEST);

    next();
  }
}
