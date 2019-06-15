import { Component, OnInit } from '@angular/core';
import { IndexService } from 'src/app/providers/index.service';
import { ResultadoItem } from 'src/app/interface';

declare var MasterSlider: any;

@Component({
  selector: 'app-slider-presupuesto',
  templateUrl: './slider-presupuesto.component.html',
  styleUrls: ['./slider-presupuesto.component.scss']
})
export class SliderPresupuestoComponent implements OnInit {
  meses = [
    'ENERO',
    'FEBRERO',
    'MARZO',
    'ABRIL',
    'MAYO',
    'JUNIO',
    'JULIO',
    'AGOSTO',
    'SEPTIEMBRE',
    'OCTUBRE',
    'NOVIEMBRE',
    'DICIEMBRE'
  ];
  constructor(public is: IndexService) {
    // this.is.getAllResultados();
  }

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

  getResultClass(_result: ResultadoItem): string {
    if (_result.real_resultado >= _result.presupuesto_resultado) {
      return 'resultado-positivo';
    } else {
      return 'resultado-negativo';
    }
  }

  getResultColor(_result: ResultadoItem): string {
    if (_result.real_resultado >= _result.presupuesto_resultado) {
      return 'color-positivo';
    } else {
      return 'color-negativo';
    }
  }
}
