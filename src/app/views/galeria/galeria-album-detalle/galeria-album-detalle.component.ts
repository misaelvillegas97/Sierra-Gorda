import { Component, OnInit, OnDestroy } from '@angular/core';
import { Album, AlbumItem } from 'src/app/interface/galeria';
import { GalleryService } from 'src/app/providers/gallery.service';
import { ActivatedRoute } from '@angular/router';
import { parseHttpResponse } from 'selenium-webdriver/http';

@Component({
  selector: 'app-galeria-album-detalle',
  templateUrl: './galeria-album-detalle.component.html',
  styleUrls: ['../galeria.component.scss']
})
export class GaleriaAlbumDetalleComponent implements OnInit, OnDestroy {

  album: Album;
  private sub: any;
  slideIndex = 1;

  constructor( public gs: GalleryService, private route: ActivatedRoute ) {
    this.sub = this.route.params.subscribe( params => {
      const _id = parseInt(params.idGaleria, 0);
      this.gs.getPhotosByGallery(_id);
      this.gs.filterOrGetGalleryById(_id)
        .then(
          album => {
            this.album = album;
          }
        );
    });
  }

  ngOnInit() {
    // this.showSlides(this.slideIndex);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  setLike(photo: AlbumItem, state: boolean) {
    photo.megusta = state;
  }


  //#region PhotoModal

  openModal() {
    document.getElementById('myModal').style.display = 'block';
  }

  closeModal() {
    document.getElementById('myModal').style.display = 'none';
  }

  plusSlides(n: number) {
    this.showSlides(this.slideIndex += n);
  }

  currentSlide(n: number) {
    this.showSlides(this.slideIndex = n);
  }

  showSlides(n: number) {
    let i;
    const slides = document.getElementsByClassName('mySlides');
    if (n > slides.length) { this.slideIndex = 1; }
    if (n < 1) { this.slideIndex = slides.length; }
    for (i = 0; i < slides.length; i++) {
      // slides[i].style.display = 'none';
      slides[i].setAttribute('style', 'display: none');

    }
    slides[this.slideIndex - 1].setAttribute('style', 'display: block');
  }

  console(x: any) {
    console.log(x);
  }
  //#endregion

}
