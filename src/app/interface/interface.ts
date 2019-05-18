import { Time } from '@angular/common';

export interface RespuestaLogin {
  err: number;
  message: string;
  userauth: Usuario;
}

// export interface LoggedUser {
//   apellido_materno?: string;
//   apellido_paterno?: string;
//   cargo?: string;
//   dv_rut: number;
//   email?: string;
//   fecha_creacion?: Date;
//   fecha_nacimiento?: Date;
//   gerencia?: string;
//   id: number;
//   lugar_trabajo?: string;
//   pass?: string;
//   primer_nombre: string;
//   rut: number;
//   segundo_nombre?: string;
//   telefono?: string;
//   tercer_nombre?: string;
//   url_img?: string;
//   privilegio?: string;
// }

export interface RespuestaStatus {
  err: number;
  message: string;
  usuario: Usuario;
}

export interface RespuestaBuscar {
  err: number;
  message: string;
  usuarios: UsuarioBuscar[];
}

export interface UsuarioBuscar {
  apellido_mat_usuario?: string;
  apellido_pat_usuario?: string;
  cantidad_recon?: number;
  correo_usuario?: string;
  dv_usuario?: string;
  fecha_nacimiento_usuario?: Date;
  id_estado_usuario_fk?: number;
  id_usuario?: number;
  img_perfil_usuario?: string;
  nombre_cargo?: string;
  nombre_gerencia?: string;
  nombre_lugar_trabajo?: string;
  pass_usuario?: string;
  primer_nombre_usuario?: string;
  rut_usuario?: string;
  segundo_nombre_usuario?: string;
  telefono_usuario?: string;
  tercer_nombre_usuario?: string;
  token?: string;
}

export interface Usuario {
  apellido_mat_usuario?: string;
  apellido_pat_usuario: string;
  cantidad_recon?: string;
  correo_usuario?: string;
  dv_usuario: string;
  fecha_creacion_usuario: string;
  fecha_nacimiento_usuario: string;
  id_estado_usuario_fk: number;
  id_priv?: number;
  id_usuario: number;
  img_perfil_usuario?: string;
  nombre_cargo?: string;
  nombre_gerencia?: string;
  nombre_lugar_trabajo?: string;
  nombre_superintendencia?: string;
  primer_nombre_usuario: string;
  rut_usuario: string;
  segundo_nombre_usuario?: string;
  telefono_usuario?: string;
  tercer_nombre_usuario?: string;
  token?: string;
}

export interface ResponsePosition {
  err: number;
  message: string;
  cargo: Positions[];
}

export interface Positions {
  id: number;
  nombre_cargo: string;
}

export interface ResponsePlaces {
  err: number;
  message: string;
  lugar_trabajo: Places[];
}

export interface Places {
  id: 2;
  nombre_lugar_trabajo: string;
  direccion_trabajo: string;
  comuna: string;
  region: string;
}

export interface ResponseGerency {
  err: number;
  message: string;
  gerencias: Gerencies[];
}

export interface Gerencies {
  id: number;
  nombre_gerencia: string;
}

//#region actividades
export interface ResponseNumberActivityByMonth {
  err: number;
  message: string;
  actividades: ActivityList[];
}

export interface ActivityList {
  dia: number;
  cantidad_eventos: number;
  evento: Activity[];
}

export interface Activity {
  id: number;
  titulo_actividad: string;
  descripcion_actividad?: string;
  horario_inicio?: Time;
  horario_fin?: Time;
  fecha_actividad: Date;
  ubicacion_actividad?: string;
  nombre_lugar_trabajo?: string;
  img_portada?: string;
  interes_asistencia?: InterestAssistance[];
}

export interface ResponseInterestAssistance {
  err: number;
  message: string;
  actividad: InterestAssistance[];
}

export interface InterestAssistance {
  id: number;
  valor: number; // <-- Cantidad de interes o asistencia.
  meinteresa: boolean;
}
//#endregion

//#region encuestas
export interface ResponsePolls {
  err: number;
  message: string;
  encuestas: Poll[]
}

export interface Poll {
  id: number;
  titulo: string;
  visto: number;
  preguntas: Question[];
}

export interface Question {
  id_pregunta: number;
  texto_pregunta: string;
  tipo: number;
  alternativas: Alternative[];
}

export interface Alternative {
  id_alternativa: number;
  texto: string;
}
//#endregion

//#region conversaciones

export interface ResponseAllChats {
  err: any;
  message: string;
  chats: Chat[];
}

export interface Chat {
  id: number;
  destinatario: Receiver;
  cont_novisto: number;
  fecha_ult_mensaje: Date;
}

export interface Receiver {
    telefono: string;
    cargo: string;
    lugar_trabajo: string;
    token: string;
    id_usuario: number;
    primer_nombre_usuario: string;
    segundo_nombre_usuario?: string;
    tercer_nombre_usuario?: string;
    apellido_pat_usuario?: string;
    apellido_mat_usuario?: string;
    img_perfil_usuario?: string;
    gerencia?: string;
    fecha_nacimiento: string;
}

export interface ResponseChatById {
  err: number;
  message: string;
  data: Messages[];
}

export interface Messages {
  id: number;
  fecha: Date;
  texto: string;
  visto: number;
  id_remitente: number;
  id_destinatario: number;
}

//#endregion

//#region galeria

export interface ResponseGallery {
  err: number;
  message: string;
  banners: Gallery[];
}

export interface Gallery {
  fecha_creacion_noticia: Date;
  formato: number;
  id_noticia: number;
  titulo_noticia: string;
  url_img_noticia: string;
  titulo_1?: string;
  titulo_2?: string;
}

//#endregion

//#region Cumpleaños

export interface ResponseBirthday {
  err: number;
  message: string;
  usuarios: Usuario[];
}

//#endregion
