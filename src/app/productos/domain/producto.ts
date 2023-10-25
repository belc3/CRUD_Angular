export interface Producto {
    id?: number;
    nombre: string;
    marca: string;
    modelo: string;
    precio: number;
    descuento: number;
    categoriaId: number;        
  }