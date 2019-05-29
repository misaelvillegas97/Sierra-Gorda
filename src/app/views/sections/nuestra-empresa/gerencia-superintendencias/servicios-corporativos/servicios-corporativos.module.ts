import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiciosCorporativosRoutingModule } from './servicios-corporativos-routing.module';
import { ServiciosCorporativosComponent } from './servicios-corporativos.component';
import { GerenciaSupplyChainComponent } from './gerencia-supply-chain/gerencia-supply-chain.component';
import { GerenciaAbastecimientoEstrategicoComponent } from './gerencia-abastecimiento-estrategico/gerencia-abastecimiento-estrategico.component';

@NgModule({
  declarations: [ServiciosCorporativosComponent, GerenciaSupplyChainComponent, GerenciaAbastecimientoEstrategicoComponent],
  imports: [
    CommonModule,
    ServiciosCorporativosRoutingModule
  ]
})
export class ServiciosCorporativosModule { }
