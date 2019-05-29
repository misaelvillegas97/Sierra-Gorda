import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GerenciaMinaComponent } from './gerencia-mina/gerencia-mina.component';
import { GerenciaPmmComponent } from './gerencia-pmm/gerencia-pmm.component';
import { GerenciaMantMinaComponent } from './gerencia-mant-mina/gerencia-mant-mina.component';
import { GerenciaAyrComponent } from './gerencia-ayr/gerencia-ayr.component';

import { OperacionesRoutingModule } from './operaciones-routing.module';
import { OperacionesComponent } from './operaciones.component';
import { GerenciaPlantaComponent } from './gerencia-planta/gerencia-planta.component';
import { GerenciaMantencionPlantaComponent } from './gerencia-mantencion-planta/gerencia-mantencion-planta.component';

@NgModule({
  declarations: [
    OperacionesComponent,
    GerenciaMinaComponent,
    GerenciaPmmComponent,
    GerenciaMantMinaComponent,
    GerenciaAyrComponent,
    GerenciaPlantaComponent,
    GerenciaMantencionPlantaComponent
  ],
  imports: [
    CommonModule,
    OperacionesRoutingModule
  ]
})
export class OperacionesModule { }
