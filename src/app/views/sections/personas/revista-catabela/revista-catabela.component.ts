import { Component, OnInit } from '@angular/core';
import { RevistaService } from 'src/app/providers/revista.service';

@Component({
  selector: 'app-revista-catabela',
  templateUrl: './revista-catabela.component.html',
  styleUrls: ['./revista-catabela.component.scss']
})
export class RevistaCatabelaComponent implements OnInit {

  yearList = [];
  thisYear = new Date().getFullYear();

  constructor( public rs: RevistaService) {
    this.getYearList();
    this.rs.getAllRevistas(undefined, 2);
  }

  ngOnInit() {
  }

  getRevistaByYear(_year: any) {
    _year = parseInt(_year, 0);
    this.rs.getAllRevistas(_year, 2);
  }

  getYearList() {
    this.yearList = [];

    for (let i = 2018; i <= new Date().getFullYear(); i++) {
      this.yearList.push(i);
    }
  }
}
