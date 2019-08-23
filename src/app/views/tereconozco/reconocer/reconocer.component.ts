import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ReconozcoService } from 'src/app/providers/reconozco.service';
import { Valor } from 'src/app/interface/reconozco';
import { ModalDirective } from 'angular-bootstrap-md';
import { ProfileService } from 'src/app/providers/profile.service';
import { LoginService } from 'src/app/providers/login.service';
import { UsuarioBuscar } from 'src/app/interface/interface';
import { MatSnackBar } from '@angular/material/snack-bar';

declare var Croppie: any;

@Component({
  selector: 'app-reconocer',
  templateUrl: './reconocer.component.html',
  styleUrls: ['../tereconozco.component.scss']
})
export class ReconocerComponent implements OnInit, OnDestroy {
  @ViewChild('basicModal') demoBasic: ModalDirective;

  selectedType: number;
  myImage: string = undefined;
  myImageGroup: string = undefined;
  croppie: any;
  uploadCrop: any;
  nombre_valor: string;

  // UserTextBox
  userSearchBox = '';
  bossSearchBox = '';

  buttons: ButtonF[] = [
    {
      id: 0,
      number: 'Selección',
      actual: true,
      completed: false
    },
    {
      id: 1,
      number: 'Reconocimiento',
      actual: false,
      completed: false
    },
    {
      id: 2,
      number: 'Resumen',
      actual: false,
      completed: false
    }
  ];

  respuestas: Respuesta = {
    modalidad: '0',
    equipo: '0',
    nombre_grupo: '0',
    valor_estar: '0',
    conducta: '0',
    argumento: ''
  };

  // Buscador Usuarios
  listaUsuariosBusqueda: UsuarioBuscar[];
  listaUsuariosSeleccionados: UsuarioBuscar[];
  listaJefesBusqueda: UsuarioBuscar[];
  listaJefesSeleccionados: UsuarioBuscar;

  constructor(public rs: ReconozcoService, private us: ProfileService, private snackbar: MatSnackBar, private ls: LoginService) {
    // this.rs.getAllValores();
    this.rs.getAllGerencias();
  }

  ngOnInit() {
    this.croppie = document.getElementById('croppie');
    this.uploadCrop = new Croppie(this.croppie, {
      enableExif: true,
      viewport: {
        width: 500,
        height: 500,
        type: 'square'
      },
      boundary: {
        width: 500,
        height: 500
      }
    });
  }

  ngOnDestroy() {
    this.listaUsuariosBusqueda = undefined;
  }

  openCrop($event: any, _i: number) {
    const input = $event.srcElement;
    this.selectedType = _i;
    let _ = this;
    this.myImage = null;

    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = function(e) {
        _.uploadCrop.bind({
          url: e.target['result']
        })
      };
      reader.readAsDataURL(input.files[0]);

    }
    this.demoBasic.show();
  }

  onUserSearch(_text: string) {
    if (this.respuestas.modalidad !== '0' && this.respuestas.equipo !== '0') {
      this.rs.searchUsers(_text, this.ls.userLogged.nivel, parseInt(this.respuestas.equipo, 0))
        .then(
          (resultados: UsuarioBuscar[]) => {
            this.listaUsuariosBusqueda = resultados;
          }
        ).catch(
          (err) => {
            this.snackbar.open('Error buscando usuarios', null, {
              duration: 3000,
              verticalPosition: 'bottom',
              horizontalPosition: 'right',
              panelClass: ['snackbar-login'],
              announcementMessage: 'Mensaje de bienvenida'
            });
          }
        );
    } else {
      this.snackbar.open('Completa todos los campos antes de buscar', null, {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'right',
        panelClass: ['snackbar-login'],
        announcementMessage: 'Mensaje de bienvenida'
      });
    }
  }

  getConducta() {
    return this.rs.listValores.find(
      valor => valor.id === parseInt(this.respuestas.valor_estar, 0)).comportamientos.find(
        conducta => conducta.id_valor_comportamiento === parseInt(this.respuestas.conducta, 0)
    ).nombre_comportamiento;
  }

  onBossSearch(_text: string) {
    // console.log(_text);
    this.us.searchBoss(_text)
      .then(
        (resultados: UsuarioBuscar[]) => {
          this.listaJefesBusqueda = resultados;
        }
      ).catch(
        (err) => {
          this.snackbar.open('Error buscando jefes', null, {
            duration: 3000,
            verticalPosition: 'bottom',
            horizontalPosition: 'right',
            panelClass: ['snackbar-login'],
            announcementMessage: 'Mensaje de bienvenida'
          });
        }
      );
  }

  seeResults() {
    this.uploadCrop.result('base64', 'viewport', 'png').then((blob) => {
      if (this.selectedType === 1) {
        this.myImageGroup = blob;
      }

      if (this.selectedType === 2) {
        this.myImage = blob;
      }
    });

    this.demoBasic.hide();
  }

  // validateShown(_valor: Valor) {
  //   if (parseInt(this.respuestas.equipo, 0) === _valor.estado_gru && parseInt(this.respuestas.modalidad, 0) === _valor.estado_staff) {
  //     return true;
  //   }

  //   return false;
  // }

  validateShown(_valor: Valor) {
    if (parseInt(this.respuestas.modalidad, 0) !== 0) {
      if (parseInt(this.respuestas.modalidad, 0) === 1 && (_valor.estado_gru === 1 || _valor.estado_gru === 2)) {
        return true;
      } else {
        if (parseInt(this.respuestas.modalidad, 0) === 2 && parseInt(this.respuestas.equipo, 0) === _valor.estado_gru && parseInt(this.respuestas.equipo, 0) === _valor.estado_staff) {
          return true;
        } else {
          return false;
        }
      }
    }

    return false;
  }

  setRespuesta(button: ButtonF, _i: number) {
    if (this.buttons[_i - 1]) {
      this.buttons[_i - 1].completed = true;
      this.buttons[_i - 1].actual = false;
    }
    this.buttons[_i].actual = true;

    if (this.buttons[_i + 1]) {
      this.buttons[_i + 1].completed = false;
      this.buttons[_i + 1].actual = false;
    }

    if (this.buttons[_i + 2]) {
      this.buttons[_i + 2].completed = false;
      this.buttons[_i + 2].actual = false;
    }
  }

  getNombreGerencia(_text: string): string {
    let nombre = parseInt(_text, 0);

    return this.rs.listGerencias.find(gerencias => gerencias.id === nombre).nombre_gerencia;
  }

  validateNext(_i: number) {
    // console.log(_i);
    switch (_i) {
      case 1:
        if (this.respuestas.valor_estar !== '0' && this.respuestas.modalidad !== '0' && this.respuestas.equipo !== '0') {
          // console.log('Primera capa');
          if (this.respuestas.modalidad === '1') {
            // console.log('Segunda capa');
            if (this.listaUsuariosSeleccionados) {
              if (this.listaUsuariosSeleccionados.length !== 1) {
                return true;
              } else {
                return false;
              }
            } else {
              return true;
            }
          }
          if (this.respuestas.modalidad === '2') {
            if (this.listaUsuariosSeleccionados) {
              if (this.listaUsuariosSeleccionados.length === 0) {
                return true;
              } else {
                if (this.respuestas.nombre_grupo !== '0') {
                  return false;
                } else {
                  return true;
                }
              }
            } else {
              return true;
            }
          }
        } else {
          return true;
        }
        break;

      case 2:
        if (this.respuestas.argumento.length === 0 || this.respuestas.conducta === '0') {
          return true;
        } else {
          return false;
        }
    }
  }

  selectUsuario(_user: UsuarioBuscar) {
    if (this.respuestas.modalidad === '1') {
      this.listaUsuariosSeleccionados = [];
      this.listaUsuariosSeleccionados.push(_user);
    }

    if (this.respuestas.modalidad === '2') {
      if (!this.listaUsuariosSeleccionados) {
        this.listaUsuariosSeleccionados = [];
      }
      if (!this.listaUsuariosSeleccionados.find(user => user === _user)) {
        this.listaUsuariosSeleccionados.push(_user);
      }
    }

    if (this.respuestas.modalidad === '0') {
      this.snackbar.open('Selecciona una modalidad.', null, {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'right',
        panelClass: ['snackbar-login']
      });
    }
  }

  selectJefe(_user: UsuarioBuscar) {
    this.listaJefesSeleccionados = undefined;

    this.listaJefesSeleccionados = _user;
    this.listaJefesBusqueda = undefined;
    this.bossSearchBox = '';
  }

  returnValorConducta(): Valor {
    if (this.respuestas.valor_estar !== '0') {
      return this.rs.listValores.find(valor => valor.id === parseInt(this.respuestas.valor_estar, 0));
    }
  }

  modalidadChange() {
    if (this.listaUsuariosSeleccionados) {
      if (this.listaUsuariosSeleccionados.length !== 0) {
        this.listaUsuariosSeleccionados = [];
      }
    }

    const id_modalidad = parseInt(this.respuestas.modalidad, 0);
    const id_equipo = parseInt(this.respuestas.equipo, 0);
    this.rs.getValoresOnChange(id_modalidad, id_equipo);
  }

  respuestasChange() {
    if (this.listaUsuariosSeleccionados) {
      if (this.listaUsuariosSeleccionados.length !== 0) {
        this.listaUsuariosSeleccionados = [];
      }
    }

    const id_modalidad = parseInt(this.respuestas.modalidad, 0);
    const id_equipo = parseInt(this.respuestas.equipo, 0);
    this.rs.getValoresOnChange(id_modalidad, id_equipo);
  }

  sendReconocimiento() {
    let idUsuarios: string[] = [];

    this.listaUsuariosSeleccionados.forEach(usuario => {
      idUsuarios.push(usuario.id_usuario + '');
    });

    const RECONOCIMIENTO = {
      reconocedor: this.ls.userLogged.id_usuario,
      reconocido: idUsuarios.join(),
      comentario: this.respuestas.argumento,
      valor_comportamiento: this.respuestas.valor_estar,
      jefe: this.listaJefesSeleccionados.id_usuario.toString(),
      nombre_grupo: this.respuestas.nombre_grupo ? parseInt(this.respuestas.nombre_grupo, 0) : null,
      url_img: this.myImage ? this.myImage.substr(22) : null,
      formato: 'png',
      img_grupo: this.myImageGroup ? this.myImageGroup.substr(22) : null,
      formato2: 'png',
      tipo_r: parseInt(this.respuestas.modalidad, 0)
    };

    this.rs.sendReconocimiento(RECONOCIMIENTO);
  }

  updateNombreValor($e: any) {
    console.log($e.srcElement.value);
    const id: number = parseInt($e.srcElement.value, 0);

    if (id !== 0) {
      const valor = this.rs.listValores.find(
        val => val.id === id
      );
      this.nombre_valor = valor.nombre;
    }
  }

  valorColorBg(): string {
    switch (parseInt(this.respuestas.valor_estar, 0)) {
      case 1: return 'sg-blue-bg';
      case 2: return 'sg-green-bg';
      case 3: return 'sg-yellow-bg';
      case 4: return 'sg-orange-bg';
      case 5: return 'sg-red-bg';
      default: return 'sg-blue-bg';
    }
  }

  deleteSelectedUser(_user: UsuarioBuscar) {
    this.listaUsuariosSeleccionados = this.listaUsuariosSeleccionados.filter(
      user => user !== _user
    );
  }
}

interface ButtonF {
  id: number;
  number: string;
  actual: boolean;
  completed: boolean;
}

interface Respuesta {
  modalidad: string;
  equipo: string;
  nombre_grupo: string;
  valor_estar: string;
  conducta: string;
  argumento: string;
}
