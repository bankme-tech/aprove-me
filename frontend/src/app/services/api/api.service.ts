import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { Observable } from 'rxjs';

export interface IPayable {
  id?:string;
  value:number;
  assignor?: IAssignor;
  assignorId?: string;
  emissionDate?: string;
}

export interface IAssignor {
  id?:string;
  document:string;
  phone: string;
  name: string;
  email:string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = '/api/integrations';

  constructor(private http: HttpClient, private localStorage: LocalStorageService) { }

  login(data: any) {
    return this.http.post(this.baseUrl + '/auth', data);
  }

  signUp(data: any) {
    return this.http.post(this.baseUrl + '/signup', data);
  }

  getPayables() : Observable<IPayable[]> {
    return this.http.get<IPayable[]>(this.baseUrl + '/payable');
  }

  getPayable(id:string) : Observable<IPayable> {
    return this.http.get<IPayable>(this.baseUrl + '/payable/'+ id);
  }

  updatePayable(id:string,data:IPayable) : Observable<IPayable> {
    return this.http.patch<IPayable>(this.baseUrl + '/payable/'+ id,data);
  }

  createPayable(data:IPayable) : Observable<IPayable> {
    return this.http.post<IPayable>(this.baseUrl + '/payable',data);
  }

  deletePayable(id:string) : Observable<IPayable> {
    return this.http.delete<IPayable>(this.baseUrl + '/payable/'+ id);
  }

  getAssignors() : Observable<IAssignor[]> {
    return this.http.get<IAssignor[]>(this.baseUrl + '/assignor');
  }

  getAssignor(id:string) : Observable<IAssignor> {
    return this.http.get<IAssignor>(this.baseUrl + '/assignor/'+ id);
  }

  updateAssignor(id:string,data: IAssignor) : Observable<IAssignor> {
    return this.http.patch<IAssignor>(this.baseUrl + '/assignor/'+ id,data);
  }

  createAssignor(data:IAssignor) : Observable<IAssignor> {
    return this.http.post<IAssignor>(this.baseUrl + '/assignor',data);
  }

  deleteAssignor(id:string) : Observable<IAssignor> {
    return this.http.delete<IAssignor>(this.baseUrl + '/assignor/'+ id);
  }
}
