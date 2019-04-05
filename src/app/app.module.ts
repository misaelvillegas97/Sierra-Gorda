import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// External Imports
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { PickerModule } from '@ctrl/ngx-emoji-mart';

// Angular Material Imports
import { CdkStepperModule } from '@angular/cdk/stepper';
import { MatStepperModule, MatIconModule, MatButtonModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './views/index/navbar/navbar.component';
import { IndexComponent } from './views/index/index.component';
import { SliderComponent } from './views/index/slider/slider.component';
import { SlayerComponent } from './views/test/slayer/slayer.component';
import { SliderPresupuestoComponent } from './views/index/slider-presupuesto/slider-presupuesto.component';
import { MessagesComponent } from './views/chat/messages/messages.component';
import { CardComponent } from './views/chat/messages/card/card.component';
import { SinglechatComponent } from './views/chat/messages/singlechat/singlechat.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PollComponent } from './views/index/poll/poll.component';
import { SinglepollComponent } from './views/index/poll/singlepoll/singlepoll.component';
import { CardPollComponent } from './views/index/poll/card-poll/card-poll.component';
import { ContactComponent } from './views/index/contact/contact.component';

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
    ContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PickerModule,
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule,
    // Material Module Imports
    CdkStepperModule,
    MatStepperModule,
    MatIconModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
