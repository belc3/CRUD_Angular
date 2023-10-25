import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Producto } from '../domain/producto';
import {FormBuilder,Validators,FormGroup,FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { SelectItemGroup } from 'primeng/api';
import { Categoria } from '../domain/categoria';
import { Departamento } from '../domain/departamento';

@Component({
  selector: 'rsig-app-formulario-producto',
  templateUrl: './formulario-producto.component.html',
  styleUrls: ['./formulario-producto.component.css'],
})
export class FormularioProductoComponent implements OnInit {
  @Input() producto: Producto;
  @Input() categoria: Categoria[];
  @Input() departamento: Departamento[];
  @Input() modo: 'agregar' | 'editar' | 'eliminar';
  @Output() onSubmit: EventEmitter<Producto> = new EventEmitter<Producto>();

  submitClicked: boolean = false;
  porductoActualizado: any;
  groupedCategories: SelectItemGroup[] = [];
  selectedCategory: string | undefined;

  productoForm = new FormGroup({
    id: new FormControl(),
    nombre: new FormControl('', Validators.required),
    marca: new FormControl('', Validators.required),
    modelo: new FormControl('', Validators.required),
    precio: new FormControl(null, [Validators.required, Validators.min(0)]),
    descuento: new FormControl(),
    categoriaId: new FormControl(null, Validators.required),
  });

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.groupedCategories = this.groupCategoriesByDepartamento();
    this.initializeForm();
  }

  groupCategoriesByDepartamento(): SelectItemGroup[] {
    const groupedCategories: SelectItemGroup[] = [];

    if (this.departamento && this.categoria) {
      this.departamento.forEach((departamento) => {
        const group: SelectItemGroup = {
          label: departamento.nombre,
          value: departamento.id,
          items: this.categoria
            .filter((cat) => cat.departamentoId === departamento.id)
            .map((cat) => ({
              label: cat.nombre,
              value: cat.id,
            })),
        };
        groupedCategories.push(group);
      });
    }
    return groupedCategories;
  }

  private initializeForm(): void {
    this.productoForm = this.fb.group({
      id: [this.producto.id],
      nombre: [
        this.producto.nombre,
        [Validators.required, Validators.maxLength(250)],
      ],
      marca: [
        this.producto.marca,
        [Validators.required, Validators.maxLength(100)],
      ],
      modelo: [
        this.producto.modelo,
        [Validators.required, Validators.maxLength(100)],
      ],
      precio: [
        this.producto.precio,
        [Validators.required, Validators.min(0), Validators.max(999999999)],
      ],
      descuento: [this.producto.descuento, Validators.required],
      categoriaId: [this.producto.categoriaId, Validators.required],
    });

    if (this.modo === 'eliminar') {
      this.disabledForm();
    }
  }

  capitalizeFirstLetter(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  regresar(): void {
    this.router.navigate(['productos/admin']);
  }

  handleSubmit(): void {
    if (this.productoForm.valid) {
      this.submitClicked = true;
      const productoActualizado: Producto = {
        id: this.productoForm.value.id,
        nombre: this.productoForm.value.nombre || '',
        marca: this.productoForm.value.marca || '',
        modelo: this.productoForm.value.modelo || '',
        precio: this.productoForm.value.precio || 0,
        descuento: (Math.floor(Math.random() * 12) * 5 + 15) / 100,
        categoriaId: this.productoForm.value.categoriaId!,
      };
      this.onSubmit.emit(productoActualizado);
    } else {
      this.productoForm.get('nombre')!.markAsTouched();
      this.productoForm.get('marca')!.markAsTouched();
      this.productoForm.get('modelo')!.markAsTouched();
      this.productoForm.get('precio')!.markAsTouched();
      this.productoForm.get('categoriaId')!.markAsTouched();
    }
  }

  disabledForm() {
    this.productoForm.get('nombre')?.disable();
    this.productoForm.get('marca')?.disable();
    this.productoForm.get('modelo')?.disable();
    this.productoForm.get('precio')?.disable();
    this.productoForm.get('categoriaId')?.disable();
  }
}
