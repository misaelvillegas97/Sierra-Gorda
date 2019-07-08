import { Component, OnInit } from '@angular/core';
import { BeneficiosService } from 'src/app/providers/beneficios.service';
import { GoogleAnalyticsService } from 'src/app/providers/google-analytics.service';

@Component({
  selector: 'app-salud',
  templateUrl: './salud.component.html',
  styleUrls: ['../beneficios.component.scss']
})
export class SaludComponent implements OnInit {

  constructor( public bs: BeneficiosService, public ga: GoogleAnalyticsService ) {
    this.bs.getAllBeneficiosPorCategorias(1);
  }

  ngOnInit() {
  }


  consolelog(_d: any) {
    console.log(_d);
  }

}
