import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../modules/auth/auth.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AlertsService } from '../modules/alerts/alerts.service';

export const AuthInterceptor: HttpInterceptorFn = (
  request: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const authService = inject(AuthService);
  const alertService: AlertsService = inject(AlertsService);
  const router = inject(Router);

  const authToken = authService.getToken();
  let authRequest = request;
  if (authToken) {
    authRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`,
      },
    });
  }

  return next(authRequest).pipe(
    catchError((error) => {
      if (error.status === 401) {
        alertService.error('Não autorizado!, faça login novamente');
        authService.logout();
        router.navigate(['/login']);
      }
      return throwError(error);
    })
  );
};
