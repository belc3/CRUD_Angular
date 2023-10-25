import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../services/productos.service';
import { DepartamentosService } from '../services/departamentos.service';
import { CategoriaService } from '../services/categoria.service';

@Component({
  selector: 'rsig-app-detalles',
  templateUrl: './detalles.component.html'  
})

export class DetallesComponent implements OnInit{
  idurl!: number;
  productoId!: number;
  producto: any;
  detalles: string = 'Detalles';
  cargando = true;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private productosService: ProductosService,
    private departamentosService: DepartamentosService,
    private categoriaService: CategoriaService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.productoId = params['id'];
    });

    this.productosService.obtenerProductoById(this.productoId).subscribe((resp) => {
      this.producto = resp;

      this.categoriaService
        .obtenerCategoriaById(this.producto.categoriaId)
        .subscribe((categoria) => {
          this.producto.categoria = categoria;

          this.departamentosService
            .obtenerDepartamentosById(categoria.departamentoId)
            .subscribe((departamento) => {
              categoria['departamento'] = departamento;

              this.cargando = false;
            });
        });
    });
  }

  regresar(): void {
    this.location.back();
  }
}


