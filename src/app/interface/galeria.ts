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
