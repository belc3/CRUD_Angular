import { Component, OnInit } from '@angular/core';
import { DepartamentosService } from '../services/departamentos.service';
import { ProductosService } from '../services/productos.service';
import { CategoriaService } from '../services/categoria.service';
import { Producto } from '../domain/producto';
import { Categoria } from '../domain/categoria';
import { Departamento } from '../domain/departamento';
import { Router } from '@angular/router';
import { MessageService, SelectItemGroup } from 'primeng/api';

@Component({
  selector: 'rsig-app-agregar',
  templateUrl: './agregar.component.html',
})

export class AgregarComponent implements OnInit {
  agregar: string = 'Agregar';
  modo: 'agregar' | 'editar' | 'eliminar' = 'agregar';

  producto: Producto = {
    id: null,
    nombre: '',
    marca: '',
    modelo: '',
    precio: 0,
    descuento: 0,
    categoriaId: 0,
  };

  categoria: Categoria[] = [];
  departamento: Departamento[] = [];
  cargando = true;
  groupedCategories: SelectItemGroup[] | undefined;
  selectedCategory: string | undefined;

  constructor(
    private productosService: ProductosService,
    private categoriaService: CategoriaService,
    private departamentosService: DepartamentosService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.departamentosService.obtenerDepartamentos().subscribe((departamentos) => {
      this.departamento = departamentos;

      this.categoriaService.obtenerCategorias().subscribe((categorias) => {
        this.categoria = categorias;
        this.cargando = false;
      });
    });
  }

  regresar(): void {
    this.router.navigate(['productos/admin']);
    this.messageService.add({
      severity: 'success',
      summary: 'Producto Agregado',
    });
  }

  onHSubmit(producto: Producto) {
    this.crearProducto(producto);
  }

  crearProducto(producto: Producto) {
    let nuevoProducto: Producto = producto;
    this.productosService.agregarProducto(nuevoProducto).subscribe(() => {
      this.regresar();
    });
  }
}
