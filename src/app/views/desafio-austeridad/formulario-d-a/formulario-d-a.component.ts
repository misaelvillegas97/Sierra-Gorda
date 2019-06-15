import { Component, OnInit } from '@angular/core';
import { DesafioService } from 'src/app/providers/desafio.service';
import { FormularioDesafio } from 'src/app/interface/desafio';

@Component({
  selector: 'app-formulario-d-a',
  templateUrl: './formulario-d-a.component.html',
  styleUrls: ['./formulario-d-a.component.scss']
})
export class FormularioDAComponent implements OnInit {
  buttons: ButtonF[] = [
    {
      id: 0,
      number: 1,
      actual: true,
      completed: false
    },
    {
      id: 1,
      number: 2,
      actual: false,
      completed: false
    },
    {
      id: 2,
      number: 3,
      actual: false,
      completed: false
    },
    {
      id: 3,
      number: 4,
      actual: false,
      completed: false
    },
    {
      id: 4,
      number: 5,
      actual: false,
      completed: false
    },
    {
      id: 5,
      number: 6,
      actual: false,
      completed: false
    },
    {
      id: 6,
      number: 7,
      actual: false,
      completed: false
    },
  ];

  respuestas: Respuesta = {
    titulo: '',
    desc: '',
    id_area: '0',
    id_valor: '0',
    justificacion: '',
    impacto: '',
    impacto_nivel: 0 + '',
    dificultad: '0',
    info_adicional: '',
  };

  constructor(public ds: DesafioService) {
    this.ds.getAllAreas();
    this.ds.getAllValores();
  }

  ngOnInit() {
  }

  setRespuesta(button: ButtonF, _i: number) {
    if (this.buttons[_i - 1]) {
      this.buttons[_i - 1].completed = true;
      this.buttons[_i - 1].actual = false;
    }
    this.buttons[_i].actual = true;
  }

  console(_x: any) {
    console.log(_x);
  }

  table(_x: any) {
    console.table(_x);
  }

  validateNext(_i: number) {
    switch (_i) {
      case 0:
        // console.table(this.respuestas);
        if (this.respuestas.titulo.length > 3 && this.respuestas.desc.length > 3) { return false; } else { return true; }
        break;

      case 1:
        if (this.respuestas.id_area !== '0') { return false; } else { return true; }
        break;

      case 2:
        if (this.respuestas.id_valor !== '0' && this.respuestas.justificacion.length > 3) { return false; } else { return true; }
        break;

      case 3:
        if (this.respuestas.impacto.length > 3) { return false; } else { return true; }
        break;

      case 4:
        return false;
        break;

      case 5:
        return false;
        break;

      case 6:
        if (this.respuestas.info_adicional.length > 3) { return false; } else { return true; }
        break;
    }
  }

  insert( f: any ) {
    // console.table(f);
    const DESAFIO: FormularioDesafio = {
      id_usuario: parseInt(atob(localStorage.getItem('sg-userID')), 0),
      titulo: f['resp_1_1'],
      descripcion: f['resp_1_2'],
      area: parseInt(f['r_2_1'], 0),
      valor: parseInt(f['resp_3_1'], 0),
      justificacion: f['resp_3_2'],
      descripcion_impacto: f['resp_4_1'],
      impacto: parseInt(f['r_5_1'], 0),
      dificultad: parseInt(f['r_6_1'], 0),
      texto_ad: f['r_7_1']
    };

    this.ds.insert(DESAFIO);
  }
}

interface ButtonF {
  id: number;
  number: number;
  actual: boolean;
  completed: boolean;
}

interface Respuesta {
  titulo?: string;
  desc?: string;
  id_area?: string;
  id_valor?: string;
  justificacion?: string;
  impacto?: string;
  impacto_nivel?: string;
  dificultad?: string;
  info_adicional?: string;
}
