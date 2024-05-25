import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export default class AuthMiddleware implements NestMiddleware {
  private _secret = process.env.JWT_SECRET ?? 'secret';

  static extractToken(token: string | undefined) {
    if (token) {
      const parts = token.split(' ');
      if (parts.length === 2 && parts[0] === 'Bearer') {
        return parts[1];
      }
    }
  }

  use(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    if (!authorization)
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: 'Token not found' });
    const token = AuthMiddleware.extractToken(authorization) ?? '';
    try {
      const decode = jwt.verify(token, this._secret);
      res.locals.user = decode;
      next();
    } catch (err) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: 'Token must be a valid token' });
    }
  }
}
