import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Revista } from '../interface/revista';

@Injectable({
  providedIn: 'root'
})
export class RevistaService {
  listRevistas: Revista[];

  constructor(private http: HttpClient) { }

  getAllRevistas(_year?: number) {
    if (!_year) { _year = new Date().getFullYear(); }

    this.listRevistas = undefined;

    interface Resp {
      err: number;
      message: string;
      revistas: Revista[];
    }

    this.http.get( 'https://c3wsapi.cl/sg/revista/getAllRevistasByYear/' + _year )
      .toPromise()
      .then(
        (res: Resp) => {
          res.revistas.forEach(revista => {
            revista.fecha_publicacion_item = new Date(revista.fecha_publicacion_item);
          });

          this.listRevistas = res.revistas;
        }
      );
  }
}
