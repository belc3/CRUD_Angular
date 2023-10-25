import { Injectable } from '@angular/core';
import { Producto } from '../domain/producto';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  private dburl = 'http://localhost:3000/producto';

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  obtenerProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.dburl).pipe(
      map((productos: Producto[]) => {
        return productos.sort((a, b) => a.nombre.localeCompare(b.nombre));
      })
    );
  }

  obtenerProductoById(pId: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.dburl}/${pId}`);
  }
  agregarProducto(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.dburl, producto);
  }

  eliminarProducto(producto: Producto): Observable<Producto> {
    return this.http.delete<Producto>(`${this.dburl}/${producto.id}`);
  }

  putProducto(producto: Producto): Observable<Producto> {
    return this.http.put<Producto>(`${this.dburl}/${producto.id}`, producto);
  }
}
