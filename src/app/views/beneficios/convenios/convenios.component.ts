import { Component, OnInit } from '@angular/core';
import { BeneficiosService } from 'src/app/providers/beneficios.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-convenios',
  templateUrl: './convenios.component.html',
  styleUrls: ['../beneficios.component.scss']
})
export class ConveniosComponent implements OnInit {
  constructor(public bs: BeneficiosService) {
    this.bs.getAllBeneficiosPorCategorias(2);
  }

  ngOnInit() {
    AppComponent.prototype.subirScroll();
  }
}
