import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { LoginService } from 'src/app/providers/login.service';
import { ProfileService } from 'src/app/providers/profile.service';

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

  constructor(public ls: LoginService, private ps: ProfileService) { }



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

  async login(rut: string, pass: string) {
    const rutD = rut.replace('.', '').replace('.', '').split('-');
    const run = parseInt(rutD[0].toString(), 0);
    const dv = parseInt(rutD[1].toString(), 0);
    pass = btoa(pass);
    pass = btoa(pass);
    pass = btoa(pass);
    await this.ls.login(run, dv, pass);
    console.log(await this.ls.userLogged);
  }

  async changeUserInfo(variable: number, value: any) {
    let res: number;
    switch (variable) {
      // Teléfono
      case 1:
        if (value !== '' || value !== this.ls.userLogged.telefono) {
          if (value.substring(0, 3) !== '+56') {
            console.log(value.substring(0,3));
            value = '+56' + value;
          }
          this.ls.userLogged.telefono = value;
          res = await this.ps.changeUserInfo(this.ls.userLogged.telefono, 2);
          console.log(res);
          break;
        }
        res = 1;
        break;

      // Correo
      case 2:
        if (value !== '' || value !== this.ls.userLogged.telefono) {
          this.ls.userLogged.email = value;
          res = await this.ps.changeUserInfo(this.ls.userLogged.email, 3);
          console.log(res);
          break;
        }
        res = 1;
        break;

      // Contraseña
      case 3:
        if (value !== '') {
          console.log(value);
          this.ls.userLogged.pass = btoa(value);
          this.ls.userLogged.pass = btoa(this.ls.userLogged.pass);
          this.ls.userLogged.pass = btoa(this.ls.userLogged.pass);
          res = await this.ps.changeUserInfo(this.ls.userLogged.pass, 4);
          console.log(res);
          break;
        }
        res = 1;
        break;

      default: console.log('Opción inválida');
    }

    return res;
  }

}
