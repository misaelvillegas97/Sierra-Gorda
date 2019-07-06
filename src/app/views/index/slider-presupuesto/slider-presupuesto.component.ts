import { Component, OnInit } from '@angular/core';
import { IndexService } from 'src/app/providers/index.service';
import { ResultadoItem } from 'src/app/interface';
import { VideoComponent } from '../../../modals/video/video.component';
import { MDBModalService, MDBModalRef } from 'angular-bootstrap-md';
import { PortalService } from 'src/app/providers/portal.service';
import { GoogleAnalyticsService } from 'src/app/providers/google-analytics.service';

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

  modalRef: MDBModalRef;
  modalOptions = {};

  constructor( private modalService: MDBModalService, public is: IndexService, private ps: PortalService, private ga: GoogleAnalyticsService ) {
    // this.is.getAllResultados();
  }

  ngOnInit() {
    this.createSlayer();
    this.ps.getResultVideo();
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
    if (_result.real_resultado <= _result.presupuesto_resultado) {
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

  openVideoModal() {
    this.ga.onResultadosVideo();
    let data = {};

    data = {
      video: this.ps.videoResultado
    };

    this.modalOptions = {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: false,
      class: 'persaModal-container modal-dialog-centered animated fadeInDown faster',
      containerClass: '',
      animated: true,
      data
    };
    this.modalRef = this.modalService.show(VideoComponent, this.modalOptions);
  }
}
