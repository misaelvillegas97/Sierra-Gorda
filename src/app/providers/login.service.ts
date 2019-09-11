import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RespuestaStatus, RespuestaLogin, Usuario, Receiver, RespuestaStatus2 } from '../interface/interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  userLogged: Usuario;

  constructor(private http: HttpClient, private snackbar: MatSnackBar, private route: Router) {
    // console.log('Servicio iniciado');
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
    };
    await this.http.post('https://c3wsapi.cl/sg/usuario/login', data, httpOptions)
      .toPromise()
      .then((res: RespuestaLogin) => {
        if (res.err) {
          respuesta = res.err;
          switch (res.err) {
            case 404:
              this.snackbar.open('Rut o contraseña incorrectos', null, {
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
        if (this.userLogged.telefono_usuario.substring(0, 3) !== '+56') {
          this.userLogged.telefono_usuario = '+56' + this.userLogged.telefono_usuario;
        }
        localStorage.setItem('sg-position', res.userauth.nombre_cargo);
        localStorage.setItem('sg-userID', btoa(res.userauth.id_usuario.toString()));
        localStorage.setItem('sg-user', (res.userauth.rut_usuario + '-' + res.userauth.dv_usuario));
        localStorage
          .setItem(
            'sg-userName',
            (res.userauth.primer_nombre_usuario + ' ' + res.userauth.apellido_pat_usuario + ' ' + res.userauth.apellido_mat_usuario)
          );
        respuesta = 0;
        this.snackbar.open('Iniciaste sesión como: ' + res.userauth.primer_nombre_usuario + ' ' + res.userauth.apellido_pat_usuario, null, {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right',
          panelClass: ['snackbar-login'],
          announcementMessage: 'Mensaje de bienvenida'
        });

        switch (this.route.url) {
          case '/':
            // location.reload();
            this.route.navigateByUrl('/refresh', { skipLocationChange: true }).then(
              () => {
                this.route.navigateByUrl('/');
              }
            );
            break;
          default:
            this.route.navigateByUrl('/');
        }
        return respuesta;
      })
      .catch(
        err => {
          switch (err.status) {
            case 0:
              this.snackbar.open('Sin conexión con el servidor', null, {
                duration: 3000,
                verticalPosition: 'bottom',
                horizontalPosition: 'right',
                panelClass: ['snackbar-login', 'snackbar-login-err'],
                announcementMessage: 'Mensaje de bienvenida',
              });
              break;
            case 404:
              this.snackbar.open('Página no encontrada', null, {
                duration: 3000,
                verticalPosition: 'bottom',
                horizontalPosition: 'right',
                panelClass: ['snackbar-login', 'snackbar-login-err'],
                announcementMessage: 'Mensaje de bienvenida',
              });
              break;
            case 500:
              this.snackbar.open('Error en el webservice', null, {
                duration: 3000,
                verticalPosition: 'bottom',
                horizontalPosition: 'right',
                panelClass: ['snackbar-login', 'snackbar-login-err'],
                announcementMessage: 'Mensaje de bienvenida',
              });
              break;
          }
          return -1;
        }
      );

    return respuesta;
  }

  async getUserLogged(id: number) {
    this.http.get('https://c3wsapi.cl/sg/usuario/getusuarioconid/' + id)
      .toPromise()
      .then(
        (res: RespuestaStatus) => {
          this.userLogged = res.usuario;
          if (this.userLogged.telefono_usuario.substring(0, 3) !== '+56') {
            this.userLogged.telefono_usuario = '+56' + this.userLogged.telefono_usuario;
          }
          // console.log(this.userLogged);
        })
      .catch(
        err => {
          switch (err.status) {
            case 0:
              // alert('0 - Error trying to connect WebService <<http://c3wsapi.cl>> | Obtener usuario');
              break;
            case 404:
              // alert('404 - Page doesn\'t exist <<http://c3wsapi.cl>> | Obtener usuario');
              break;
            case 500:
              // alert('500 - Error on code <<http://c3wsapi.cl>> | Obtener usuario');
              break;
          }
          return [];
        }
      );
  }

  async getUserById(id: number) {
    let resp: Receiver;
    await this.http.get('https://c3wsapi.cl/sg/usuario/getusuarioconid/' + id)
      .toPromise()
      .then(
        (res: RespuestaStatus2) => {
          resp = res.usuario;
          // console.log(this.userLogged);
        })
      .catch(
        err => {
          switch (err.status) {
            case 0:
              // alert('0 - Error trying to connect WebService <<http://c3wsapi.cl>> | Obtener usuario');
              break;
            case 404:
              // alert('404 - Page doesn\'t exist <<http://c3wsapi.cl>> | Obtener usuario');
              break;
            case 500:
              // alert('500 - Error on code <<http://c3wsapi.cl>> | Obtener usuario');
              break;
          }
          return [];
        }
      );

    return resp;
  }

  async passRecovery(_mail: string) {
    const URL_REQUEST = `https://c3wsapi.cl/sg/usuario/recuperarpass/`;
    const DATA = {
      email: _mail
    };

    this.http.post(URL_REQUEST, DATA).toPromise()
      .then(
        res => {
          console.log(res);
        }
      );

    return 1;
  }

  logout() {
    localStorage.removeItem('sg-position');
    localStorage.removeItem('sg-user');
    localStorage.removeItem('sg-userName');
    localStorage.removeItem('sg-userID');
    this.userLogged = undefined;

    this.route.navigateByUrl('/');
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
