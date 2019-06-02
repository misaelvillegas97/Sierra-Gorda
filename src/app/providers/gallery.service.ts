import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Gallery, ResponseGallery } from '../interface/interface';
import { GaleriaAnual, ArregloGaleriaAnual, Album } from '../interface/galeria';

const URL = 'http://c3wsapi.cl:2200/sg/';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {
  galleryList: Gallery[] = [];
  albumList: Album[];

  listaAnios: ArregloGaleriaAnual[];

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

  getGalleryByYear( _year: number ) {
    if (this.listaAnios) {
      console.table(this.listaAnios);
      if (this.listaAnios.find( anio => anio.anio === _year )) {
        return;
      }
    }
    this.http.get( URL + `galeria/getmesgaleria/${_year}/${atob(localStorage.getItem('sg-userID'))}` )
      .toPromise()
      .then(
        res => {
          if (!this.listaAnios) {
            this.listaAnios = [];
          }
          this.listaAnios.push({
            anio: _year,
            // tslint:disable-next-line: no-string-literal
            galeria: res['meses']
          });
        }
      );
  }

  getGalleryByMonth(_month: number, _year: number ) {
    this.http.get( URL + `galeria/getgaleria/${_year}/${_month}/${atob(localStorage.getItem('sg-userID'))}` )
      .toPromise()
      .then(
        res => {
          // tslint:disable-next-line: no-string-literal
          this.albumList = res['galerias'];
        }
      );
  }

}
