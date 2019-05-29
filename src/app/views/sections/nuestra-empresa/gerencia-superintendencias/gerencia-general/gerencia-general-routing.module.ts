import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GerenciaGeneralComponent } from './gerencia-general.component';
import { GerenciaProyectosPlantaComponent } from './gerencia-proyectos-planta/gerencia-proyectos-planta.component';
import { GerenciaSsmComponent } from './gerencia-ssm/gerencia-ssm.component';
import { GerenciaMetalurgiaComponent } from './gerencia-metalurgia/gerencia-metalurgia.component';
import { GerenciaAsuntosExternosComponent } from './gerencia-asuntos-externos/gerencia-asuntos-externos.component';
import { GerenciaSwatTeamComponent } from './gerencia-swat-team/gerencia-swat-team.component';

const routes: Routes = [
  {
    path: '',
    component: GerenciaGeneralComponent
  },
  {
    path: 'gerencia-proyectos-planta',
    component: GerenciaProyectosPlantaComponent
  },
  {
    path: 'gerencia-salud-seguridad-medio-ambiente',
    component: GerenciaSsmComponent
  },
  {
    path: 'gerencia-metalurgia',
    component: GerenciaMetalurgiaComponent
  },
  {
    path: 'gerencia-asuntos-externos',
    component: GerenciaAsuntosExternosComponent
  },
  {
    path: 'gerencia-swat-team',
    component: GerenciaSwatTeamComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GerenciaGeneralRoutingModule { }
