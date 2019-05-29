import { Component, OnInit } from '@angular/core';

declare var MasterSlider: any;

@Component({
  selector: 'app-slider-presupuesto',
  templateUrl: './slider-presupuesto.component.html',
  styleUrls: ['./slider-presupuesto.component.scss']
})
export class SliderPresupuestoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.createSlayer();
  }

  createSlayer() {
    const slider = new MasterSlider();


    slider.control('arrows', {
      autohide: false
    });
    slider.setup('masterslider2', {
      width: 1050,
      height: 316,
      space: 550,
      mouse: true,
      loop: true,
      autoplay: true,
      speed: 18,
      view: 'fadeWave',
      layout: 'partialview',
      controls: {
        arrows: {
          autohide: false
        },
        bullets: {
          autohide: false
        }
      }
    });
  }

}
