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
    var slider = new MasterSlider();

    slider.control('arrows');
    slider.control('slideinfo', {
      insertTo: '#partial-view-1',
      autohide: false,
      align: 'bottom',
      // size: 160
    });
    slider.control('circletimer', { color: '#FFFFFF', stroke: 9 });

    slider.setup('masterslider', {
      width: 750,
      height: 440,
      space: 10,
      mouse: true,
      loop: true,
      view: 'fadeWave',
      layout: 'boxed',

    });
  }
}
