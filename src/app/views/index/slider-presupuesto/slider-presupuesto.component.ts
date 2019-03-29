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
// tslint:disable-next-line: prefer-const
    let sliders;
    sliders = new MasterSlider();


    sliders.control('arrows', {
      autohide: false
    });
    sliders.control('circletimer', { color: '#0097A8', stroke: 9 });

    sliders.setup('masterslider2', {
      width: 1041,
      height: 316,
      space: 110,
      mouse: true,
      loop: true,
      autoplay: true,
      speed: 50,
      view: 'fadeWave',
      layout: 'boxed',
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
