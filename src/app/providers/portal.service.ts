import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseCategories, ResponseVideos, Category, Video } from '../interface/portal';
import { Subject } from 'rxjs';

const URL_SG = 'http://c3wsapi.cl:2200/sg/';

@Injectable({
  providedIn: 'root'
})
export class PortalService {

  categoryList: Category[] = undefined;
  videosList: Video[] = undefined;
  moreSeenList: Video[] = undefined;

  private emitChangeSource = new Subject<Video>();
  actualVideo$ = this.emitChangeSource.asObservable();

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
    console.log('Buscando Videos...');
    this.videosList = undefined;
    this.http.get( URL_SG + 'portal/videosporcategoria/' + _id)
    .toPromise()
    .then(
      (res: ResponseVideos) => {
        this.videosList = res.portal;
        return res.portal;
      }
    );
  }

  async getMoreSeen() {
    const limite = 4;
    await this.http.get( URL_SG + 'portal/masvistos/' + limite)
    .toPromise()
    .then(
      (res: ResponseVideos) => {
        this.moreSeenList = res.portal;
        return res.portal;
      }
    );
  }

  getCategoryByName(_nombre: string): Category {
    let selectedCategory: Category;
    selectedCategory = this.categoryList.find(
      categoria => categoria.nombre === _nombre
    );

    return selectedCategory;
  }

  emitChange(_video: Video) {
    this.emitChangeSource.next(_video);
  }

  loadDefaultVideo() {
    const video = {
      id: 0,
      titulo: 'MISIÓN / VISIÓN DE SIERRA GORDA SCM',
      url_video: 'http://c3soporte00200.cl/sg/noticias/uploads/videos/SIERRA_GORDA_CLIMA_TEASER.mp4',
      url_img: 'http://c3soporte00200.cl/sg/noticias/uploads/videos/SIERRA_GORDA_CLIMA_TEASER.jpg',
      descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos reprehenderit officia earum similique repellendus quis animi numquam tenetur.',
      id_categoria: 0,
      fecha_creacion: new Date()
    };
    this.emitChangeSource.next(video);
  }
}
