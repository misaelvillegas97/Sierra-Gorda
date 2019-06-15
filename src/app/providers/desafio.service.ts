import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Encargado, Area, Valor, FormularioDesafio } from '../interface/desafio';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

const URL_SG = 'https://c3wsapi.cl/sg';

@Injectable({
  providedIn: 'root'
})
export class DesafioService {
  listEncargados: Encargado[];
  listAreas: Area[];
  listValores: Valor[];

  constructor(private http: HttpClient, private snackbar: MatSnackBar, private route: Router) { }

  insert(_d: FormularioDesafio) {
    const URL_REQUEST = `${URL_SG}/desafio/insertar_desafio`;

    this.http.post( URL_REQUEST, _d ).toPromise()
      .then(
        (res) => {
          console.log(res);
          this.snackbar.open('Tu iniciativa ha sido enviada con éxito', null, {
            duration: 3000,
            verticalPosition: 'bottom',
            horizontalPosition: 'right',
            panelClass: ['snackbar-success'],
            announcementMessage: 'Mensaje de éxito'
          });
          this.route.navigateByUrl('/desafio-austeridad');
        }
      );
  }

  getAllEncargados() {
    const URL_REQUEST = `${URL_SG}/desafio/allencargados`;

    this.http.get(URL_REQUEST).toPromise()
      .then(
        res => {
          // tslint:disable-next-line: no-string-literal
          this.listEncargados = res['usuario'];
        }
      );
  }

  getAllAreas() {
    const URL_REQUEST = `${URL_SG}/desafio/areas`;

    this.http.get(URL_REQUEST).toPromise()
      .then(
        res => {
          // tslint:disable-next-line: no-string-literal
          this.listAreas = res['gerencias'];
        }
      );
  }

  getAllValores() {
    const URL_REQUEST = `${URL_SG}/desafio/valores`;

    this.http.get(URL_REQUEST).toPromise()
      .then(
        res => {
          // tslint:disable-next-line: no-string-literal
          this.listValores = res['valores'];
        }
      );
  }
}
