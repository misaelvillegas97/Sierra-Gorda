import { Component, OnInit } from '@angular/core';
import { CumpleañosService } from 'src/app/providers/cumpleaños.service';

@Component({
  selector: 'app-slider-cumpleanios',
  templateUrl: './slider-cumpleanios.component.html',
  styleUrls: ['./slider-cumpleanios.component.scss']
})
export class SliderCumpleaniosComponent implements OnInit {

  constructor(public birthService: CumpleañosService) { }

  ngOnInit() {
  }

}
