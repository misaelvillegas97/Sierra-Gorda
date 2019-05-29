import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SustentabilidadRoutingModule } from './sustentabilidad-routing.module';
import { SustentabilidadComponent } from './sustentabilidad.component';
import { GerenciaLegalComponent } from './gerencia-legal/gerencia-legal.component';
import { GerenciaSustentabilidadComponent } from './gerencia-sustentabilidad/gerencia-sustentabilidad.component';

@NgModule({
  declarations: [SustentabilidadComponent, GerenciaLegalComponent, GerenciaSustentabilidadComponent],
  imports: [
    CommonModule,
    SustentabilidadRoutingModule
  ]
})
export class SustentabilidadModule { }
