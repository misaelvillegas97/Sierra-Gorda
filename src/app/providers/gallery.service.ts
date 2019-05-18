import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Gallery, ResponseGallery } from '../interface/interface';

const URL = 'http://c3wsapi.cl:2200/sg/';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {
  galleryList: Gallery[] = [];

  constructor(private http: HttpClient) { }


  async getBanner() {
    let respuesta = -1;
    await this.http.get( URL + '/home/banners/10' )
      .toPromise()
      .then(
        (res: ResponseGallery) => {
          if (res.err) {
            respuesta = 0;
            return;
          }

          // tslint:disable-next-line: prefer-for-of
          for (let i = 0; i < res.banners.length; i++) {
            const news = res.banners[i];
            // Formatting date
            news.fecha_creacion_noticia = new Date(news.fecha_creacion_noticia);

            // Formatting Title
            const titulo = ( (news.titulo_noticia).length >= 65 ? (news.titulo_noticia).substring(0, 65) + '...' : news.titulo_noticia  );
            const tituloPalabras = titulo.split(' ');

            const tituloDivision = ( tituloPalabras.length / 2);

            let concat = '';
            const cantPalabras = tituloPalabras.length * 10 * 5;
            concat += cantPalabras + 15;
            concat += 'px';

            news.titulo_1 = '';
            news.titulo_2 = '';

            for (let k = 0; k < tituloDivision; k++) {
              news.titulo_1 += tituloPalabras[k] + ' ';
            }

            for (let k = tituloDivision; k < tituloPalabras.length; k++) {
              news.titulo_2 += tituloPalabras[k] + ' ';
            }

            this.galleryList.push(news);
          }

          respuesta = 1;
          return;
        }
      );
    return respuesta;
  }

}
