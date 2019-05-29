import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RrhhComponent } from './rrhh.component';
import { GerenciaRrhhComponent } from './gerencia-rrhh/gerencia-rrhh.component';

const routes: Routes = [
  {
    path: '',
    component: RrhhComponent
  },
  {
    path: 'gerencia-rrhh',
    component: GerenciaRrhhComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RrhhRoutingModule { }
