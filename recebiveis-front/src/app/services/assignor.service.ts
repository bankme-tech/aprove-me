import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Assagnor } from '../shared/interfaces/payables';

@Injectable({
  providedIn: 'root',
})
export class AssignorService {
  private apiUrl = 'http://localhost:3001/integrations/assignor';
  constructor(private http: HttpClient) {}

  getAssignors(): Observable<Assagnor[]> {
    return this.http.get<Assagnor[]>(this.apiUrl);
  }
  listAssignorIdName(): Observable<{ id: string; name: string }[]> {
    return this.getAssignors().pipe(
      map((assignors) =>
        assignors.map((assignor: Assagnor) => ({ id: assignor.id, name: assignor.name }))
      )
    );
  }
}
