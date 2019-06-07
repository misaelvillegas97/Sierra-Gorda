import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Categoria, Beneficio, ResponseCategoria, ResponseBeneficios, BeneficioDetalle } from '../interface/beneficios';

const URL = 'https://c3wsapi.cl/sg/';

@Injectable({
  providedIn: 'root'
})
export class BeneficiosService {
  listaCategorias: Categoria[];
  listaBeneficiosCat: Beneficio[];

  constructor( private http: HttpClient ) { }

  getAllCategorias() {
    this.http.get( URL + 'beneficios/allcategorias' )
      .toPromise()
      .then(
        (res: ResponseCategoria) => {
          this.listaCategorias = res.categorias;
        }
      );
  }

  getAllBeneficiosPorCategorias(_id: number) {
    this.listaBeneficiosCat = undefined;
    console.log(this.listaBeneficiosCat);
    this.http.get( URL + 'beneficios/beneficioscategoria/' + _id )
      .toPromise()
      .then(
        (res: ResponseBeneficios) => {
          this.listaBeneficiosCat = res.beneficios;
        }
      );
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


}
