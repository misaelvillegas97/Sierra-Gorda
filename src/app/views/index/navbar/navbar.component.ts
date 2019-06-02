import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { LoginService } from 'src/app/providers/login.service';
import { ProfileService } from 'src/app/providers/profile.service';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { LoginModalComponent } from 'src/app/modals/login-modal/login-modal.component';
import { EditInfoModalComponent } from 'src/app/modals/edit-info-modal/edit-info-modal.component';

declare var $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @ViewChild('telefono') telefonoRef: ElementRef;
  @ViewChild('correo') correoRef: ElementRef;
  @ViewChild('pass') passRef: ElementRef;

  modalRef: MDBModalRef;
  modalOptions = {};

  constructor(public ls: LoginService, private ps: ProfileService, private modalService: MDBModalService) { }



  ngOnInit() {
  }

  onNameHover(state: boolean) {
    if (state) {
      $('#user-hover-menu').css('visibility', 'visible');
      $('#user-hover-menu').css('display', 'block');
      $('#user-hover-menu').addClass('animated');
      $('#user-hover-menu').addClass('fadeIn');
      $('#user-hover-menu').addClass('faster');
    } else {
      $('#user-hover-menu').removeClass('fadeIn');
      $('#user-hover-menu').addClass('fadeOut');

      setTimeout(() => {
        $('#user-hover-menu').css('visibility', 'hidden');
        $('#user-hover-menu').css('display', 'none');
        $('#user-hover-menu').removeClass('fadeOut');
      }, 1000);
    }
  }

  editInfo() {
    this.modalOptions = {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: false,
      class: 'loginModal-container modal-dialog-centered',
      containerClass: '',
      animated: true
    };

    this.modalRef = this.modalService.show(EditInfoModalComponent, this.modalOptions);
  }

  openModal( opt: number ) {
    let data = {}
    switch (opt) {
      case 0:
        data = {
          title: 'Inicia sesión'
        };
        break;

      case 1: // Encuestas
        data = {
          title: 'Inicia sesión para acceder a las encuestas'
        };
        break;

      case 2: // chat
        data = {
          title: 'Inicia sesión para acceder al chat'
        };
    }

    this.modalOptions = {
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
    this.modalRef = this.modalService.show(LoginModalComponent, this.modalOptions);
  }

}
