import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { AgregarComponent } from './agregar/agregar.component';
import { DetallesComponent } from './detalles/detalles.component';
import { EditarComponent } from './editar/editar.component';
import { EliminarComponent } from './eliminar/eliminar.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { CardModule } from 'primeng/card';
import { DataViewModule } from 'primeng/dataview';
import { ScrollerModule } from 'primeng/scroller';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { BadgeModule } from 'primeng/badge';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { FormularioProductoComponent } from './formulario-producto/formulario-producto.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';

const productosRouting: Routes = [
  { path: '', component: AdminComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'agregar', component: AgregarComponent },
  { path: 'detalles/:id', component: DetallesComponent },
  { path: 'editar/:id', component: EditarComponent },
  { path: 'eliminar/:id', component: EliminarComponent },
];


@NgModule({
  declarations: [
    AdminComponent,
    AgregarComponent,
    DetallesComponent,
    EditarComponent,
    EliminarComponent,
    BreadcrumbComponent,
    FormularioProductoComponent,
  ],
  exports:[
    RouterModule
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(productosRouting),
    FormsModule,
    ReactiveFormsModule,

    TableModule,
    ButtonModule,
    SplitButtonModule,
    CardModule,
    DataViewModule,
    ScrollerModule,
    BadgeModule,
    BreadcrumbModule,
    ProgressSpinnerModule,
    InputNumberModule,
    DropdownModule,
  ],
})
export class ProductosModule { }
