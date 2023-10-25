import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'rsig-app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css'],
})
export class BreadcrumbComponent {
  breadCrumbs: Array<{ label: string; url: string }> = [];

  constructor(private location: Location) {}

  items: MenuItem[] | undefined;
  home: MenuItem | undefined;

  @Input() value: string = 'Primer por defecto';

  ngOnInit() {
    this.items = [{ label: this.value }];
    this.home = { icon: 'pi pi-home', routerLink: '/' };
  }

  regresar(): void {
    this.location.back();
  }
}
