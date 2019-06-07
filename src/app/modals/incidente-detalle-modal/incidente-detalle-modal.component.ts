import { Component, OnInit } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { Incidente } from 'src/app/interface/seguridad';

@Component({
  selector: 'app-incidente-detalle-modal',
  templateUrl: './incidente-detalle-modal.component.html',
  styleUrls: ['./incidente-detalle-modal.component.scss']
})
export class IncidenteDetalleModalComponent implements OnInit {
  incidente: Incidente;

  constructor(public modalRef: MDBModalRef) { }

  ngOnInit() {
  }

}
