import { Component, OnInit } from '@angular/core';
import { GalleryService } from 'src/app/providers/gallery.service';

@Component({
  selector: 'app-galeria-meses',
  templateUrl: './galeria-meses.component.html',
  styleUrls: ['../galeria.component.scss']
})
export class GaleriaMesesComponent implements OnInit {

  yearList = [];
  thisYear = new Date().getFullYear();

  monthShortM = [
    'enero',
    'febrero',
    'marzo',
    'abril',
    'mayo',
    'junio',
    'julio',
    'agosto',
    'septiembre',
    'octubre',
    'noviembre',
    'diciembre'
  ];

  constructor( public gs: GalleryService ) {
    this.getGalleryByYear(new Date().getFullYear() + '');
    this.getYearList();
  }

  ngOnInit() {
  }

  getGalleryByYear(_year: any) {
    _year = parseInt(_year, 0);
    this.gs.getGalleryByYear(_year);
    this.thisYear = parseInt(_year, 0);
  }

  getYearList() {
    this.yearList = [];

    for (let i = 2018; i <= new Date().getFullYear(); i++) {
      this.yearList.push(i);
    }
  }

  console() {
    console.log(this.thisYear);
  }
}
