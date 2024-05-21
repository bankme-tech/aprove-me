import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<{
    status: HttpStatus;
    data: any;
  }> {
    // TODO: should receive status correctly when ok
    return next.handle().pipe(
      map((data) => {
        return {
          status: HttpStatus.OK,
          data,
        };
      }),
      catchError((error) => {
        const response = context.switchToHttp().getResponse();
        const status =
          error.response?.statusCode ?? HttpStatus.INTERNAL_SERVER_ERROR;

        response.status(status).json({
          status,
          error: error.response?.message ?? 'Internal server error',
        });

        return throwError(() => error);
      }),
    );
  }
}
