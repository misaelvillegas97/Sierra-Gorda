import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RrhhRoutingModule } from './rrhh-routing.module';
import { RrhhComponent } from './rrhh.component';
import { GerenciaRrhhComponent } from './gerencia-rrhh/gerencia-rrhh.component';

@NgModule({
  declarations: [
    RrhhComponent,
    GerenciaRrhhComponent
  ],
  imports: [
    CommonModule,
    RrhhRoutingModule
  ]
})
export class RrhhModule { }
