import { Component, OnInit } from '@angular/core';
import { BeneficiosService } from 'src/app/providers/beneficios.service';
import { GoogleAnalyticsService } from 'src/app/providers/google-analytics.service';

@Component({
  selector: 'app-formularios',
  templateUrl: './formularios.component.html',
  styleUrls: ['../beneficios.component.scss']
})
export class FormulariosComponent implements OnInit {

  selectLink: string;

  constructor(public bs: BeneficiosService, public ga: GoogleAnalyticsService) {
    this.bs.getAllBeneficiosPorCategorias(3).then(
      res => {
        this.selectLink = this.bs.listaBeneficiosCat[0].url_formulario;
      }
    );
  }

  ngOnInit() {
  }

  getFormularioSelected() {
    const formulario =  this.bs.listaBeneficiosCat.find(
      beneficio => beneficio.url_formulario === this.selectLink
    );

    return formulario.titulo_beneficio;
  }

  changeValue(_url: string) {
    console.log(_url);
    this.selectLink = _url;
  }

}
