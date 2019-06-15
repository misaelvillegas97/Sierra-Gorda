export interface ResponseCB {
  err: number;
  message: string;
  categorias: CategoriaBranding[];
}

export interface ResponseCB {
  err: number;
  message: string;
  brandings: ItemBranding[];
}

export interface ResponseCB {
  err: number;
  message: string;
  branding: ItemBranding[];
}

export interface CategoriaBranding {
  id_categoria: string;
  categoria: string;
}

export interface ItemBranding {
  id_branding: number;
  nombre: string;
  url: string;
  tipo: number;
  categoria: number;
}
