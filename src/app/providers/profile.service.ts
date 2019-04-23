import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RespuestaBuscar, ResponsePosition, ResponseGerency, ResponsePlaces, Gerencies, Places } from '../interface/interface';
import { LoggedUser, UsuarioBuscar, Positions } from '../interface/interface';

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
  public positions: Positions[];
  public gerencies: Gerencies[];
  public places: Places[];

  constructor(private ls: LoginService, private http: HttpClient) {
    // this.getAllUsers();
    this.getAllGerency();
    this.getAllPlaces();
    this.getAllPositions();
  }

  async changeUserInfo(value: any, type: number) {
    let respuesta = -1;
    let data = {};
    switch (type) {
      case 2:
        data = {
          id: this.ls.userLogged.id,
          telefono: value
        };
        break;

      case 3:
        data = {
          id: this.ls.userLogged.id,
          correo: value
        };
        break;

      case 4:
        console.log(value);
        data = {
          id: this.ls.userLogged.id,
          pass: value
        };
    }
    await this.http.post(URL + 'usuario/updateusuario', data, httpOptions)
      .toPromise()
      .then(
        (res) => {
          // this.ls.userLogged = res;
          // console.log(res);
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
          if (res.err === 404) {
            return [];
          }
          respuesta = res.usuarios;
          console.table(res.usuarios);
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

  // Cargos
  getAllPositions() {
    this.http.get(URL + 'empresa/cargo/')
      .toPromise()
      .then(
        (res: ResponsePosition) => {
          if (res.cargo.length !== 0) {
            this.positions = res.cargo;
            // console.table(this.positions);
          }
          return;
        }
      ).catch(
        err => {
          console.error(err);
          return;
        }
      );
  }

  getArrayNameById(_id: string, array: number): string {
    switch (array) {
      case 1:
        let cargos: Positions;
        cargos = this.positions.find(
          cargo => cargo.id === parseInt(_id, 0)
          );
        return cargos.nombre_cargo;
        break;

      case 2:
        let lugar: Places;
        lugar = this.places.find(
          place => place.id === parseInt(_id, 0)
          );
        return lugar.nombre_lugar_trabajo;
        break;

      case 3:
        let gerencia: Gerencies;
        gerencia = this.gerencies.find(
          gerency => gerency.id === parseInt(_id, 0)
          );
        return gerencia.nombre_gerencia;
        break;
    }
  }

  getAllGerency() {
    this.http.get(URL + 'empresa/gerencias/')
      .toPromise()
      .then(
        (res: ResponseGerency) => {
          if (res.gerencias.length !== 0) {
            this.gerencies = res.gerencias;
            // console.table(this.gerencies);
          }
          return;
        }
      ).catch(
        err => {
          console.error(err);
          return;
        }
      );
  }

  getAllPlaces() {
    this.http.get(URL + 'empresa/lugar_trabajo/')
      .toPromise()
      .then(
        (res: ResponsePlaces) => {
          if (res.lugar_trabajo.length !== 0) {
            this.places = res.lugar_trabajo;
            // console.table(this.places);
          }
          return;
        }
      ).catch(
        err => {
          console.error(err);
          return;
        }
      );
  }
}
