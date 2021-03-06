import { Component, OnInit } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { LoginService } from 'src/app/providers/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {
  title: string;
  loading: boolean;

  recovery: boolean;

  constructor( public modalRef: MDBModalRef, private ls: LoginService, private snackbar: MatSnackBar ) {
  }

  ngOnInit() {
    this.loading = false;
    this.recovery = false;
  }


  async login(form: {rut: string, pass: string}) {
    this.loading = true;
    const rut = this.formateaRut(form.rut);
    let pass = form.pass;
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
          if (res !== -1) {
            this.modalRef.hide();
          }
        }
        this.loading = false;
      }
    );
  }

  formateaRut(rut) {
    const actual = rut.replace(/^0+/, '');
    let rutPuntos = '';
    if (actual !== '' && actual.length > 1) {
        const sinPuntos = actual.replace(/\./g, '');
        const actualLimpio = sinPuntos.replace(/-/g, '');
        const inicio = actualLimpio.substring(0, actualLimpio.length - 1);
        let i = 0;
        let j = 1;
        for (i = inicio.length - 1; i >= 0; i--) {
            // tslint:disable-next-line: prefer-const
            let letra = inicio.charAt(i);
            rutPuntos = letra + rutPuntos;
            if (j % 3 === 0 && j <= inicio.length - 1) {
                rutPuntos = '.' + rutPuntos;
            }
            j++;
        }
        const dv = actualLimpio.substring(actualLimpio.length - 1);
        rutPuntos = rutPuntos + '-' + dv;
    }
    return rutPuntos;
  }

  recoverPass(form: {correo: string}) {
    this.loading = true;
    this.ls.passRecovery(form.correo).then(
      res => {
        this.snackbar.open('En los próximos minutos recibirás un correo de recuperación.', null, {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right',
          panelClass: ['snackbar-login'],
          announcementMessage: 'Mensaje de bienvenida'
        });

        this.recovery = false;
        this.loading = false;
      }
    );
  }

}
