import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MDBModalService, MDBModalRef } from 'angular-bootstrap-md';
import { LoginService } from 'src/app/providers/login.service';
import { LoginModalComponent } from 'src/app/modals/login-modal/login-modal.component';
import { EditInfoModalComponent } from 'src/app/modals/edit-info-modal/edit-info-modal.component';

declare var $: any;


@Component({
  selector: 'app-navbar-ext',
  templateUrl: './navbar-ext.component.html',
  styleUrls: ['./navbar-ext.component.scss']
})
export class NavbarExtComponent implements OnInit {
  @ViewChild('telefono') telefonoRef: ElementRef;
  @ViewChild('correo') correoRef: ElementRef;
  @ViewChild('pass') passRef: ElementRef;

  modalRef: MDBModalRef;
  modalOptions = {};

  constructor(public ls: LoginService, private modalService: MDBModalService) { }

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
    let data = {};
    switch (opt) {
      case 0:
        data = {
          title: 'Inicia sesión'
        };
        break;
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
