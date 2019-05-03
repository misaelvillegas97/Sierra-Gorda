import { Component, OnInit, AfterViewInit, ViewEncapsulation, HostListener, ViewChild } from '@angular/core';
import { LoginService } from 'src/app/providers/login.service';
import { ModalDirective } from 'angular-bootstrap-md';

declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class IndexComponent implements OnInit, AfterViewInit {
  //#region Declarations

  // Login Form and Dialog
  @ViewChild('loginModal') loginModal: ModalDirective;
  loginText = 'Inicia sesión';

  // Filtro UV
  uvactual = 3;
  uv_actual: any;
  filtermain: string;
  title_hovered = true;

  // Estado de usuario
  logged = true;

  // Single chat state
  chatSelected = false;
  userID: number = undefined;

  // Single poll state
  pollSelected = false;
  pollID: number = undefined;
  //#endregion

  constructor(public ls: LoginService) {}

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    // alert('Ancho de ' + screen.width + 'px');
  }


  //#region UV filter module
  // Toggle Hidden Filter Box
  toggle_filtro_uv(state: boolean) {
    if (state) {
      this.title_hovered = false;
      document.getElementById('filter-button').style.height = '500px';
      document.getElementById('filter-content').style.visibility = 'visible';
    } else {
      document.getElementById('filter-button').style.height = '50px';
      document.getElementById('filter-content').style.visibility = 'collapse';
      this.title_hovered = true;
    }
  }

  getUVColor(value: number): string {
    if (value === 1) {
      return '#6BC04A';
    }
    if (value === 2) {
      return '#6BC04A';
    }
    if (value === 3) {
      return '#FEC700';
    }
    if (value === 4) {
      return '#F32634';
    }
    if (value === 5) {
      return '#9F28B5';
    }
  }
  //#endregion UV filter module

  //#region Chat
  toggle_chat(state: boolean) {
    if (state) {
      document.getElementById('chat-container').style.display = 'block';
      document.getElementById('html').classList.add('noscroll');
    } else {
      document.getElementById('chat-container').classList.remove('fadeInRightBig');
      document.getElementById('chat-container').classList.add('fadeOutRightBig');
      document.getElementById('html').classList.remove('noscroll');
      setTimeout(() => {
        document.getElementById('chat-container').style.display = 'none';

        document.getElementById('chat-container').classList.remove('fadeOutRightBig');
        document.getElementById('chat-container').classList.add('fadeInRightBig');
      }, 500);
      if (this.userID !== undefined) {
        document.getElementById(`user-${this.userID}`).classList.remove('active');
      }
      this.chatSelected = false;
      this.userID = undefined;
    }
    return false;
  }

  loadSelectedChat(data: any): void {
    if (data !== this.userID) {
      if (this.userID !== undefined) {
        document.getElementById(`user-${this.userID}`).classList.remove('active');
        this.chatSelected = false;
        this.userID = undefined;
      }
      this.userID = data;
      this.chatSelected = true;
      document.getElementById(`user-${this.userID}`).classList.add('active');

    } else {
      document.getElementById(`user-${this.userID}`).classList.remove('active');
      this.chatSelected = false;
      this.userID = undefined;
    }
  }
  //#endregion Chat

  //#region Encuestas
  toggle_poll(state: boolean) {
    if (state) {
      document.getElementById('poll-container').style.display = 'block';
      document.getElementById('html').classList.add('noscroll');
    } else {
      document.getElementById('poll-container').classList.remove('fadeInLeftBig');
      document.getElementById('poll-container').classList.add('fadeOutLeftBig');
      document.getElementById('html').classList.remove('noscroll');
      setTimeout(() => {
        document.getElementById('poll-container').style.display = 'none';
        document.getElementById('poll-sidebar').style.display = 'block';
        document.getElementById('poll-container').classList.remove('fadeOutLeftBig');
        document.getElementById('poll-container').classList.add('fadeInLeftBig');

      }, 500);
    }
    this.pollSelected = false;
    this.pollID = undefined;
    return false;
  }

  toggle_poll_sidebar(state: boolean) {
    if (!state) {
      document.getElementById('poll-sidebar').classList.add('animated');
      document.getElementById('poll-sidebar').classList.add('fadeOutLeftBig');
      setTimeout(() => {
        document.getElementById('poll-sidebar').style.display = 'none';

        document.getElementById('poll-sidebar').classList.remove('animated');
        document.getElementById('poll-sidebar').classList.remove('fadeOutLeftBig');
        document.getElementById('poll-sidebar').classList.add('fadeInLeftBig');
      }, 500);
    }
  }

  loadSelectedPoll(id: any): void {
    // select
    this.pollID = id;
    this.pollSelected = true;
    this.toggle_poll_sidebar(false);
  }

  closeSelectedPoll() {
    this.pollSelected = false;
    this.pollID = undefined;
  }
  //#endregion

  //#region Contactos
  toggle_contact(state: boolean) {
    if (state) {
      document.getElementById('contact-container').style.display = 'block';
      document.getElementById('html').classList.add('noscroll');
    } else {
      document.getElementById('contact-container').classList.remove('fadeInRightBig');
      document.getElementById('contact-container').classList.add('fadeOutRightBig');
      document.getElementById('html').classList.remove('noscroll');
      setTimeout(() => {
        document.getElementById('contact-container').style.display = 'none';

        document.getElementById('contact-container').classList.remove('fadeOutRightBig');
        document.getElementById('contact-container').classList.add('fadeInRightBig');
      }, 500);
    }

    return false;
  }
  //#endregion Contactos

  //#region HostListeners
  @HostListener('window:keyup', ['$event']) keyEvent(event: KeyboardEvent) {
    // tslint:disable-next-line: deprecation
    if (event.keyCode === 27) {
      this.toggle_chat(false);
      this.toggle_poll(false);
      this.toggle_contact(false);
    }
  }
  @HostListener('document:click', ['$event']) clickedOutside($event) {
    // here you can hide your menu
    this.toggle_contact(false);
    if (this.ls.isLoggedIn()) {
      this.toggle_poll(false);
      this.toggle_chat(false);
    }
  }
  //#endregion

  //#region Buttons Hover Actions
  onButtonHover(nombreBoton: string, state: boolean): void {
    switch (nombreBoton) {
      case 'Nuestra Compañía':
        if (state) {
          $('#compania').css('background-color', '#FF5000');
          $('#compania').css('box-shadow', 'none');
          $('#compania-1').css('background-color', '#FF5000');
          $('#compania-2').css('background-color', '#FF5000');
          $('#compania-3').css('color', 'white');
          $('#compania-options').addClass('animated');
          $('#compania-options').addClass('fadeIn');
          $('#compania-options').addClass('faster');
          $('#compania-options').css('visibility', 'visible');
        } else {
          $('#compania').removeAttr('style');
          $('#compania-1').removeAttr('style');
          $('#compania-2').removeAttr('style');
          $('#compania-3').removeAttr('style');
          $('#compania-options').removeClass('animated');
          $('#compania-options').removeClass('fadeIn');
          $('#compania-options').removeClass('faster');
          $('#compania-options').removeAttr('style');
        }
        break;

      case 'Personas':
        if (state) {
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
  //#endregion

  //#region Links Hover Actions
  onHoverLink(id: string, tipo: number) {

    switch (tipo) {
      // 1 Entrada
      case 1:
        $(`#icon-${id}`).attr('src', `https://c3devapp.cl/sg/assets/img/gif/entrada/${id}.gif`);
        $(`#icon-${id}`).removeClass('shadow');
        $(`#icon-${id}`).css('padding', '0px');
        $(`#icon-${id}`).css('padding-top', '0px');
        break;

      // 2 Salida
      case 2:
        $(`#icon-${id}`).attr('src', `https://c3devapp.cl/sg/assets/img/gif/salida/${id}-salida.gif`);
        break;
    }
  }
  //#endregion

  // Global configuration
  clickedInside($event: Event) {
    $event.preventDefault();
    $event.stopPropagation();  // <- esto detendrá la propagación
  }

  setModalText(opt) {
    if (opt === 1) {
      this.loginText = 'Inicia sesión para acceder a las encuestras';
    }

    if (opt === 2) {
      this.loginText = 'Inicia sesión para acceder al chat';
    }
  }

  async login(form) {
    let rut = this.formateaRut(form.rut);
    let pass = form.pass
    const rutD = rut.replace('.', '').replace('.', '').split('-');
    const run = parseInt(rutD[0].toString(), 0);
    const dv = parseInt(rutD[1].toString(), 0);
    pass = btoa(pass);
    pass = btoa(pass);
    pass = btoa(pass);
    await this.ls.login(run, dv, pass)
    .then(
      res => {
        if (res !== 404) {
          this.loginModal.hide();
        }
      }
    );
  }

  formateaRut(rut) {
    var actual = rut.replace(/^0+/, "");
    if (actual != '' && actual.length > 1) {
        var sinPuntos = actual.replace(/\./g, "");
        var actualLimpio = sinPuntos.replace(/-/g, "");
        var inicio = actualLimpio.substring(0, actualLimpio.length - 1);
        var rutPuntos = "";
        var i = 0;
        var j = 1;
        for (i = inicio.length - 1; i >= 0; i--) {
            var letra = inicio.charAt(i);
            rutPuntos = letra + rutPuntos;
            if (j % 3 == 0 && j <= inicio.length - 1) {
                rutPuntos = "." + rutPuntos;
            }
            j++;
        }
        var dv = actualLimpio.substring(actualLimpio.length - 1);
        rutPuntos = rutPuntos + "-" + dv;
    }
    return rutPuntos;
  }
}
