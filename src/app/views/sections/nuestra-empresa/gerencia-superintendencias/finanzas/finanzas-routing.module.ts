import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FinanzasComponent } from './finanzas.component';
import { GerenciaImpuestosComponent } from './gerencia-impuestos/gerencia-impuestos.component';
import { GerenciaMejorNegocioComponent } from './gerencia-mejor-negocio/gerencia-mejor-negocio.component';
import { GerenciaContTesoComponent } from './gerencia-cont-teso/gerencia-cont-teso.component';
import { GerenciaInformaticaComponent } from './gerencia-informatica/gerencia-informatica.component';

const routes: Routes = [
  {
    path: '',
    component: FinanzasComponent
  },
  {
    path: 'gerencia-impuestos',
    component: GerenciaImpuestosComponent
  },
  {
    path: 'gerencia-mej-negocio',
    component: GerenciaMejorNegocioComponent
  },
  {
    path: 'gerencia-contabilidad-tesoreria',
    component: GerenciaContTesoComponent
  },
  {
    path: 'gerencia-informatica',
    component: GerenciaInformaticaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinanzasRoutingModule { }
