import { Component, OnInit } from '@angular/core';
import { RevistaService } from 'src/app/providers/revista.service';

@Component({
  selector: 'app-revista',
  templateUrl: './revista.component.html',
  styleUrls: ['./revista.component.scss']
})
export class RevistaComponent implements OnInit {
  yearList = [];
  thisYear = new Date().getFullYear();

  constructor( public rs: RevistaService) {
    this.getYearList();
    this.rs.getAllRevistas();
  }

  ngOnInit() {
  }

  getRevistaByYear(_year: any) {
    _year = parseInt(_year, 0);
    this.rs.getAllRevistas(_year);
  }

  getYearList() {
    this.yearList = [];

    for (let i = 2018; i <= new Date().getFullYear(); i++) {
      this.yearList.push(i);
    }
  }

}
