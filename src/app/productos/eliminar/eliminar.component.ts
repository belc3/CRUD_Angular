import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductosService } from '../services/productos.service';
import { Producto } from '../domain/producto';
import { CategoriaService } from '../services/categoria.service';
import { Categoria } from '../domain/categoria';
import { Departamento } from '../domain/departamento';
import { DepartamentosService } from '../services/departamentos.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'rsig-app-eliminar',
  templateUrl: './eliminar.component.html',
})

export class EliminarComponent implements OnInit {
  eliminar: string = 'Eliminar';
  cargando = true;
  idurl!: number;
  productoId!: number;
  producto: any;
  modo: 'agregar' | 'editar' | 'eliminar' = 'eliminar';
  categoria: Categoria[] = [];
  departamento: Departamento[] = [];

  constructor(
    private route: ActivatedRoute,
    private productosService: ProductosService,
    private categoriaService: CategoriaService,
    private departamentosService: DepartamentosService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.productoId = params['id'];

      this.productosService
        .obtenerProductoById(this.productoId)
        .subscribe((producto) => {
          this.producto = producto;

          this.departamentosService
            .obtenerDepartamentos()
            .subscribe((departamentos) => {
              this.departamento = departamentos;

              this.categoriaService.obtenerCategorias().subscribe((categoria) => {
                this.categoria = categoria;
                this.cargando = false;
              });
            });
        });
    });
  }

  onHSubmit(producto: Producto) {
    this.eliminarProducto(producto);
  }

  eliminarProducto(producto: Producto) {
    this.productosService.eliminarProducto(producto).subscribe(() => {
      this.regresar();
    });
  }

  regresar(): void {
    this.router.navigate(['productos/admin']);
    this.messageService.add({
      severity: 'success',
      summary: 'Producto eliminado',
    });
  }

  obtenerProductoUrl() {
    this.router.navigate(['producto/eliminar', this.idurl]);
  }
}
