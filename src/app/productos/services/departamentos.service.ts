import { Injectable } from '@angular/core';
import { Departamento } from '../domain/departamento';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DepartamentosService {
  private dburl = 'http://localhost:3000/departamento';

  constructor(private http: HttpClient) {}

  obtenerDepartamentos(): Observable<Departamento[]> {
    return this.http.get<Departamento[]>(this.dburl).pipe(
      map((departamentos: Departamento[]) => {
        return departamentos.sort((a, b) => a.nombre.localeCompare(b.nombre));
      })
    );
  }

  obtenerDepartamentosById(dId: number): Observable<Departamento> {
    return this.http.get<Departamento>(`${this.dburl}/${dId}`);
  }
}
