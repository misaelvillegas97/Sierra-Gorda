export interface GaleriaAnual {
  galeria_mes: number;
  visto: boolean;
}

export interface ArregloGaleriaAnual {
  anio: number;
  galeria: GaleriaAnual[];
}

export interface Album {
  id: number;
  nombre: string;
  cuenta: number;
  visto: boolean;
}

export interface AlbumItem {
  id_imagen: number;
  urloriginal: string;
  urlminiatura: string;
  cantidad_megusta: number;
  megusta: boolean;
}


export interface ResponsePicturesByGallery {
  err: number;
  message: string;
  galeria: {
    listaimagenes: AlbumItem[];
  }
}
