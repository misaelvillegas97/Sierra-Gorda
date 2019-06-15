import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Reconocimiento, Valor } from '../interface/reconozco';

const URL_SG = 'https://c3wsapi.cl/sg';

@Injectable({
  providedIn: 'root'
})
export class ReconozcoService {

  listReconocimientos: Reconocimiento[];
  listValores: Valor[];

  constructor(private http: HttpClient) { }

  getAllReconocimientos(_type?: number) {
    this.listReconocimientos = undefined;
    if (!_type) { _type = 0; }
    const URL_REQUEST = `${URL_SG}/reconozco/getreconocimientos_sinlim/${_type}/${atob(localStorage.getItem('sg-userID'))}`;

    interface Resp {
      err: number;
      message: string;
      reconocimientos: Reconocimiento[];
    }

    this.http.get(URL_REQUEST).toPromise()
      .then(
        (res: Resp) => {
          res.reconocimientos.forEach(reconocimiento => {
            if (reconocimiento.fecha) {
              reconocimiento.fecha = new  Date(reconocimiento.fecha);
            }
          });

          this.listReconocimientos = res.reconocimientos;
        }
      );
  }

  getAllValores() {
    const URL_REQUEST = `${URL_SG}/reconozco/getvalores/0/0`;

    this.http.get(URL_REQUEST).toPromise()
      .then(
        (res) => {
          this.listValores = res['valores'];
        }
      );
  }

  async setLike(_idReconocimiento: number) {
    const URL_REQUEST = `${URL_SG}/reconozco/darmegusta/`;
    const DATA = {
      id_reconocimiento: _idReconocimiento,
      id_usuario: atob(localStorage.getItem('sg-userID'))
    };

    return this.http.post(URL_REQUEST, DATA).toPromise()
      .then(
        res => {
          return res;
        }
      );

  }
}
