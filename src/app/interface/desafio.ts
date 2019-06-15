export interface Encargado {
  id_usuario: number;
  rut_usuario: number;
  dv_usuario: number;
  primer_nombre_usuario: string;
  segundo_nombre_usuario: string;
  apellido_pat_usuario: string;
  apellido_mat_usuario: string;
  correo_usuario: string;
  telefono_usuario: number;
  img_perfil_usuario: string;
  fecha_nacimiento_usuario: Date;
  nombre_cargo: string;
  nombre_gerencia: string;
  nombre_superintendencia: string;
  nombre_vice: string;
  nivel_nom: string;
  nombre_lugar_trabajo: string;
  token: string;
  cantidad_recon: number;
}

export interface Area {
  id: number;
  nombre_gerencia: string;
}

export interface Valor {
  id: number;
  titulo_valor: string;
  descripcion: string;
}

export interface FormularioDesafio {
  id_usuario: number;
  titulo: string;
  descripcion: string;
  area: number;
  valor: number;
  justificacion: string;
  descripcion_impacto: string;
  impacto: number;
  dificultad: number;
  texto_ad: string;
}
