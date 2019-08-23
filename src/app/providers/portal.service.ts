import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseCategories, ResponseVideos, Category, Video } from '../interface/portal';
import { Subject } from 'rxjs';
import { GoogleAnalyticsService } from './google-analytics.service';

const URL_SG = 'https://c3wsapi.cl/sg/';

@Injectable({
  providedIn: 'root'
})
export class PortalService {

  categoryList: Category[] = undefined;
  videosList: Video[] = undefined;
  moreSeenList: Video[] = undefined;

  videoResultado: Video = undefined;

  private emitChangeSource = new Subject<Video>();
  actualVideo$ = this.emitChangeSource.asObservable();

  constructor( private http: HttpClient, private ga: GoogleAnalyticsService) {
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
    this.ga.onVideoPlayed(_video.titulo);
    this.emitChangeSource.next(_video);
  }

  loadDefaultVideo() {
    const URL_REQUEST = `${URL_SG}portalvideos/destacado/${1}/`;
    // const video = {
    //   id: 0,
    //   titulo: 'MISIÓN / VISIÓN DE SIERRA GORDA SCM',
    //   url_video: 'http://c3soporte00200.cl/sg/noticias/uploads/videos/SIERRA_GORDA_CLIMA_TEASER.mp4',
    //   url_img: 'http://c3soporte00200.cl/sg/noticias/uploads/videos/SIERRA_GORDA_CLIMA_TEASER.jpg',
    //   descripcion: '',
    //   id_categoria: 0,
    //   fecha_creacion: new Date()
    // };
    this.http.get(URL_REQUEST).toPromise()
      .then(
        res => {
          this.emitChange(res['portal'][0]);
        }
      );
  }

  getResultVideo() {
    const URL_REQUEST = `${URL_SG}portalvideos/resultado/`;
    this.http.get(URL_REQUEST).toPromise()
      .then(
        res => {
          if (res['portal'] !== 'sin portal') {
            this.videoResultado = res['portal'];
          }
        }
      );
  }
}
