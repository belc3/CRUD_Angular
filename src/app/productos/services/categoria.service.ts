import { Injectable } from '@angular/core';
import { Categoria } from '../domain/categoria';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class CategoriaService {
  private dburl = 'http://localhost:3000/categoria';

  constructor(private http: HttpClient) {}

  obtenerCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.dburl).pipe(
      map((categorias: Categoria[]) => {
        return categorias.sort((a, b) => a.nombre.localeCompare(b.nombre));
      })
    );
  }

  obtenerCategoriaById(cId: number): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.dburl}/${cId}`);
  }
}
