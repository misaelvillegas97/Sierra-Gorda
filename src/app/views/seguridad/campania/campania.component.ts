import { Component, OnInit } from '@angular/core';
import { SeguridadService } from 'src/app/providers/seguridad.service';

@Component({
  selector: 'app-campania',
  templateUrl: './campania.component.html',
  styleUrls: ['../seguridad.component.scss']
})
export class CampaniaComponent implements OnInit {

  constructor(public ss: SeguridadService) {
    this.ss.getAllCampanias();
  }

  ngOnInit() {
  }

}
