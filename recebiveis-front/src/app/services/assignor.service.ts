import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Assignor } from '../shared/interfaces/payables';

@Injectable({
  providedIn: 'root',
})
export class AssignorService {
  private apiUrl = 'http://localhost:3001/integrations/assignor';
  constructor(private http: HttpClient) {}

  getAssignors(): Observable<Assignor[]> {
    return this.http.get<Assignor[]>(this.apiUrl);
  }
  listAssignorIdName(): Observable<{ id: string; name: string }[]> {
    return this.getAssignors().pipe(
      map((assignors) =>
        assignors.map((assignor: Assignor) => ({
          id: assignor.id,
          name: assignor.name,
        }))
      )
    );
  }

  createAssignor(assignor: Assignor): Observable<Assignor> {
    return this.http.post<Assignor>(this.apiUrl, assignor);
  }

  getAssignorDetails(assignorId: string): Observable<any> {
    const url = `${this.apiUrl}/${assignorId}`;
    return this.http.get<any>(url);
  }
}
