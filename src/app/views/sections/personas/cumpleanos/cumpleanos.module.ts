import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CumpleanosRoutingModule } from './cumpleanos-routing.module';
import { CumpleanosComponent } from './cumpleanos.component';

@NgModule({
  declarations: [CumpleanosComponent],
  imports: [
    CommonModule,
    CumpleanosRoutingModule
  ]
})
export class CumpleanosModule { }
