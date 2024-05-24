import {
  HttpErrorResponse,
  HttpHandlerFn,
  HttpInterceptor,
  HttpInterceptorFn,
  HttpRequest,
  HttpStatusCode,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../modules/auth/auth.service';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AlertsService } from '../modules/alerts/alerts.service';

export const TokenInterceptor: HttpInterceptorFn = (
  request: HttpRequest<any>,
  next: HttpHandlerFn
) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const alertService = inject(AlertsService);

  const authRequest = request.clone({
    setHeaders: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });

  return next(authRequest).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === HttpStatusCode.Unauthorized) {
        authService.logout();
        alertService.error('Sessão expirada, faça login novamente');
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
};
