import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseResultados, ResultadoItem } from '../interface/index';

@Injectable({
  providedIn: 'root'
})
export class IndexService {
  infoUV;
  infoUVMessage: string = undefined;
  listaresultado: ResultadoItem[];
  constructor(private http: HttpClient) {
    // console.log('Servicio Index');
    this.getLocation();
    // console.log(navigator.geolocation);
  }

  async getLocation() {
    const options: PositionOptions = {
      enableHighAccuracy: true,
      timeout: 50000,
      maximumAge: 0
    };

    navigator.geolocation.getCurrentPosition(success, error, options);

    const _ = this;
    // Función si es que recibe información
    function success(pos) {
      // console.log(pos);
      _.getAllUV(pos.coords.latitude, pos.coords.longitude);
    }

    // Función si es que da error en la consulta o usuario no acepta permisos
    function error(err) {
      switch (err.code) {
        case 1:
          _.infoUVMessage = 'No se han aceptado los permisos de ubicación.';
          break;
        case 2:
          _.infoUVMessage = 'No se ha podido obtener la ubicación GPS';
          break;
        case 3:
          _.infoUVMessage = 'Se ha agotado el tiempo de espera.';
          break;
      }
    }
  }

  async getAllUV(_latitud: number, _longitud: number) {
    const url =
      'https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/66dae31c35fc699c2030925d35105ca3/';
    const urlData = '?exclude=minutely,hourly,alerts,flags&lang=es&units=auto';

    const valorfinal = url + _latitud + ',' + _longitud + urlData;
    this.http
      .get(valorfinal)
      .toPromise()
      .then(res => {
        // console.log(res);
        this.infoUV = res;
      });
  }

  getAllResultados() {
    this.listaresultado = undefined;
    const url = 'https://c3wsapi.cl/sg/resultados/allresultados';
    this.http
      .get(url)
      .toPromise()
      .then((returndata: ResponseResultados) => {
        //  console.table(returndata.resultados);
        // this.listaresultado = returndata.resultados;
        // returndata.resultados.forEach(resultado => {
        //   console.log(resultado);
        //   resultado.fecha_diario_indice = new Date(resultado.fecha_diario_indice);
        //   this.listaresultado.push(resultado);
        // });

        // tslint:disable-next-line: prefer-for-of
         for (let i = 0; i < returndata.resultados.length; i++) {
          if (!this.listaresultado) {
            this.listaresultado = [];
          }
          const resultado = returndata.resultados[i];
          resultado.fecha_diario_indice = new Date(resultado.fecha_diario_indice);
          this.listaresultado.push(resultado);
        }
      });
  }
}
