import { HttpStatus, Injectable } from '@nestjs/common';
import { HttpVO } from './http.vo';

@Injectable()
export class HttpResult {
  public static Ok(body: any): HttpVO {
    return new HttpVO(true, HttpStatus.OK, body, null);
  }

  public static BadRequest(body: any, errors: string[]): HttpVO {
    return new HttpVO(false, HttpStatus.BAD_REQUEST, body, errors);
  }

  public static UnprocessableEntity(body: any, errors: string[]): HttpVO {
    return new HttpVO(false, HttpStatus.UNPROCESSABLE_ENTITY, body, errors);
  }
}
