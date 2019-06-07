import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseIncidente, Incidente, Campania, ResponseCampanias } from '../interface/seguridad';

const URL_SG = 'https://c3wsapi.cl/sg/';

@Injectable({
  providedIn: 'root'
})
export class SeguridadService {
  listaIncidentes: Incidente[];
  listaCampanias: Campania[];

  constructor( private http: HttpClient ) { }


  getAllIncidentes() {
    this.listaIncidentes = undefined;
    this.http.get( URL_SG + 'seguridad/getincidentecontodos/' )
      .toPromise()
      .then(
        (res: ResponseIncidente) => {
          this.listaIncidentes = res.seguridad;
        }
      );
  }

  getAllCampanias() {
    this.listaCampanias = undefined;

    this.http.get( URL_SG + 'seguridad/campanias')
      .toPromise()
      .then(
        (res: ResponseCampanias) => {
          this.listaCampanias = res.campanias;
        }
      );
  }

}
