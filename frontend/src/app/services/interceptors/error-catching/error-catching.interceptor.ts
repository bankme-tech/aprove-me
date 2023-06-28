import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable()
export class ErrorCatchingInterceptor implements HttpInterceptor {

  constructor(private _snackBar: MatSnackBar, private router: Router){}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
           .pipe(
                 catchError((error: HttpErrorResponse) => {
                    let errorMsg = '';
                    if (error.error instanceof ErrorEvent) {
                       errorMsg = `Error: ${error.error.message}`;
                       return throwError(errorMsg);
                    } 

                    console.log(typeof error.status);
                    console.log(error.status);
                    
                    if (error.status === 401) {
                      this.router.navigateByUrl('/')
                    }

                    const _errorMsg = error.error.message
                    errorMsg = Array.isArray(_errorMsg) ? _errorMsg[0] : _errorMsg
                    this._snackBar.open(errorMsg,'Close',{panelClass:['error-snackbar']})
                    return throwError(errorMsg);
                 })
           )
  }
}
