import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/providers/login.service';
import { ReconozcoService } from 'src/app/providers/reconozco.service';
import { Reconocimiento } from 'src/app/interface/reconozco';
import { ReconocimientoModalComponent } from 'src/app/modals/reconocimiento-modal/reconocimiento-modal.component';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';

@Component({
  selector: 'app-reconocidos',
  templateUrl: './reconocidos.component.html',
  styleUrls: ['../tereconozco.component.scss']
})
export class ReconocidosComponent implements OnInit {
  modalRef: MDBModalRef;
  modalOptions = {};

  isEnviados: boolean;
  isRecibidos: boolean;

  constructor(public ls: LoginService, public rs: ReconozcoService, private modalService: MDBModalService) {
    this.rs.getAllReconocimientos(1);
    this.rs.getAllReconocimientos(2);

    this.isEnviados = true;
    this.isRecibidos = false;
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

  changeView(_page: number) {
    if (_page === 1) { this.isEnviados = true; this.isRecibidos = false; }
    if (_page === 2) { this.isRecibidos = true; this.isEnviados = false; }
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
