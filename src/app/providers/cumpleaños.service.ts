import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseBirthday, Usuario } from '../interface/interface';

@Injectable({
  providedIn: 'root'
})
export class CumpleañosService {
  birthList: Usuario[][];

  constructor(private http: HttpClient) {
  }

  async getAllBirth(_count: number, _date?: Date) {
    if (!_date) {
      _date = new Date();
    }
    this.birthList = undefined;
    // this.http.get('http://c3wsapi.cl:2200/sg/usuario/usuario_mesdia/' + new Date().getMonth() + '/' + new Date().getDate())
    this.http.get(`https://c3wsapi.cl/sg/usuario/usuario_mesdia/${(_date.getMonth() + 1)}/${_date.getDate()}`)
      .toPromise()
      .then(
        (res: ResponseBirthday) => {
          if (res.err) {
            this.birthList = [];
            return;
          }

          if (!this.birthList) {
            this.birthList = [];
          }

          let array: Usuario[] = [];
          if (res.usuarios.length > _count) {
            let contador = 0;
            for (let i = 0; i < res.usuarios.length; i++) {
              if ( i % _count === 0 && i !== 0) {
                this.birthList[contador] = array;
                array = [];
                contador ++;
              }
              const usuario = res.usuarios[i];
              array.push(usuario);

              if (i === (res.usuarios.length - 1)) {
                this.birthList[contador] = array;
              }
              // console.log(array);
            }
          } else {
            this.birthList[0] = res.usuarios;
          }
          // console.log(this.birthList);
          return;
        }
      )
      .catch(
        err => {
          //alert('No hay conexión con el servidor');
        }
      );
  }

  async getCumpleDays(_month?: number) {
    if (!_month) { _month = (new Date().getMonth() + 1); }
    let array: number[];

    interface Resp {
      err: number;
      message: string;
      dias: number[];
    }

    await this.http.get(`https://c3wsapi.cl/sg/usuario/dias_nacimiento/${_month}`)
      .toPromise()
      .then(
        (res: Resp) => {
          array = res.dias;
        }
      );

    return array;
  }
}
