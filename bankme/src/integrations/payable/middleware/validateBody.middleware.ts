import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { validateBody } from '../joi/validatePayableBody';

@Injectable()
export default class ValidateBodyMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { error } = validateBody(req.body);

    if (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }

    next();
  }
}
