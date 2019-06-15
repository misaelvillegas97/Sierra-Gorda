import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { PersaProductItem, ProductDetail, UploadStructure, UserProduct } from '../interface/persa';

import { map } from 'rxjs/operators';

const URL_SG = 'https://c3wsapi.cl/sg';

@Injectable({
  providedIn: 'root'
})
export class PersaService {
  listProductos: PersaProductItem[];
  listUserProduct: UserProduct[];
  selectedItem: ProductDetail;

  constructor(private http: HttpClient) { }

  getAllProduct(_limit: number) {
    interface Resp {
      err: number;
      message: string;
      persa: PersaProductItem[];
    }

    this.http.get( URL_SG + '/persa/getallproductos' )
      .toPromise()
      .then(
        (res: Resp) => {
          this.listProductos = res.persa;
        }
      );
  }

  async getProductById(_id: number) {
    this.selectedItem = undefined;
    interface Resp {
      err: number;
      message: string;
      persa: ProductDetail;
    }

    await this.http.get( URL_SG + '/persa/getproductoconid/' + _id )
      .toPromise()
      .then(
        (res: Resp) => {
          this.selectedItem = res.persa;
        }
      );

    return true;
  }

  async comprar(_idProducto: number, _cantidad: number) {
    let respuesta = false;
    let _idUser;
    if (!_idUser) { _idUser = parseInt(atob(localStorage.getItem('sg-userID')), 0); }
    const URL_REQUEST = `${URL_SG}/persa/comprarproducto/`;
    const DATA = {
      id_producto: _idProducto,
      id_usuario: _idUser,
      cantidad: _cantidad
    };

    await this.http.post(URL_REQUEST, DATA).toPromise()
      .then(
        res => {
          // console.log(res);
          respuesta = res['persa'];
        }
      );

    return respuesta;
  }

  publicar( product: UploadStructure ) {
    return this.http.post( URL_SG + '/persa/agregarproductonew', product , {
      reportProgress: true,
      observe: 'events'
    }).pipe(map((event) => {

      switch (event.type) {

        case HttpEventType.UploadProgress:
          const progress = Math.round(100 * event.loaded / event.total);
          return { status: 'progress', message: progress };

        case HttpEventType.Response:
          return event.body;
        default:
          return `Unhandled event: ${event.type}`;
      }
    })
    );
  }

  editar( product: UploadStructure ) {
    return this.http.post( URL_SG + '/persa/editarprod_img', product , {
      reportProgress: true,
      observe: 'events'
    }).pipe(map((event) => {

      switch (event.type) {

        case HttpEventType.UploadProgress:
          const progress = Math.round(100 * event.loaded / event.total);
          return { status: 'progress', message: progress };

        case HttpEventType.Response:
          return event.body;
        default:
          return `Unhandled event: ${event.type}`;
      }
    })
    );
  }

  getProductByUser(_idUser?: number) {
    if (!_idUser) { _idUser = parseInt(atob(localStorage.getItem('sg-userID')), 0); }
    const URL_REQUEST = `${URL_SG}/persa/getproductousuario/${_idUser}`;

    interface Resp {
      err: number;
      message: string;
      misproductos: UserProduct[];
    }
    this.http.get(URL_REQUEST).toPromise()
      .then(
        (res: Resp) => {
          this.listUserProduct = res.misproductos;
        }
      );
  }

  async vender(_idCompra: number, _state: number) {
    let respuesta = false;
    const URL_REQUEST = `${URL_SG}/persa/actualizarestadocompra/${_idCompra}/${_state}`;

    this.http.get(URL_REQUEST).toPromise()
      .then(
        res => {
          respuesta = true;
        }
      );

    // interface Resp {
    //   err: number;
    //   message: string;
    //   misproductos: UserProduct[];
    // }
    return respuesta;
  }

}

