import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseCB, CategoriaBranding, ItemBranding } from '../interface/branding';

const URL_SG = 'https://c3wsapi.cl/sg';

@Injectable({
  providedIn: 'root'
})
export class BrandingService {

  /*
    *  /branding/allcategorias/
    *  /branding/allbrandings/
    *  /branding/brandingcategoria/:categoria
    *  /branding/brandingbuscar/:nombre
    *
    *  tipos
    *     1 = PDF
    *     2 = PPT
  */

  listCategorias: CategoriaBranding[];
  listBrandings: ItemBranding[];

  constructor( private http: HttpClient ) { }

  getAllCategories() {
    this.listCategorias = undefined;
    this.http.get( URL_SG + '/branding/allcategorias/' )
      .toPromise()
      .then(
        (res: ResponseCB) => {
          this.listCategorias = res.categorias;
        }
      );
  }

  getAllBranding() {
    this.listBrandings = undefined;
    this.http.get( URL_SG + '/branding/allbrandings/' )
      .toPromise()
      .then(
        (res: ResponseCB) => {
          this.listBrandings = res.brandings;
        }
      );
  }

  getBrandingByCategory(_categoria: CategoriaBranding) {
    this.listBrandings = undefined;
    this.http.get( URL_SG + '/branding/brandingcategoria/' + _categoria.id_categoria)
      .toPromise()
      .then(
        (res: ResponseCB) => {
          this.listBrandings = res.branding;
        }
      );
  }

  getBrandingByName(_text: string) {
    this.listBrandings = undefined;
    this.http.get( URL_SG + '/branding/brandingbuscar/' + _text)
      .toPromise()
      .then(
        (res: ResponseCB) => {
          this.listBrandings = res.branding;
        }
      );
  }
}
