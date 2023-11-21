import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Payable } from '../shared/interfaces/payables';

@Injectable({
  providedIn: 'root',
})
export class PayableService {
  getPayableDetails(id: string | null): Observable<Payable> {
    return this.http.get<Payable>(`${this.apiUrl}/${id}`)
  }
  private apiUrl = 'http://localhost:3001/integrations/payable';
  constructor(private http: HttpClient) {}

  getPayables(): Observable<Payable[]> {
    return this.http.get<Payable[]>(this.apiUrl);
  }
}
