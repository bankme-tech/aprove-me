import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class HttpStatusInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        console.log('data it');
        console.log(data);
        if (!!data.httpStatusCode)
          context.switchToHttp().getResponse().status(data.httpStatusCode);
        return data;
      }),
    );
  }
}
