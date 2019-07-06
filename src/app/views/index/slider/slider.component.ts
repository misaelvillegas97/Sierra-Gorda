import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { GalleryService } from 'src/app/providers/gallery.service';
import { GoogleAnalyticsService } from 'src/app/providers/google-analytics.service';

declare var MasterSlider: any;
@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit, AfterViewInit {
  monthShort = [
    'Ene',
    'Feb',
    'Mar',
    'Abr',
    'May',
    'Jun',
    'Jul',
    'Ago',
    'Sep',
    'Oct',
    'Nov',
    'Dic'
  ];
  monthShortM = [
    'ENE',
    'FEB',
    'MAR',
    'ABR',
    'MAY',
    'JUN',
    'JUL',
    'AGO',
    'SEP',
    'OCT',
    'NOV',
    'DIC'
  ];
  @Input() code: number;

  constructor(public gs: GalleryService, public ga: GoogleAnalyticsService) {}

  ngOnInit() {
    if(this.gs.galleryList.length === 0) {
      this.gs.getBanner().finally(() => {
        setTimeout(() => {
          this.createSlayer();
        }, 0);
      });
    } else {
      setTimeout(() => {
        this.createSlayer();
      }, 0);
    }
  }

  ngAfterViewInit() {}

  createSlayer() {
    const slider = new MasterSlider();

    slider.control('arrows', {
      autohide: false
    });
    slider.control('bullets', {
      autohide: false,
      dir: 'H',
      align: 'bottom',
      margin: 10
    });

    slider.setup('masterslider', {
      width: 750,
      height: 440,
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
