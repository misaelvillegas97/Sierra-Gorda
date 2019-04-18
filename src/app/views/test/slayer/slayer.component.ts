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

    slider.setup('masterslider', {
      width: 600,
      height: 380,
      space: 10,
      // fullwidth:true,
      // speed: 18,
      view: 'fadeWave',
      layout: 'partialview',
      loop: true,
      controls: {
        arrows: {
          autohide: false
        },
        bullets: {
          autohide: false
        }
      }
    });
    slider.control('bullets', {
      autohide: false,
      dir: 'H',
      align: 'bottom',
      margin: 10
    });
  }
}
