import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GerenciaGeneralRoutingModule } from './gerencia-general-routing.module';
import { GerenciaGeneralComponent } from './gerencia-general.component';
import { GerenciaProyectosPlantaComponent } from './gerencia-proyectos-planta/gerencia-proyectos-planta.component';
import { GerenciaSsmComponent } from './gerencia-ssm/gerencia-ssm.component';
import { GerenciaMetalurgiaComponent } from './gerencia-metalurgia/gerencia-metalurgia.component';
import { GerenciaAsuntosExternosComponent } from './gerencia-asuntos-externos/gerencia-asuntos-externos.component';
import { GerenciaSwatTeamComponent } from './gerencia-swat-team/gerencia-swat-team.component';

@NgModule({
  declarations: [GerenciaGeneralComponent, GerenciaProyectosPlantaComponent, GerenciaSsmComponent, GerenciaMetalurgiaComponent, GerenciaAsuntosExternosComponent, GerenciaSwatTeamComponent],
  imports: [
    CommonModule,
    GerenciaGeneralRoutingModule
  ]
})
export class GerenciaGeneralModule { }
