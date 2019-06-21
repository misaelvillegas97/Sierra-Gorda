export interface ResponseCategories {
  err: number;
  message: string;
  categorias: Category[];
}

export interface Category {
  id: number;
  nombre: string;
}

export interface ResponseVideos {
  err: number;
  message: string;
  portal: Video[];
}

export interface Video {
  id: number;
  titulo: string;
  url_video: string;
  url_img: string;
  descripcion?: string;
  id_categoria?: number;
  fecha_creacion?: Date;
}
