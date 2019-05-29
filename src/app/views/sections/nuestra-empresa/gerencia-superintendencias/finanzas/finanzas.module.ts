import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinanzasRoutingModule } from './finanzas-routing.module';
import { FinanzasComponent } from './finanzas.component';
import { GerenciaImpuestosComponent } from './gerencia-impuestos/gerencia-impuestos.component';
import { GerenciaMejorNegocioComponent } from './gerencia-mejor-negocio/gerencia-mejor-negocio.component';
import { GerenciaContTesoComponent } from './gerencia-cont-teso/gerencia-cont-teso.component';
import { GerenciaInformaticaComponent } from './gerencia-informatica/gerencia-informatica.component';

@NgModule({
  declarations: [
    GerenciaImpuestosComponent,
    GerenciaMejorNegocioComponent,
    GerenciaContTesoComponent,
    GerenciaInformaticaComponent,
    FinanzasComponent
  ],
  imports: [CommonModule, FinanzasRoutingModule]
})
export class FinanzasModule {}
