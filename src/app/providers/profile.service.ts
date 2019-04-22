import { Injectable } from '@angular/core';
import { LoginService, LoggedUser, RespuestaBuscar, UsuarioBuscar } from './login.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const URL = 'http://c3wsapi.cl:2200/sg/';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private ls: LoginService, private http: HttpClient) {
    // this.getAllUsers();
  }

  async changeUserInfo(user: LoggedUser) {
    const DATA = {
      id: user.id,
      correo: user.email,
      telefono: user.telefono,
      pass: user.pass
    };
    let respuesta = -1;
    this.http.post(URL + 'usuario/updateusuario', DATA, httpOptions)
      .toPromise()
      .then(
        (res) => {
          // this.ls.userLogged = res;
          console.log(res);
          respuesta = 0;
        }
      );
    return respuesta;
  }

  getAllUsers() {
    return this.http.get(URL + 'usuario/allusuario')
            .toPromise()
            .then(
              res => {
                console.log(res);
              }
            );
  }

  async search(nombre: string, filtroCargo?: string, filtroLugar?: string, filtroGerencia?: string) {
    let respuesta: UsuarioBuscar[] = [];
    const DATA = {
      nombre,
      filtro_c: filtroCargo !== '0' ? filtroCargo : null,
      filtro_l: filtroLugar !== '0' ? filtroLugar : null,
      filtro_g: filtroGerencia !== '0' ? filtroGerencia : null
    };

    await this.http.post(URL + 'usuario/buscar/', DATA, httpOptions)
      .toPromise()
      .then(
        (res: RespuestaBuscar) => {
          console.log(res);
          respuesta = res['usuarios'];
          return respuesta;
        }
      ).catch(
        err => {
          respuesta = [];
          return respuesta;
        }
      );
    return respuesta;
  }
}
