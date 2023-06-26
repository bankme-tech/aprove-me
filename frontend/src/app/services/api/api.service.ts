import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = '/api';

  constructor(private http: HttpClient, private localStorage: LocalStorageService) { }

  login(data: any) {
    return this.http.post(this.baseUrl + '/integrations/auth', data);
  }

  signUp(data: any) {
    return this.http.post(this.baseUrl + '/integrations/signup', data);
  }

  getPayables() {
    const header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.localStorage.get('jwt')}`)
    }
    return this.http.get(this.baseUrl + '/integrations/payable', header);
  }
}
