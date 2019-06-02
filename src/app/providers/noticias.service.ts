import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Noticia, ResponseNews, NoticiaDetalle } from '../interface/noticia';

const URL_SG = 'http://c3wsapi.cl:2200/sg/';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  listaNoticias: Noticia[];
  listaNoticiasDestacadas: Noticia[];
  listaNoticiasReportero: Noticia[];

  constructor( private http: HttpClient ) {}

  /**
   *
   * @param {number} [_limit] Límite de resultados por página
   * @param {number} [_index] (Página actual) paginaActual-1 * limite de página -> (_index - 1) * _limit
   * @param {number} [_tipo] 1: Todas | 2: Destacadas | 3: Reportero Minero
   * @memberof NoticiasService
   */
  getNoticias(_limit?: number, _index?: number, _tipo?: number) {
    if (!_index) { _index = 1; }
    if (!_limit) { _limit = 16; }
    if (!_tipo) { _tipo = 1; }

    _index = (_index - 1) * _limit;

    this.http.get(URL_SG + `noticias/getallnoticias/${_index}/${_limit}/${_tipo}`)
      .toPromise()
      .then(
        (res: ResponseNews) => {
          // console.log(res);
          switch(_tipo) {
            // Todas las noticias
            case 1:
              res.noticias.forEach(noticia => {
                noticia.fecha = new Date(noticia.fecha);
              });
              this.listaNoticias = res.noticias;
              break;
            // Destacadas
            case 2:
              res.noticias.forEach(noticia => {
                noticia.fecha = new Date(noticia.fecha);
              });
              this.listaNoticiasDestacadas = res.noticias;
              break;
            // Reportero Minero
            case 2:
              res.noticias.forEach(noticia => {
                noticia.fecha = new Date(noticia.fecha);
              });
              this.listaNoticiasReportero = res.noticias;
              break;
          }
        }
      );
  }

  async getNoticiaById(_id: number) {
    let noticia: NoticiaDetalle;

    await this.http.get( URL_SG + `noticias/getnoticiaconid/${_id}` )
      .toPromise()
      .then(
        (res: ResponseNews) => {
          // console.log(res.noticia);
          res.noticia.fecha = new Date(res.noticia.fecha);
          res.noticia.comentario.forEach(comentario => {
            if (comentario.fecha) {
              comentario.fecha = new Date(comentario.fecha);
            }
          });
          console.log(res.noticia.fecha.getDate());
          noticia = res.noticia;
        }
      );

    return noticia;
  }

  filterNoticiaById(_id: number, _type: number): Noticia {
    let noticiaSeleccionada: Noticia;

    switch (_type) {
      case 1:
        noticiaSeleccionada = this.listaNoticias.find(
          noticia => noticia.id === _id
        );
        break;

      case 2:
        noticiaSeleccionada = this.listaNoticiasDestacadas.find(
          noticia => noticia.id === _id
        );
        break;

      case 3:
        noticiaSeleccionada = this.listaNoticiasReportero.find(
          noticia => noticia.id === _id
        );
        break;
    }

    return noticiaSeleccionada;
  }

  validateArray(_type: number): boolean {
    let response = false;
    switch (_type) {
      case 1:
        if (this.listaNoticias) {
          response = true;
        }
        break;

      case 2:
        if (this.listaNoticiasDestacadas) {
          response = true;
        }
        break;

      case 3:
        if (this.listaNoticiasReportero) {
          response = true;
        }
        break;
    }
    return response;
  }

}
