import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Noticia, ResponseNews, NoticiaDetalle, Comentario, NoticiaID } from '../interface/noticia';

const URL_SG = 'https://c3wsapi.cl/sg/';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  listaNoticias: Noticia[];
  listaNoticiasDestacadas: Noticia[];
  listaNoticiasReportero: Noticia[];
  listaNoticiasID: NoticiaID[];

  constructor(private http: HttpClient) { }

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

    if (_tipo === 1) { this.listaNoticias = undefined; }
    if (_tipo === 2) { this.listaNoticiasDestacadas = undefined; }
    if (_tipo === 3) { this.listaNoticiasReportero = undefined; }

    // this.http.get(URL_SG + `noticias/getallnoticias/${_index}/${_limit}/${_tipo}`)
    this.http.get(URL_SG + `noticias/getallnoticias/${_index}/${_limit}/${_tipo}`)
      .toPromise()
      .then(
        (res: ResponseNews) => {
          // console.log(res);
          switch (_tipo) {

            case 1: // Todas las noticias
              res.noticias.forEach(noticia => {
                noticia.fecha = new Date(noticia.fecha);
              });
              this.listaNoticias = res.noticias;
              break;

            case 2: // Destacadas
              res.noticias.forEach(noticia => {
                noticia.fecha = new Date(noticia.fecha);
              });
              this.listaNoticiasDestacadas = res.noticias;
              break;

            case 3: // Reportero Minero
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

    await this.http.get(URL_SG + `noticias/getnoticiaconid/${_id}`)
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

  async getCount(_type: number): Promise<number> {
    let contador = 0;
    if (!_type) { _type = 0; }
    await this.http.get(URL_SG + `noticias/total/${_type}`).toPromise()
      .then(
        (res: { err: number, message: string, noticias: number; }) => {
          contador = res.noticias;
        }
      );

    return contador;
  }

  getIdList() {
    if (!this.listaNoticiasID) {
      this.http.get(URL_SG + `noticias/total_id_tipo`).toPromise()
        .then(
          (res: { err: number; message: string; noticias: NoticiaID[] }) => {
            this.listaNoticiasID = res.noticias;
          }
        );
    }
  }

  /**
   *
   *
   * @param {number} _id Id de la noticia
   * @param {number} _type 1: Todas | 2: Destacadas | 3: Reportero Minero
   * @returns {Noticia} Retorna la noticia encontrada, en caso de no encontrar retornará una noticia con valor 'undefined'
   * @memberof NoticiasService
   */
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

  sendComment(_comment: Comentario, _idNoticia: number): void {
    const DATA = {
      id_usuario: atob(localStorage.getItem('sg-userID')),
      id_noticia: _idNoticia,
      comentario: _comment.comentario
    };
    this.http.post(URL_SG + 'noticia/enviarcomentario', DATA)
      .toPromise()
      .then(
        (res) => {
        }
      );
  }

  sendLike(_idNoticia: number): void {
    const DATA = {
      id_usuario: atob(localStorage.getItem('sg-userID')),
      id_noticia: _idNoticia
    };
    this.http.post(URL_SG + 'noticia/enviarmegusta', DATA)
      .toPromise()
      .then(
        (res) => {
        }
      );
  }

  async getLike(_idNoticia: number) {
    let response = false;
    await this.http.get(URL_SG + `noticias/megusta/${atob(localStorage.getItem('sg-userID'))}/${_idNoticia}`)
      .toPromise()
      .then(
        (res) => {
          response = res['noticias'];
        }
      );
    return response;
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
