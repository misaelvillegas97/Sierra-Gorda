import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Reconocimiento, Valor, Gerencia } from '../interface/reconozco';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsuarioBuscar, RespuestaBuscar } from '../interface/interface';

const URL_SG = 'https://c3wsapi.cl/sg';

@Injectable({
  providedIn: 'root'
})
export class ReconozcoService {

  listReconocimientos: Reconocimiento[];
  listReconocimientosRecibidos: Reconocimiento[];
  listReconocimientosEnviados: Reconocimiento[];


  listValores: Valor[];
  listGerencias: Gerencia[];

  constructor(private http: HttpClient, private router: Router, private snackbar: MatSnackBar) { }

  getReconocimientosOnScroll(_type?: number, _limite?: number, _uid?: number) {
    if (!_type) { _type = 0; }
    if (!_limite) { _limite = 18; }
    if (!_uid) { _uid = 0; }
    const URL_REQUEST = `${URL_SG}/reconozco/getreconocimientos/${_type}/${atob(localStorage.getItem('sg-userID'))}/${_uid}/${_limite}`;

    interface Resp {
      err: number;
      message: string;
      reconocimientos: Reconocimiento[];
    }

    this.http.get(URL_REQUEST).toPromise()
      .then(
        (res: Resp) => {
          res.reconocimientos.forEach(
            (reconocimiento, index) => {
              reconocimiento.fecha = new Date(reconocimiento.fecha);
              if (_type === 0) { // Todos
                if (!this.listReconocimientos) { this.listReconocimientos = []; }
                if (!this.listReconocimientos.find(reco => reco.id === reconocimiento.id)) {
                  this.listReconocimientos.push(reconocimiento);
                }
              }
              // if (_type === 1) { // Recibidos
              //   if (!this.listReconocimientosRecibidos) { this.listReconocimientosRecibidos = []; }
              //   this.listReconocimientosRecibidos.push(reconocimiento);
              // }
              // if (_type === 2) { // Enviados
              //   if (!this.listReconocimientosEnviados) { this.listReconocimientosEnviados = []; }
              //   this.listReconocimientosEnviados.push(reconocimiento);
              // }
            }
          );
        }
      );

  }

  getAllReconocimientos(_type?: number) {
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
          res.reconocimientos.forEach(reconocimiento => { if (reconocimiento.fecha) { reconocimiento.fecha = new Date(reconocimiento.fecha); } });

          if (_type === 0) { this.listReconocimientos = res.reconocimientos; } // Todos
          if (_type === 1) { this.listReconocimientosRecibidos = res.reconocimientos; } // Recibidos
          if (_type === 2) { this.listReconocimientosEnviados = res.reconocimientos; } // Enviados
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

  getValoresOnChange(_modalidad: number, _equipo: number) {
    this.listValores = undefined;

    const URL_REQUEST = `${URL_SG}/reconozco/getvaloreslimtest/${_modalidad}/${_equipo}`;

    this.http.get(URL_REQUEST).toPromise()
      .then(
        (res) => {
          console.log(res);
          this.listValores = res['valores'];
        }
      );
  }

  getAllGerencias() {
    const URL_REQUEST = `${URL_SG}/empresa/gerencias`;

    this.http.get(URL_REQUEST).toPromise()
      .then(
        (res) => {
          this.listGerencias = res['gerencias'];
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

  sendReconocimiento(_reconocimiento: any) {
    const URL_REQUEST = `${URL_SG}/reconozco/reconocer/`;
    this.http.post(URL_REQUEST, _reconocimiento).toPromise()
      .then(
        res => {
          // console.log(res);
          this.snackbar.open('Se ha realizado correctamente el reconocimiento', null, {
            duration: 3000,
            verticalPosition: 'bottom',
            horizontalPosition: 'right',
            panelClass: ['snackbar-login'],
            announcementMessage: 'Mensaje de bienvenida'
          });
          this.router.navigateByUrl('/te-reconozco');
        }
      );
  }

  async searchUsers(_nombre: string, _nivel: number, _type: number) {
    let respuesta: UsuarioBuscar[] = [];

    await this.http.get(URL_SG + `/reconozco/buscareconocido/${_nombre}/${_nivel}/${_type}`)
      .toPromise()
      .then(
        (res: RespuestaBuscar) => {
          if (res.err === 404) {
            return [];
          }
          respuesta = res.usuarios;
          return respuesta;
        }
      ).catch(
        err => {
          respuesta = [];
          return respuesta;
        }
      );
    return respuesta;
  }
}
