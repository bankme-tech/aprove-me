import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = '/api';

  constructor(private http: HttpClient) { }

  login(data:any) {
    return this.http.post(this.baseUrl+'/integrations/auth',data);
  }

  signUp(data:any) {
    return this.http.post(this.baseUrl+'/integrations/signup',data);
  }
}
