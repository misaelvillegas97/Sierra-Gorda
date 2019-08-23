import { Component, OnInit } from '@angular/core';
import { GoogleAnalyticsService } from 'src/app/providers/google-analytics.service';
import { LoginService } from 'src/app/providers/login.service';
import { Router } from '@angular/router';
import { MDBModalService, MDBModalRef } from 'angular-bootstrap-md';
import { LoginModalComponent } from 'src/app/modals/login-modal/login-modal.component';

declare let $: any;

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss']
})
export class LinksComponent implements OnInit {

  modalRef: MDBModalRef;
  modalOptions = {};

  constructor(public ga: GoogleAnalyticsService, private ls: LoginService, private route: Router, private modalService: MDBModalService) {
  }

  ngOnInit() {
  }

  onButtonHover(nombreBoton: string, state: boolean): void {
    switch (nombreBoton) {
      case 'Nuestra Compañía':
        if (state) {
          $('#compania').css('background-color', '#FF5000');
          $('#compania').css('box-shadow', 'none');
          $('#compania-1').css('background-color', '#FF5000');
          $('#compania-2').css('background-color', '#FF5000');
          $('#compania-3').css('color', 'white');
          // this.compania = true;
          $('#compania-options').addClass('animated');
          $('#compania-options').addClass('fadeIn');
          $('#compania-options').addClass('faster');
          $('#compania-options').css('visibility', 'visible');
        } else {
          $('#compania').removeAttr('style');
          $('#compania-1').removeAttr('style');
          $('#compania-2').removeAttr('style');
          $('#compania-3').removeAttr('style');
          // this.compania = false;
          $('#compania-options').removeClass('animated');
          $('#compania-options').removeClass('fadeIn');
          $('#compania-options').removeClass('faster');
          $('#compania-options').removeAttr('style');
        }
        break;

      case 'Personas':
        if (state) {
          // this.personas = true;
          $('#personas').css('background-color', '#FFC500');
          $('#personas').css('box-shadow', 'none');
          $('#personas-1').css('background-color', '#FFC500');
          $('#personas-2').css('background-color', '#FFC500');
          $('#personas-3').css('color', 'white');
          $('#personas-options').addClass('animated');
          $('#personas-options').addClass('fadeIn');
          $('#personas-options').addClass('faster');
          $('#personas-options').css('visibility', 'visible');
        } else {
          // this.personas = false;
          $('#personas').removeAttr('style');
          $('#personas-1').removeAttr('style');
          $('#personas-2').removeAttr('style');
          $('#personas-3').removeAttr('style');
          $('#personas-options').removeClass('animated');
          $('#personas-options').removeClass('fadeIn');
          $('#personas-options').removeClass('faster');
          $('#personas-options').removeAttr('style');
        }
        break;

      case 'Aplicaciones':
        if (state) {
          // this.aplicaciones = true;
          $('#aplicaciones').css('background-color', '#00BDC8');
          $('#aplicaciones').css('box-shadow', 'none');
          $('#aplicaciones-1').css('background-color', '#00BDC8');
          $('#aplicaciones-2').css('background-color', '#00BDC8');
          $('#aplicaciones-3').css('color', 'white');
          $('#aplicaciones-options').addClass('animated');
          $('#aplicaciones-options').addClass('fadeIn');
          $('#aplicaciones-options').addClass('faster');
          $('#aplicaciones-options').css('visibility', 'visible');
        } else {
          // this.aplicaciones = false;
          $('#aplicaciones').removeAttr('style');
          $('#aplicaciones-1').removeAttr('style');
          $('#aplicaciones-2').removeAttr('style');
          $('#aplicaciones-3').removeAttr('style');
          $('#aplicaciones-options').removeClass('animated');
          $('#aplicaciones-options').removeClass('fadeIn');
          $('#aplicaciones-options').removeClass('faster');
          $('#aplicaciones-options').removeAttr('style');
        }
        break;

      case 'Mis Herramientas':
        if (state) {
          // this.herramientas = true;
          $('#herramientas').css('background-color', '#6ABE4A');
          $('#herramientas').css('box-shadow', 'none');
          $('#herramientas-1').css('background-color', '#6ABE4A');
          $('#herramientas-2').css('background-color', '#6ABE4A');
          $('#herramientas-3').css('color', 'white');
          $('#herramientas-options').addClass('animated');
          $('#herramientas-options').addClass('fadeIn');
          $('#herramientas-options').addClass('faster');
          $('#herramientas-options').css('visibility', 'visible');
        } else {
          // this.herramientas = false;
          $('#herramientas').removeAttr('style');
          $('#herramientas-1').removeAttr('style');
          $('#herramientas-2').removeAttr('style');
          $('#herramientas-3').removeAttr('style');
          $('#herramientas-options').removeClass('animated');
          $('#herramientas-options').removeClass('fadeIn');
          $('#herramientas-options').removeClass('faster');
          $('#herramientas-options').removeAttr('style');
        }
        break;
    }
  }

  validateLogin(_nombre: string) {
    switch (_nombre) {
      case 'chat':
        if (this.ls.isLoggedIn()) {
          this.route.navigateByUrl('/chat');
        } else {
          this.openModal();
        }
        break;

      default:
        break;
    }
  }

  openModal() {
    const data = {
      title: 'Inicia sesión para acceder a chat'
    };

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
