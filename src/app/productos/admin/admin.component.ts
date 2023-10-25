import { Component, OnInit } from '@angular/core';
import { Producto } from '../domain/producto';
import { Router } from '@angular/router';
import { ProductosService } from '../services/productos.service';
import * as XLSX from 'xlsx';
import { Categoria } from '../domain/categoria';
import { CategoriaService } from '../services/categoria.service';
import { CurrencyPipe } from '@angular/common';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'rsig-app-admin',
  templateUrl: './admin.component.html',
})

export class AdminComponent implements OnInit {
  productos!: Producto[];
  categoria!: Categoria[];
  admin: string = 'Admin';
  items: MenuItem[];
  productoSeleccionadoId: number | null = null;
  cargando = true;

  constructor(
    private router: Router,
    private productosService: ProductosService,
    private categoriaService: CategoriaService
  ) {
    this.items = [
      {
        label: 'Editar',
        icon: 'pi pi-file-edit',
        command: () => {
          if (this.productoSeleccionadoId) {
            this.editarProducto(this.productoSeleccionadoId);
          }
        },
      },
      {
        label: 'Eliminar',
        icon: 'pi pi-trash',
        command: () => {
          if (this.productoSeleccionadoId) {
            this.eliminarProducto(this.productoSeleccionadoId);
          }
        },
      },
    ];
  }

  ngOnInit(): void {
    this.obtenerProductos();
    this.obtenerCategorias();
  }

  obtenerProductos() {
    this.productosService.obtenerProductos().subscribe((productos: Producto[]) => {
      this.productos = productos;
      this.cargando = false;
    });
  }

  obtenerCategorias() {
    this.categoriaService.obtenerCategorias().subscribe((categorias: Categoria[]) => {
      this.categoria = categorias;
    });
  }

  obtenerProductoById(id: number): void {
    this.productoSeleccionadoId = id;
    this.router.navigate(['/productos/detalles/', id]);
  }

  editarProducto(id: number): void {
    this.router.navigate(['/productos/editar/', id]);
  }

  eliminarProducto(id: number): void {
    this.router.navigate(['/productos/eliminar/', id]);
  }

  agregarProducto(): void {
    this.router.navigate(['/productos/agregar']);
  }
  onDropDownClick(id: number | null) {
    this.productoSeleccionadoId = id;
  }

  exportExcel() {
    if (!this.productos || this.productos.length === 0) {
      return;
    }

    const currencyPipe = new CurrencyPipe('en-US');

    const data = this.productos.map((producto) => {
      const categoria = this.categoria.find(
        (c) => c.id === producto.categoriaId
      );
      const categoriaNombre = categoria ? categoria.nombre : '';
      const precioFormateado = currencyPipe.transform(
        producto.precio,
        'USD',
        'symbol',
        '1.2-2'
      );

      return {
        Id: producto.id,
        Nombre: producto.nombre,
        Modelo: producto.modelo,
        Precio: precioFormateado,
        Categoría: categoriaNombre,
      };
    });

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Productos');

    const timestamp = Date.now();
    const fileName = `products_export_${timestamp}.xlsx`;

    XLSX.writeFile(wb, fileName);
  }
}
