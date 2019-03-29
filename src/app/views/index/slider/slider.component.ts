import { Component, OnInit, Input } from '@angular/core';

declare var MasterSlider: any;
@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  @Input() code: number;

  constructor() {}

  ngOnInit() {
    this.createSlayer();
  }

  createSlayer() {
    var slider = new MasterSlider();

    slider.control('arrows', {
      autohide: false
    });
    slider.control('circletimer', { color: '#0097A8', stroke: 9 });

    slider.setup('masterslider', {
      width: 750,
      height: 440,
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
    // slider.control('bullets', {
    //   autohide: false,
    //   dir: 'H',
    //   align: 'bottom',
    //   margin: 10
    // });
  }
}