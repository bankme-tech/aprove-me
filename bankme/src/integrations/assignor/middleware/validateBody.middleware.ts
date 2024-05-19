import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { validateBody } from '../joi/validateAssignorBody';
import { NextFunction, Request, Response } from 'express';

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
