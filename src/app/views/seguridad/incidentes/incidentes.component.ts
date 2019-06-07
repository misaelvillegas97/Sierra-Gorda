import { Component, OnInit } from '@angular/core';
import { SeguridadService } from 'src/app/providers/seguridad.service';
import { Incidente } from 'src/app/interface/seguridad';
import { MDBModalService, MDBModalRef } from 'angular-bootstrap-md';
import { IncidenteDetalleModalComponent } from 'src/app/modals/incidente-detalle-modal/incidente-detalle-modal.component';

@Component({
  selector: 'app-incidentes',
  templateUrl: './incidentes.component.html',
  styleUrls: ['../seguridad.component.scss']
})
export class IncidentesComponent implements OnInit {
  modalRef: MDBModalRef;

  constructor( public ss: SeguridadService, private modalService: MDBModalService ) {
    this.ss.getAllIncidentes();
  }

  ngOnInit() {
  }

  openModal(_incidente: Incidente) {

    this.modalRef = this.modalService.show(IncidenteDetalleModalComponent, {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: false,
      class: 'modal-lg incidente-modal',
      containerClass: 'incidente-modal-container',
      animated: true,
      data: {
        incidente: _incidente
      }
    });
  }

}
