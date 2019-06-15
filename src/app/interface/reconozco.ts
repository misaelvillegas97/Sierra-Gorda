import { UsuarioBuscar } from './interface';

export interface Reconocimiento {
  cantidad_likes: number;
  comentario: string;
  fecha: Date;
  id: number;
  id_reconocedor: number;
  megusta: boolean;
  nombre_comportamiento: string;
  nombre_valor: string;
  nombre_gerencia: Grupo[];
  reconocedor: UsuarioReconocimiento;
  reconocido: UsuarioBuscar[];
  url_img: string;
  valor_comportamiento: number;
}

export interface UsuarioReconocimiento {
  id: number;
  primer_nombre: string;
  apellido_paterno: string;
  lugar_trabajo: string;
  cargo: string;
  url_img: string;
}

interface Grupo {
  nombre_grupo: string;
}

export interface Valor {
  id: number;
  nombre: string;
  estado_staff: number;
  estado_gru: number;
  comportamientos: Comportamiento[];
}

export interface Comportamiento {
  id_valor_comportamiento: number;
  nombre_comportamiento: string;
}
