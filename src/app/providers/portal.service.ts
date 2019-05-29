import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseCategories, ResponseVideos, Category, Video } from '../interface/portal-interface';

const URL_SG = 'http://c3wsapi.cl:2200/sg/';

@Injectable({
  providedIn: 'root'
})
export class PortalService {

  categoryList: Category[] = undefined;
  videosList: Video[] = undefined;

  constructor( private http: HttpClient) {
    // this.getCategorias();
  }

  async getCategorias() {
    await this.http.get( URL_SG + 'portal/buscarcategorias')
      .toPromise()
      .then(
        (res: ResponseCategories) => {
          this.categoryList = res.categorias;
          return res.categorias;
        }
      );
  }

  getVideosByCategory(_id: number) {
    this.videosList = undefined;
    this.http.get( URL_SG + 'portal/buscarcategorias')
    .toPromise()
    .then(
      (res: ResponseVideos) => {
        this.videosList = res.portal;
        return res;
      }
    );
  }

  async getMoreSeen() {

  }

  getCategoryByName(_nombre: string): Category {
    let selectedCategory: Category;
    selectedCategory = this.categoryList.find(
      categoria => categoria.nombre === _nombre
    );

    return selectedCategory;
  }
}
