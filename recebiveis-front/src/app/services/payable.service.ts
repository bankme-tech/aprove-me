import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Payable } from '../shared/interfaces/payables';

@Injectable({
  providedIn: 'root',
})
export class PayableService {
  private apiUrl = 'http://localhost:3001/integrations/payable';
  constructor(private http: HttpClient) {}

  getPayableDetails(id: string | null): Observable<Payable> {
    return this.http.get<Payable>(`${this.apiUrl}/${id}`);
  }
  getPayables(): Observable<Payable[]> {
    return this.http.get<Payable[]>(this.apiUrl);
  }
  deletePayable(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
