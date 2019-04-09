import { Component, OnInit } from '@angular/core';

declare var MasterSlider: any;

@Component({
  selector: 'app-slayer',
  templateUrl: './slayer.component.html',
  styleUrls: ['./slayer.component.scss']
})
export class SlayerComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    this.createSlayer();
  }

  createSlayer() {
    const slider = new MasterSlider();


    slider.control('arrows', {
      autohide: false
    });
    slider.setup('masterslider2', {
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
