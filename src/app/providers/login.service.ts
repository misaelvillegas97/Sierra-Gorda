import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RespuestaStatus, RespuestaLogin, LoggedUser } from '../interface/interface';
import { MatSnackBar } from '@angular/material';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  userLogged: LoggedUser;

  constructor(public http: HttpClient, private snackbar: MatSnackBar) {
    console.log('Servicio iniciado');
    if (this.userLogged === null) { this.userLogged = undefined; }
    this.isLoggedIn();
    if (localStorage.getItem('sg-userID') && this.userLogged === undefined) {
      const userID = parseInt(atob(localStorage.getItem('sg-userID')), 0);
      this.getUserLogged(userID);
    }
  }


  async login(rut: number, dv: number, pass: string) {
    let respuesta;
    const data = {
        rut,
        dv,
        pass
    }
    await this.http.post('http://c3wsapi.cl:2200/sg/usuario/login', data, httpOptions)
      .toPromise()
      .then( (res: RespuestaLogin) => {
        if (res.err) {
          respuesta = res.err;
          switch ( res.err ) {
            case 404:
              this.snackbar.open('Rut o contraseña incorrectos' , null, {
                duration: 3000,
                verticalPosition: 'bottom',
                horizontalPosition: 'right',
                panelClass: ['snackbar-login', 'snackbar-login-err'],
                announcementMessage: 'Mensaje de bienvenida',
              });
              break;
          }
          return res.err;
        }

        this.userLogged = res.userauth;
        if (this.userLogged.telefono.substring(0, 3) !== '+56') {
          this.userLogged.telefono = '+56' + this.userLogged.telefono;
        }
        localStorage.setItem('sg-position', res.userauth.cargo);
        localStorage.setItem('sg-userID', btoa(res.userauth.id.toString()));
        localStorage.setItem('sg-user', (res.userauth.rut + '-' + res.userauth.dv_rut));
        localStorage
          .setItem(
            'sg-userName',
            (res.userauth.primer_nombre + ' ' + res.userauth.apellido_paterno + ' ' + res.userauth.apellido_materno)
          );
        respuesta = 0;
        this.snackbar.open('Iniciaste sesión como: ' + res.userauth.primer_nombre + ' ' + res.userauth.apellido_paterno, null, {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right',
          panelClass: ['snackbar-login'],
          announcementMessage: 'Mensaje de bienvenida'
        });
        return respuesta;
      })
      .catch(
        err => {
          switch (err.status) {
            case 0:
              alert('0 - Error trying to connect WebService <<http://c3wsapi.cl>> | Login');
              break;
            case 404:
              alert('404 - Page doesn\'t exist <<http://c3wsapi.cl>> | Login');
              break;
            case 500:
              alert('500 - Error on code <<http://c3wsapi.cl>> | Login');
              break;
          }
          return [];
        }
      );

    return respuesta;
  }

  async getUserLogged(id: number) {
    this.http.get('http://c3wsapi.cl:2200/sg/usuario/getusuarioconid/' + id)
      .toPromise()
      .then(
        (res: RespuestaStatus) => {
          this.userLogged = res.usuario;
          if (this.userLogged.telefono.substring(0, 3) !== '+56') {
            this.userLogged.telefono = '+56' + this.userLogged.telefono;
          }
          // console.log(this.userLogged);
        })
        .catch(
          err => {
            switch (err.status) {
              case 0:
                alert('0 - Error trying to connect WebService <<http://c3wsapi.cl>> | Obtener usuario');
                break;
              case 404:
                alert('404 - Page doesn\'t exist <<http://c3wsapi.cl>> | Obtener usuario');
                break;
              case 500:
                alert('500 - Error on code <<http://c3wsapi.cl>> | Obtener usuario');
                break;
            }
            return [];
          }
        );
  }

  logout() {
    localStorage.removeItem('sg-position');
    localStorage.removeItem('sg-user');
    localStorage.removeItem('sg-userName');
    localStorage.removeItem('sg-userID');
    this.userLogged = undefined;
  }

  isLoggedIn(): boolean {
    if (localStorage.getItem('sg-user') && localStorage.getItem('sg-position') &&
        localStorage.getItem('sg-userName') && localStorage.getItem('sg-userID')) {
      return true;
    } else {
      return false;
    }
  }

}
