import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Ng2Rut } from 'ng2-rut';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// External Imports
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import * as $ from 'jquery';

// Angular Material Imports
import { CdkStepperModule } from '@angular/cdk/stepper';
import { MatStepperModule, MatIconModule, MatButtonModule, MatFormFieldModule, MatSelectModule } from '@angular/material';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './views/index/navbar/navbar.component';
import { IndexComponent } from './views/index/index.component';
import { SliderComponent } from './views/index/slider/slider.component';
import { SliderPresupuestoComponent } from './views/index/slider-presupuesto/slider-presupuesto.component';
import { PollComponent } from './views/index/poll/poll.component';
import { SinglepollComponent } from './views/index/poll/singlepoll/singlepoll.component';
import { CardPollComponent } from './views/index/poll/card-poll/card-poll.component';
import { ContactComponent } from './views/index/contact/contact.component';
import { SliderCumpleaniosComponent } from './views/index/slider-cumpleanios/slider-cumpleanios.component';
import { ActivitiesComponent } from './views/index/activities/activities.component';
import { SlayerComponent } from './views/test/slayer/slayer.component';
import { MessagesComponent } from './views/chat/messages/messages.component';
import { CardComponent } from './views/chat/messages/card/card.component';
import { SinglechatComponent } from './views/chat/messages/singlechat/singlechat.component';
import { LoginModalComponent } from './modals/login-modal/login-modal.component';
import { PollModalComponent } from './modals/poll-modal/poll-modal.component';
import { LinksComponent } from './views/sections/links/links.component';
import { NavbarExtComponent } from './views/global/navbar-ext/navbar-ext.component';
import { RefreshComponent } from './views/global/refresh/refresh.component';
import { PersonasComponent } from './views/sections/personas/personas.component';
import { QuienessomosComponent } from './views/sections/nuestra-empresa/quienessomos/quienessomos.component';
import { PropiedadComponent } from './views/sections/nuestra-empresa/propiedad/propiedad.component';
import { UbicacionComponent } from './views/sections/nuestra-empresa/ubicacion/ubicacion.component';
import { HistoriaComponent } from './views/sections/nuestra-empresa/historia/historia.component';
import { CulturaComponent } from './views/sections/personas/cultura/cultura.component';
import { NuestraEmpresaComponent } from './views/sections/nuestra-empresa/nuestra-empresa.component';
import { PortalComponent } from './views/sections/personas/portal/portal.component';
import { CategoriasComponent } from './views/sections/personas/portal/categorias/categorias.component';
import { ListaVideosComponent } from './views/sections/personas/portal/lista-videos/lista-videos.component';
import { PersasgComponent } from './views/sections/personas/persasg/persasg.component';
import { PersaModalComponent } from './modals/persa-modal/persa-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    IndexComponent,
    SliderComponent,
    SlayerComponent,
    SliderPresupuestoComponent,
    MessagesComponent,
    CardComponent,
    SinglechatComponent,
    PollComponent,
    SinglepollComponent,
    CardPollComponent,
    ContactComponent,
    SliderCumpleaniosComponent,
    ActivitiesComponent,
    LoginModalComponent,
    PollModalComponent,
    PersonasComponent,
    QuienessomosComponent,
    LinksComponent,
    NavbarExtComponent,
    RefreshComponent,
    PropiedadComponent,
    UbicacionComponent,
    HistoriaComponent,
    CulturaComponent,
    NuestraEmpresaComponent,
    PortalComponent,
    CategoriasComponent,
    ListaVideosComponent,
    PersasgComponent,
    PersaModalComponent
  ],
  imports: [
    BrowserModule,
    Ng2Rut,
    HttpClientModule,
    AppRoutingModule,
    PickerModule,
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    // Material Module Imports
    CdkStepperModule,
    MatStepperModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatChipsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSnackBarModule

  ],
  providers: [],
  entryComponents: [LoginModalComponent, PollModalComponent, PersaModalComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
