import { Component, OnInit } from '@angular/core';
import { BeneficiosService } from 'src/app/providers/beneficios.service';
import { GoogleAnalyticsService } from 'src/app/providers/google-analytics.service';

@Component({
  selector: 'app-menu-beneficios',
  templateUrl: './menu-beneficios.component.html',
  styleUrls: ['../beneficios.component.scss']
})
export class MenuBeneficiosComponent implements OnInit {

  constructor( public bs: BeneficiosService, public ga: GoogleAnalyticsService ) { }

  ngOnInit() {
  }

}
