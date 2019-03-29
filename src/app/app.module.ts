import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// MdBoostrap Imports
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './views/index/navbar/navbar.component';
import { IndexComponent } from './views/index/index.component';
import { SliderComponent } from './views/index/slider/slider.component';
import { SlayerComponent } from './views/test/slayer/slayer.component';
import { SliderPresupuestoComponent } from './views/index/slider-presupuesto/slider-presupuesto.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    IndexComponent,
    SliderComponent,
    SlayerComponent,
    SliderPresupuestoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
