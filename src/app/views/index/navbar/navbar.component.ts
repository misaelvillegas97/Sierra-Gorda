import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/providers/login.service';

declare var $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public loginService: LoginService) { }

  ngOnInit() {
  }

  onNameHover( state: boolean ) {
    if (state) {
      $('#user-hover-menu').css('visibility', 'visible');
      $('#user-hover-menu').addClass('animated');
      $('#user-hover-menu').addClass('fadeIn');
      $('#user-hover-menu').addClass('faster');
    } else {
      $('#user-hover-menu').removeClass('fadeIn');
      $('#user-hover-menu').addClass('fadeOut');

      setTimeout(() => {
        $('#user-hover-menu').css('visibility', 'hidden');
        $('#user-hover-menu').removeClass('fadeOut');
      }, 500);
    }
  }

  async login(rut: string, pass: string) {
    let rutD = rut.replace('.', '').replace('.', '').split('-');
    let run = parseInt(rutD[0].toString(), 0);
    let dv = parseInt(rutD[1].toString(), 0)
    // pass = btoa(pass);
    console.log(await this.loginService.login(run, dv, pass));
    console.log(await this.loginService.userLogged);
  }

}
