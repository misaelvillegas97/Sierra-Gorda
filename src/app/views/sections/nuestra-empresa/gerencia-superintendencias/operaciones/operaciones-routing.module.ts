import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GerenciaMinaComponent } from './gerencia-mina/gerencia-mina.component';
import { GerenciaPmmComponent } from './gerencia-pmm/gerencia-pmm.component';
import { GerenciaMantMinaComponent } from './gerencia-mant-mina/gerencia-mant-mina.component';
import { GerenciaAyrComponent } from './gerencia-ayr/gerencia-ayr.component';
import { OperacionesComponent } from './operaciones.component';
import { GerenciaMantencionPlantaComponent } from './gerencia-mantencion-planta/gerencia-mantencion-planta.component';
import { GerenciaPlantaComponent } from './gerencia-planta/gerencia-planta.component';

const routes: Routes = [
  {
    path: '',
    component: OperacionesComponent,
  },
  {
    path: 'gerencia-mina',
    component: GerenciaMinaComponent
  },
  {
    path: 'gerencia-pmm',
    component: GerenciaPmmComponent
  },
  {
    path: 'gerencia-mant-mina',
    component: GerenciaMantMinaComponent
  },
  {
    path: 'gerencia-ayr',
    component: GerenciaAyrComponent
  },
  {
    path: 'gerencia-planta',
    component: GerenciaPlantaComponent
  },
  {
    path: 'gerencia-mant-planta',
    component: GerenciaMantencionPlantaComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperacionesRoutingModule { }
