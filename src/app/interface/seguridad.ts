import { Time } from '@angular/common';

export interface ResponseIncidente {
  err: number;
  message: string;
  seguridad: Incidente[];
}

export interface Incidente {
  resumen: string;
  id_incidente: number;
  titulo_incidente: string;
  img_url_incidente: string;
  contexto: Contexto;
  info: InfoIncidente;
  acciones: Acciones[];
  posterior_causas: PosteriorCausas[];
  posterior_acciones: PosteriorAccion[];
  aprendizaje: Aprendizaje[];
}

export interface Aprendizaje {
  descripcion_aprendizaje: string;
}

export interface Acciones {
  descripcion_accion: string;
}

export interface PosteriorCausas {
  descripcion_causa: string;
}

export interface PosteriorAccion {
  descripcion_accion: string;
}

export interface InfoIncidente {
  id_info_incidente: number;
  numero_incidente: number;
  nivel_incidente: string;
  area_incidente: string;
  descripcion_incidente: string;
}

export interface Contexto {
  id_contexto_incidente: number;
  nombre_incidente: string;
  fecha_incidente: Date;
  hora_incidente: Time;
  posicion: string;
  edificio_incidente: string;
}

export interface ResponseCampanias {
  err: number;
  message: string;
  campanias: Campania[];
}

export interface Campania {
  id_campania: number;
  titulo_campania: string;
  url: string;
  formato_tipo: string;
}
