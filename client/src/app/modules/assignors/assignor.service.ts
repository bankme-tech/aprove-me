// assignors/assignor.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { AssignorModel } from '../../models/assignor.model';

@Injectable({
  providedIn: 'root',
})
export class AssignorService {
  private apiUrl = environment.apiUrl + '/assignor';

  constructor(private http: HttpClient) {}

  createAssignor(assignor: AssignorModel): Observable<any> {
    return this.http.post(this.apiUrl, assignor);
  }

  getAssignors(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getAssignorById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  updateAssignor(id: string, assignor: AssignorModel): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}`, assignor);
  }

  deleteAssignor(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
