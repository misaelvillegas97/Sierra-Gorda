import { Component, OnInit, OnDestroy } from '@angular/core';
import { ReconozcoService } from 'src/app/providers/reconozco.service';
import { Reconocimiento } from 'src/app/interface/reconozco';
import { MDBModalService, MDBModalRef } from 'angular-bootstrap-md';
import { ReconocimientoModalComponent } from 'src/app/modals/reconocimiento-modal/reconocimiento-modal.component';
import { LoginService } from 'src/app/providers/login.service';
import { LoginModalComponent } from 'src/app/modals/login-modal/login-modal.component';
import { Router } from '@angular/router';
import { GoogleAnalyticsService } from 'src/app/providers/google-analytics.service';

@Component({
  selector: 'app-todos-reconocidos',
  templateUrl: './todos-reconocidos.component.html',
  styleUrls: ['../tereconozco.component.scss']
})
export class TodosReconocidosComponent implements OnInit, OnDestroy {
  modalRef: MDBModalRef;
  modalOptions = {};

  page = 1;

  constructor(public rs: ReconozcoService, private modalService: MDBModalService, public ls: LoginService, private router: Router, private ga: GoogleAnalyticsService) {
    this.rs.getReconocimientosOnScroll();

    // this.rs.getAllReconocimientos();

    this.rs.getAllReconocimientos(1);
    this.rs.getAllReconocimientos(2);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.rs.listReconocimientos = undefined;
    this.page = 1;
  }

  onScroll() {
    this.page++;
    const lastID = this.rs.listReconocimientos[this.rs.listReconocimientos.length - 1].id;
    this.rs.getReconocimientosOnScroll(0, 18, lastID);
  }

  openModal(_reconocimiento: Reconocimiento) {
    // console.table(_reconocimiento);
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
    // console.table(_reconocimiento);
    if (this.ls.isLoggedIn()) {
      this.rs.setLike(_reconocimiento.id).finally(
        () => {
          this.ga.onReconozcoLike();
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
      title: 'Inicie Sesión para reconocer'
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
        case 1: // ? Reconocer
          this.router.navigateByUrl('/te-reconozco/reconocer');
          break;

        default:
          break;
      }
    } else {
      this.openModalLogin();
    }
  }

  owner(reconocimiento: Reconocimiento): boolean {
    if (this.ls.isLoggedIn && this.ls.userLogged) {
      if (reconocimiento.reconocedor.id === this.ls.userLogged.id_usuario) {
        return true;
      }

      if (reconocimiento.reconocido.find( user => user.id_usuario === this.ls.userLogged.id_usuario )) {
        return true;
      }

      return false;
    }

    return false;
  }
}
