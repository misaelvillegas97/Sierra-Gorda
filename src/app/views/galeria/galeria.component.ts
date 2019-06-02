import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.scss']
})
export class GaleriaComponent implements OnInit {

  // yearList = [];
  // thisYear = new Date().getFullYear();

  constructor() {
    // this.getGalleryByYear(this.thisYear + '');
  }

  ngOnInit() {
  }

  // getGalleryByYear(_year: any) {
  //   _year = parseInt(_year, 0);
  //   this.thisYear = _year;
  //   this.gs.getGalleryByYear(_year);
  // }

}
