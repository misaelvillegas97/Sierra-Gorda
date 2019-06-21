import { Component, OnInit } from '@angular/core';
import { BeneficiosService } from 'src/app/providers/beneficios.service';

@Component({
  selector: 'app-formularios',
  templateUrl: './formularios.component.html',
  styleUrls: ['../beneficios.component.scss']
})
export class FormulariosComponent implements OnInit {

  selectLink: string = '';

  constructor(public bs: BeneficiosService) {
    this.bs.getAllBeneficiosPorCategorias(3);
  }

  ngOnInit() {
  }

  downloadFile(_id: number) {
    let variable =  this.bs.listaBeneficiosCat.find(
      beneficio => beneficio.id_beneficios === _id
    );

    variable.url_formulario;
  }

  changeValue(_url: string) {
    console.log(_url);
    this.selectLink = _url;
  }

}
