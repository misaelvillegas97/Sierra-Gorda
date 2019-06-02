import { Component, OnInit } from '@angular/core';
import { GalleryService } from 'src/app/providers/gallery.service';

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.scss']
})
export class GaleriaComponent implements OnInit {

  yearList = [];
  thisYear = new Date().getFullYear();

  constructor( public gs: GalleryService ) {
    this.getGalleryByYear(new Date().getFullYear() + '');
    this.getYearList();
  }

  ngOnInit() {
  }

  getGalleryByYear(_year: any) {
    _year = parseInt(_year, 0);
    this.gs.getGalleryByYear(_year);
  }

  getYearList() {
    this.yearList = [];

    for (let i = 2018; i <= new Date().getFullYear(); i++) {
      this.yearList.push(i);
    }

  }

}
