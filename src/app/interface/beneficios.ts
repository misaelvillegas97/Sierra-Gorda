export interface ResponseCategoria {
  err?: number;
  message: string;
  categorias: Categoria[];
}

export interface Categoria {
  id_categoria: number;
  categoria: string;
}

export interface ResponseBeneficios {
  err?: number;
  message: string;
  beneficios: Beneficio[];
}

export interface ResponseBeneficios {
  err?: number;
  message: string;
  beneficio: BeneficioDetalle;
}

export interface Beneficio {
  id_beneficios: number;
  titulo_beneficio: string;
}

export interface BeneficioDetalle {
  id_beneficios: number;
  nombre_categoria_beneficios: string;
  titulo_beneficio: string;
  descripcion_beneficio: string;
  img_url_beneficio: string;
  mas_info?: string;
  url?: string;

}
