import { Component, OnInit } from '@angular/core';
import { BeneficiosService } from 'src/app/providers/beneficios.service';

@Component({
  selector: 'app-beneficios',
  templateUrl: './beneficios.component.html',
  styleUrls: ['./beneficios.component.scss']
})
export class BeneficiosComponent implements OnInit {

  constructor( private bs: BeneficiosService ) {
    // this.bs.getAllCategorias();
  }

  ngOnInit() {
  }

}
