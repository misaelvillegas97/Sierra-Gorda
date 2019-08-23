export interface ResponseNews {
  err: number;
  message: string;
  noticias: Noticia[];
}

export interface ResponseNews {
  err: number;
  message: string;
  noticia: NoticiaDetalle;
}


export interface Noticia {
  cantidad_megusta: number;
  comentario: Comentario[];
  fecha: Date;
  id: number;
  // Tipo de forma en que se muestra la información
  id_formato_noticia_fk: number;

  // Tipos de noticias
  id_tipo_noticia_fk: number;
    // 1 = Todas
    // 2 = Destacadas
    // 3 = Reportero Minero

  imagen: Imagenes;
  texto_noticia: string;
  titulo_noticia: string;
}

export interface NoticiaID {
  id_noticia: number;
  tipo: number;
}

export interface NoticiaDetalle {
  id_noticia: number;
  titulo_noticia: string;
  texto_noticia: string;
  fecha: Date;
  cantidad_megusta: number;
  id_tipo_noticia_fk: number;
  id_formato_noticia: number;
  usuario: Usuario_reportero;
  imagen: Imagenes;
  comentario: Comentario[];
}

export interface Usuario_reportero {
  url_img?: string;
  apellido?: string;
  car?: string;
  lugar_trabajo?: string;
  nombre?: string;
  sociedad?: string;
}

export interface Comentario {
  comentario: string;
  fecha?: Date;
  id_comentario_usuario_noticia: number;
  usuario: UsuarioComentario;
}

export interface UsuarioComentario {
  id: number;
  nombre: string;
  apellido: string;
  url_img_perfil: string;
}

export interface Imagenes {
  imagen_cuerpo_1: string;
  imagen_cuerpo_2: string;
  imagen_cuerpo_3: string;
  imagen_cuerpo_full: string;
}
