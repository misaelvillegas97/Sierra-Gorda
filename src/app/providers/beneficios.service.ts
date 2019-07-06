import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Categoria, Beneficio, ResponseCategoria, ResponseBeneficios, BeneficioDetalle } from '../interface/beneficios';
import { MatSnackBar } from '@angular/material/snack-bar';

const URL = 'https://c3wsapi.cl/sg/';

@Injectable({
  providedIn: 'root'
})
export class BeneficiosService {
  listaCategorias: Categoria[];
  listaBeneficiosCat: Beneficio[];

  constructor( private http: HttpClient, private snackbar: MatSnackBar ) { }

  getAllCategorias() {
    this.http.get( URL + 'beneficios/allcategorias' )
      .toPromise()
      .then(
        (res: ResponseCategoria) => {
          this.listaCategorias = res.categorias;
        }
      );
  }

  async getAllBeneficiosPorCategorias(_id: number) {
    this.listaBeneficiosCat = undefined;
    console.log(this.listaBeneficiosCat);
    await this.http.get( URL + 'beneficios/beneficioscategoria/' + _id )
      .toPromise()
      .then(
        (res: ResponseBeneficios) => {
          this.listaBeneficiosCat = res.beneficios;
        }
      );
    return true;
  }

  async getBeneficioPorId(_id: number) {
    let beneficio: BeneficioDetalle;
    await this.http.get( URL + 'beneficios/getbeneficioconid/' + _id )
      .toPromise()
      .then(
        (res: ResponseBeneficios) => {
          beneficio = res.beneficio;
        }
      );

    return beneficio;
  }

  sendFormularioToEmail(_url: string) {
    const URL_REQUEST = `${URL}beneficios/agregarbenestado/`;

    const DATA = {
      id_usuario: parseInt(atob(localStorage.getItem('sg-userID')), 0),
      url: _url
    };

    this.http.post(URL_REQUEST, DATA).toPromise()
      .then(
        res => {
          if (res['err']) {
            return;
          }

          this.snackbar.open('Se ha enviado la solicitud para enviar documento al correo', null, {
            duration: 5000,
            verticalPosition: 'bottom',
            horizontalPosition: 'right',
            panelClass: ['snackbar-login']
          });
        }
      );
  }

}
