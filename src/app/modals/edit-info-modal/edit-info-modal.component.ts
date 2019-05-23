import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/providers/login.service';
import { ProfileService } from 'src/app/providers/profile.service';
import { MDBModalRef } from 'angular-bootstrap-md';

@Component({
  selector: 'app-edit-info-modal',
  templateUrl: './edit-info-modal.component.html',
  styleUrls: ['./edit-info-modal.component.scss']
})
export class EditInfoModalComponent implements OnInit {

  loading = false;

  constructor( public modalRef: MDBModalRef, public ls: LoginService, private ps: ProfileService ) { }

  ngOnInit() {
  }

  async changeUserInfo(variable: number, value: any) {
    let res: number;
    switch (variable) {
      // Teléfono
      case 1:
        if (value !== '' || value !== this.ls.userLogged.telefono_usuario) {
          if (value.substring(0, 3) !== '+56') {
            console.log(value.substring(0,3));
            value = '+56' + value;
          }
          this.ls.userLogged.telefono_usuario = value;
          res = await this.ps.changeUserInfo(this.ls.userLogged.telefono_usuario, 2);
          console.log(res);
          break;
        }
        res = 1;
        break;

      // Correo
      case 2:
        if (value !== '' || value !== this.ls.userLogged.telefono_usuario) {
          this.ls.userLogged.correo_usuario = value;
          res = await this.ps.changeUserInfo(this.ls.userLogged.correo_usuario, 3);
          console.log(res);
          break;
        }
        res = 1;
        break;

      // Contraseña
      case 3:
        if (value !== '') {
          console.log(value);
          value = btoa(value);
          value = btoa(value);
          value = btoa(value);
          res = await this.ps.changeUserInfo(value, 4);
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
