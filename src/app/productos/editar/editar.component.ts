import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductosService } from '../services/productos.service';
import { Producto } from '../domain/producto';
import { CategoriaService } from '../services/categoria.service';
import { DepartamentosService } from '../services/departamentos.service';
import { Categoria } from '../domain/categoria';
import { Departamento } from '../domain/departamento';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'rsig-app-editar',
  templateUrl: './editar.component.html',
})

export class EditarComponent {
  cargando = true;
  idurl!: number;
  productoId!: number;
  producto: any;
  modo: 'agregar' | 'editar' | 'eliminar' = 'eliminar';
  editar: string = 'Editar';
  categoria: Categoria[] = [];
  departamento: Departamento[] = [];

  constructor(
    private route: ActivatedRoute,
    private productosService: ProductosService,
    private router: Router,
    private departamentosService: DepartamentosService,
    private categoriaService: CategoriaService,
    private messageService: MessageService
  ){}

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
    this.editarProducto(producto);
  }

  editarProducto(producto: Producto) {
    this.productosService.putProducto(producto).subscribe(() => {
      this.regresar();
    });
  }

  regresar(): void {
    this.router.navigate(['productos/admin']);
    this.messageService.add({
      severity: 'success',
      summary: 'Producto editado',
    });
  }

  obtenerProductoUrl() {
    this.router.navigate(['producto/editar', this.idurl]);
  }
}

