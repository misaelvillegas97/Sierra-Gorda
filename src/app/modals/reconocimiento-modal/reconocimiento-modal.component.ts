import { Component, OnInit } from '@angular/core';
import { Reconocimiento } from 'src/app/interface/reconozco';
import { LoginService } from 'src/app/providers/login.service';
import { ReconozcoService } from 'src/app/providers/reconozco.service';
import { GoogleAnalyticsService } from 'src/app/providers/google-analytics.service';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { LoginModalComponent } from '../login-modal/login-modal.component';

@Component({
  selector: 'app-reconocimiento-modal',
  templateUrl: './reconocimiento-modal.component.html',
  styleUrls: ['./reconocimiento-modal.component.scss']
})
export class ReconocimientoModalComponent implements OnInit {

  reconocimiento: Reconocimiento;

  constructor( private modalService: MDBModalService, public modalRef: MDBModalRef, private ls: LoginService, private rs: ReconozcoService, private ga: GoogleAnalyticsService) { }

  ngOnInit() {
  }

  setLike() {
    if (this.ls.isLoggedIn()) {
      this.rs.setLike(this.reconocimiento.id).finally(
        () => {
          this.ga.onReconozcoLike();
          this.reconocimiento.cantidad_likes++;
          this.reconocimiento.megusta = true;
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
    this.modalRef.hide();
    this.modalRef = this.modalService.show(LoginModalComponent, modalOptions);
  }

  get owner(): boolean {
    if (this.reconocimiento.reconocedor.id === this.ls.userLogged.id_usuario) {
      return true;
    }

    if (this.reconocimiento.reconocido.find( user => user.id_usuario === this.ls.userLogged.id_usuario )) {
      return true;
    }

    return false;
  }
}
