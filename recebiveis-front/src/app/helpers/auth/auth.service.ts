import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Credentials } from '../../shared/interfaces/payables';
interface auth {
  accessToken:string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3001/auth/login'; // Substitua pela sua URL de autenticação


  constructor(private http: HttpClient) {}

  login(credentials: Credentials ): Observable<auth> {
    return this.http.post<auth>(this.apiUrl, credentials);
  }

  isLoggedIn() :boolean {
    const jwt = JSON.parse(localStorage.getItem('accessToken')!);
    return jwt ? true : false
  }
}
