import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

  constructor(public http: HttpClient) {
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
        return respuesta;
      }).catch((err) => {
      });

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
          console.log(this.userLogged);
        }
      );
  }

  logout() {
    localStorage.removeItem('sg-position');
    localStorage.removeItem('sg-user');
    localStorage.removeItem('sg-userName');
    // localStorage.removeItem('sg-userID');
    this.userLogged = undefined;
  }

  isLoggedIn(): boolean {
    if (localStorage.getItem('sg-user') && localStorage.getItem('sg-position') && localStorage.getItem('sg-userName')) {
      return true;
    } else {
      return false;
    }
  }

}

export interface RespuestaLogin {
  err: number;
  message: string;
  userauth: LoggedUser;
}

export interface LoggedUser {
  apellido_materno?: string;
  apellido_paterno?: string;
  cargo?: string;
  dv_rut: number;
  email?: string;
  fecha_creacion?: Date;
  fecha_nacimiento?: Date;
  gerencia?: string;
  id: number;
  lugar_trabajo?: string;
  pass?: string;
  primer_nombre: string;
  rut: number;
  segundo_nombre?: string;
  telefono?: string;
  tercer_nombre?: string;
  url_img?: string;
  privilegio?: string;
}

export interface RespuestaStatus {
  err: number;
  message: string;
  usuario: LoggedUser;
}

export interface RespuestaBuscar {
  err: number;
  message: string;
  usuarios: UsuarioBuscar[]
}

export interface UsuarioBuscar {
  apellido_mat_usuario?: string;
  apellido_pat_usuario?: string;
  cantidad_recon?: number;
  correo_usuario?: string;
  dv_usuario?: string;
  fecha_nacimiento_usuario?: Date;
  id_estado_usuario_fk?: number;
  id_usuario?: number;
  img_perfil_usuario?: string;
  nombre_cargo?: string;
  nombre_gerencia?: string;
  nombre_lugar_trabajo?: string;
  pass_usuario?: string;
  primer_nombre_usuario?: string;
  rut_usuario?: string;
  segundo_nombre_usuario?: string;
  telefono_usuario?: string;
  tercer_nombre_usuario?: string;
  token?: string;
}
