import { Component, OnInit } from '@angular/core';
import { ReconozcoService } from 'src/app/providers/reconozco.service';
import { Reconocimiento } from 'src/app/interface/reconozco';
import { MDBModalService, MDBModalRef } from 'angular-bootstrap-md';
import { ReconocimientoModalComponent } from 'src/app/modals/reconocimiento-modal/reconocimiento-modal.component';

@Component({
  selector: 'app-todos-reconocidos',
  templateUrl: './todos-reconocidos.component.html',
  styleUrls: ['../tereconozco.component.scss']
})
export class TodosReconocidosComponent implements OnInit {
  modalRef: MDBModalRef;
  modalOptions = {};

  constructor(public rs: ReconozcoService, private modalService: MDBModalService) {
    this.rs.getAllReconocimientos(2);
    this.rs.getAllReconocimientos(3);
  }

  ngOnInit() {
  }

  openModal(_reconocimiento: Reconocimiento) {
    let data = {};
    let bgModal = '';

    switch (_reconocimiento.valor_comportamiento) {
      case 1: bgModal = 'sg-blue'; break;
      case 2: bgModal = 'sg-green'; break;
      case 3: bgModal = 'sg-yellow'; break;
      case 4: bgModal = 'sg-orange'; break;
      case 5: bgModal = 'sg-red'; break;
    }

    data = {
      reconocimiento: _reconocimiento
    };

    this.modalOptions = {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: false,
      class: `reconocerModal-container ${bgModal} modal-dialog-centered animated fadeInDown faster`,
      containerClass: 'incidente-modal-container',
      animated: true,
      data
    };
    this.modalRef = this.modalService.show(ReconocimientoModalComponent, this.modalOptions);
  }

  setLike(_reconocimiento: Reconocimiento) {
    console.table(_reconocimiento);
    this.rs.setLike(_reconocimiento.id).finally(
      () => {
        _reconocimiento.cantidad_likes ++;
        _reconocimiento.megusta = true;
      }
    );
  }

}
