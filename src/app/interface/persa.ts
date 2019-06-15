import { Receiver } from './interface';

export interface PersaProductItem {
  categoria: number;
  id: number;
  nombre: string;
  valor: number;
  portada: string;
}

export interface ProductDetail {
  categoria: number;
  valor: number;
  nombre: string;
  cantidad_disponible: number;
  descripcion: string;
  imagenes: urlImage[];
  contacto: Receiver;
}

// tslint:disable-next-line: class-name
export interface urlImage {
  url: string;
}

export interface UploadStructure {
  id_usuario?: number;
  id_producto?: number;
  id_categoria: number;
  nombre: string;
  descripcion: string;
  valor: number;
  image1: string;
  image2: string;
  image3: string;
  image4: string;
  cantidad: number;
  formato: string;
}

export interface UserProduct {
  id: number;
  nombre: string;
  fecha: Date;
  valor: number;
  cantidad: number;
  pedidos?: Pedido[];
}

export interface Pedido {
  id: number;
  primer_nombre: string;
  segundo_nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  email: string;
  telefono: number;
  token: string;
  cantidad_comprado: number;
  id_compra: number;
  estado_compra: number;
}
