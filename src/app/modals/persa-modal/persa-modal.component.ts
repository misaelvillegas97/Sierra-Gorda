import { Component, OnInit } from '@angular/core';

declare var MasterSlider: any;

@Component({
  selector: 'app-persa-modal',
  templateUrl: './persa-modal.component.html',
  styleUrls: ['./persa-modal.component.scss']
})
export class PersaModalComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.createSlayer();
  }

  createSlayer() {
    const slider = new MasterSlider();

    slider.control('arrows', {
      autohide: false
    });

    slider.setup('persaSlider', {
      width: 420,
      height: 269,
      space: 280,
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
    slider.control('bullets', {
      autohide: false,
      dir: 'H',
      align: 'bottom',
      margin: 10
    });
  }

}
