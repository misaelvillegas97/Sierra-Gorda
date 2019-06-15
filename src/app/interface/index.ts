export interface ResponseResultados {
  err: number;
  message: string;
  resultados: ResultadoItem[];
}

export interface ResultadoItem {
  id_resultado: number;
  codigo: string;
  titulo_resultado: string;
  real_resultado: number;
  presupuesto_resultado: number;
  promedio_actual: number;
  img_url: string;
  fecha_diario_indice: Date;
}
