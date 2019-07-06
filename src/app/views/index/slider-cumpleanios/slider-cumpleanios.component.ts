import { Component, OnInit, ViewChild } from '@angular/core';
import { CumpleañosService } from 'src/app/providers/cumpleaños.service';
import { CarouselComponent } from 'angular-bootstrap-md';

@Component({
  selector: 'app-slider-cumpleanios',
  templateUrl: './slider-cumpleanios.component.html',
  styleUrls: ['./slider-cumpleanios.component.scss']
})
export class SliderCumpleaniosComponent implements OnInit {

  @ViewChild('carousel') carousel: CarouselComponent;

  constructor(public bs: CumpleañosService) {
    let currentDate = new Date();
    this.bs.getAllBirth(4, currentDate);
  }

  ngOnInit() {
  }

}
