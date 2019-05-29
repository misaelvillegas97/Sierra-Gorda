import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServiciosCorporativosComponent } from './servicios-corporativos.component';
import { GerenciaSupplyChainComponent } from './gerencia-supply-chain/gerencia-supply-chain.component';
import { GerenciaAbastecimientoEstrategicoComponent } from './gerencia-abastecimiento-estrategico/gerencia-abastecimiento-estrategico.component';

const routes: Routes = [
  {
    path: '',
    component: ServiciosCorporativosComponent
  },
  {
    path: 'gerencia-supply-chain',
    component: GerenciaSupplyChainComponent
  },
  {
      path: 'gerencia-abastecimiento-estrategico',
      component: GerenciaAbastecimientoEstrategicoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiciosCorporativosRoutingModule { }
