import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { GalleryService } from 'src/app/providers/gallery.service';
import { ActivatedRoute } from '@angular/router';
import { Album } from 'src/app/interface/galeria';

@Component({
  selector: 'app-galeria-albumes',
  templateUrl: './galeria-albumes.component.html',
  styleUrls: ['../galeria.component.scss']
})
export class GaleriaAlbumesComponent implements OnInit, AfterViewInit {

  gallery: Album[] = undefined;
  private sub: any;

  constructor( public gs: GalleryService, private route: ActivatedRoute ) {
    this.sub = this.route.params.subscribe( params => {
      const _year = parseInt(params.year, 0);
      const _month = parseInt(params.month, 0);
      this.gs.albumList = undefined;
      this.gs.getGalleryByMonth(_month, _year);
    });
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    AppComponent.prototype.subirScroll();
  }

}
