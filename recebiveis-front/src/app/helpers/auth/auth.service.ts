import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { Credentials } from '../../shared/interfaces/payables';
import { ActivatedRoute, Router } from '@angular/router';
interface auth {
  accessToken: string;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3001/auth/login';

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {
   if(localStorage.getItem('accessToken')!!){
    this.setAuthenticated(true);
   }

  }
  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  setAuthenticated(value: boolean): void {
    this.isAuthenticatedSubject.next(value);
  }


  login(credentials: Credentials): Observable<auth> {
    return this.http.post<auth>(this.apiUrl, credentials).pipe(
      tap((response) => {
        const jwt = JSON.stringify(response.accessToken);
        localStorage.setItem('accessToken', jwt);
        this.setAuthenticated(true);
      }),
      catchError((error) => {
        console.error('Erro ao fazer login:', error);
        this.setAuthenticated(false);
        localStorage.removeItem('accessToken')
        return throwError(() => error);
      })
    );
  }

  handleLoginSuccess(route: ActivatedRoute): void {
    const redirectUrl =
      route.snapshot.queryParams['redirectUrl'] || '/payables';

    this.router.navigate([redirectUrl]);
  }

  isLoggedIn(): boolean {
    try {
      const jwt = JSON.parse(localStorage.getItem('accessToken')!);

      return jwt ? true : false;
    } catch (error) {
      return false;
    }
  }

  logout() {
    this.setAuthenticated(false);
    localStorage.removeItem('accessToken');
    this.router.navigate(['/sign-in']);
  }

  getAccessToken(): string | null {
    return JSON.parse(localStorage.getItem('accessToken')!);
  }
}
