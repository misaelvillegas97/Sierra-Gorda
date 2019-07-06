import { Component, OnInit } from '@angular/core';
import { ReconozcoService } from 'src/app/providers/reconozco.service';
import { Reconocimiento } from 'src/app/interface/reconozco';
import { MDBModalService, MDBModalRef } from 'angular-bootstrap-md';
import { ReconocimientoModalComponent } from 'src/app/modals/reconocimiento-modal/reconocimiento-modal.component';
import { LoginService } from 'src/app/providers/login.service';
import { LoginModalComponent } from 'src/app/modals/login-modal/login-modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todos-reconocidos',
  templateUrl: './todos-reconocidos.component.html',
  styleUrls: ['../tereconozco.component.scss']
})
export class TodosReconocidosComponent implements OnInit {
  modalRef: MDBModalRef;
  modalOptions = {};

  page = 1;

  constructor(public rs: ReconozcoService, private modalService: MDBModalService, private ls: LoginService, private router: Router) {
    this.rs.getReconocimientosOnScroll();

    // this.rs.getAllReconocimientos();

    this.rs.getAllReconocimientos(1);
    this.rs.getAllReconocimientos(2);
  }

  ngOnInit() {
  }

  onScroll() {
    this.page++;
    const lastID = this.rs.listReconocimientos[this.rs.listReconocimientos.length - 1].id;
    this.rs.getReconocimientosOnScroll(0, 18, lastID);
  }

  openModal(_reconocimiento: Reconocimiento) {
    console.table(_reconocimiento);
    let data = {};
    let bgModal = '';

    switch (_reconocimiento.id_valor) {
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
    if (this.ls.isLoggedIn()) {
      this.rs.setLike(_reconocimiento.id).finally(
        () => {
          _reconocimiento.cantidad_likes ++;
          _reconocimiento.megusta = true;
        }
      );
    } else {
      this.openModalLogin();
    }
  }

  openModalLogin() {
    let data = {
      title: "Inicie Sesión para reconocer"
    };

    const modalOptions = {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: false,
      class: 'loginModal-container modal-dialog-centered',
      containerClass: '',
      animated: true,
      data
    };
    this.modalRef = this.modalService.show(LoginModalComponent, modalOptions);
  }

  validateRedirect(_page: number) {
    if (this.ls.isLoggedIn()) {
      switch (_page) {
        case 0: // ? Mis Reconocimientos
          this.router.navigateByUrl('/te-reconozco/mis-reconocimientos');
          break;
        case 0: // ? Reconocer
          this.router.navigateByUrl('/te-reconozco/reconocer');
          break;

        default:
          break;
      }
    } else {
      this.openModalLogin();
    }
  }
}
