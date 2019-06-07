import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseBirthday, Usuario } from '../interface/interface';

@Injectable({
  providedIn: 'root'
})
export class CumpleañosService {
  birthList: Usuario[][] = [];

  constructor(private http: HttpClient) {
    this.getAllBirth();
  }

  getAllBirth() {
    // this.http.get('http://c3wsapi.cl:2200/sg/usuario/usuario_mesdia/' + new Date().getMonth() + '/' + new Date().getDate())
    this.http.get('https://c3wsapi.cl/sg/usuario/usuario_mesdia/04/18')
      .toPromise()
      .then(
        (res: ResponseBirthday) => {
          if (res.err) {
            return;
          }

          if (res.usuarios.length > 4) {
            let contador = 0;
            for (let i = 0; i < res.usuarios.length; i++) {
              if ( contador % 4 === 0 && contador !== 0) {
                contador ++;
              }
              const usuario = res.usuarios[i];
              this.birthList[contador].push(usuario);
              contador ++;
            }
          } else {
            this.birthList[0] = res.usuarios;
          }
          console.log(this.birthList);
          return;
        }
      )
      .catch(
        err => {
          //alert('No hay conexión con el servidor');
        }
      );
  }
}
