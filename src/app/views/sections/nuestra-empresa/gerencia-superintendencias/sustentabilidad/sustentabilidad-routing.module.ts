import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SustentabilidadComponent } from './sustentabilidad.component';
import { GerenciaLegalComponent } from './gerencia-legal/gerencia-legal.component';
import { GerenciaSustentabilidadComponent } from './gerencia-sustentabilidad/gerencia-sustentabilidad.component';

const routes: Routes = [
  {
    path: '',
    component: SustentabilidadComponent
  },
  {
    path: 'gerencia-legal',
    component: GerenciaLegalComponent
  },
  {
    path: 'gerencia-sustentabilidad',
    component: GerenciaSustentabilidadComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SustentabilidadRoutingModule { }
