import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LOCALE_ID, NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeCL from '@angular/common/locales/es-CL';
import { HttpClientModule } from '@angular/common/http';
import { Ng2Rut } from 'ng2-rut';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

registerLocaleData(localeCL, 'es-CL');

// External Imports
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import * as $ from 'jquery';
import * as Coppie from 'croppie';

// Angular Material Imports
import { CdkStepperModule } from '@angular/cdk/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';

// Modules Router
import { OperacionesModule } from './views/sections/nuestra-empresa/gerencia-superintendencias/operaciones/operaciones.module';

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
import { MessagesComponent } from './views/index/chat/messages/messages.component';
import { CardComponent } from './views/index/chat/messages/card/card.component';
import { SinglechatComponent } from './views/index/chat/messages/singlechat/singlechat.component';
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
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { EditInfoModalComponent } from './modals/edit-info-modal/edit-info-modal.component';
import { FooterSComponent } from './views/sections/footer-s/footer-s.component';
import { ProductListComponent } from './views/sections/personas/persasg/my-products/product-list/product-list.component';
import { ProductEditComponent } from './views/sections/personas/persasg/my-products/product-edit/product-edit.component';
import { AllProductsComponent } from './views/sections/personas/persasg/all-products/all-products.component';
import { MyProductsComponent } from './views/sections/personas/persasg/my-products/my-products.component';
import { GerenciaSuperintendenciasComponent } from './views/sections/nuestra-empresa/gerencia-superintendencias/gerencia-superintendencias.component';
import { NoticiasComponent } from './views/noticias/noticias.component';
import { DestacadasComponent } from './views/noticias/destacadas/destacadas.component';
import { TodasComponent } from './views/noticias/todas/todas.component';
import { ReporteroMineroComponent } from './views/noticias/reportero-minero/reportero-minero.component';
import { VerNoticiaComponent } from './views/noticias/ver-noticia/ver-noticia.component';
import { SafeStylePipe } from './pipes/safe-style.pipe';
import { BeneficiosComponent } from './views/beneficios/beneficios.component';
import { SaludComponent } from './views/beneficios/salud/salud.component';
import { ConveniosComponent } from './views/beneficios/convenios/convenios.component';
import { FormulariosComponent } from './views/beneficios/formularios/formularios.component';
import { MenuBeneficiosComponent } from './views/beneficios/menu-beneficios/menu-beneficios.component';
import { SaludDetalleComponent } from './views/beneficios/salud/salud-detalle/salud-detalle.component';
import { ConvenioDetalleComponent } from './views/beneficios/convenios/convenio-detalle/convenio-detalle.component';
import { ComunidadesComponent } from './views/sections/personas/comunidades/comunidades.component';
import { SafeTextPipe } from './pipes/safe-text.pipe';
import { GaleriaComponent } from './views/galeria/galeria.component';
import { GaleriaMesesComponent } from './views/galeria/galeria-meses/galeria-meses.component';
import { GaleriaAlbumesComponent } from './views/galeria/galeria-albumes/galeria-albumes.component';
import { GaleriaAlbumDetalleComponent } from './views/galeria/galeria-album-detalle/galeria-album-detalle.component';
import { SeguridadComponent } from './views/seguridad/seguridad.component';
import { TereconozcoComponent } from './views/tereconozco/tereconozco.component';
import { ObservadoresConductasComponent } from './views/seguridad/observadores-conductas/observadores-conductas.component';
import { ComiteparitarioComponent } from './views/seguridad/comiteparitario/comiteparitario.component';
import { MenuComponent } from './views/seguridad/menu/menu.component';
import { IncidentesComponent } from './views/seguridad/incidentes/incidentes.component';
import { IncidenteDetalleModalComponent } from './modals/incidente-detalle-modal/incidente-detalle-modal.component';
import { CumpleaniosComponent } from './views/sections/personas/cumpleanios/cumpleanios.component';
import { CampaniaComponent } from './views/seguridad/campania/campania.component';
import { ChatViewComponent } from './views/chat-view/chat-view.component';
import { ChatListComponent } from './views/chat-view/chat-list/chat-list.component';
import { BrandingComponent } from './views/branding/branding.component';
import { EquipoEjecutivoComponent } from './views/sections/nuestra-empresa/equipo-ejecutivo/equipo-ejecutivo.component';
import { DesafioAusteridadComponent } from './views/desafio-austeridad/desafio-austeridad.component';
import { InfoComponent } from './views/desafio-austeridad/info/info.component';
import { RevistaComponent } from './views/sections/personas/revista/revista.component';
import { FormularioDAComponent } from './views/desafio-austeridad/formulario-d-a/formulario-d-a.component';
import { TodosReconocidosComponent } from './views/tereconozco/todos-reconocidos/todos-reconocidos.component';
import { ReconocimientoModalComponent } from './modals/reconocimiento-modal/reconocimiento-modal.component';
import { ReconocerComponent } from './views/tereconozco/reconocer/reconocer.component';
import { ReconocidosComponent } from './views/tereconozco/reconocidos/reconocidos.component';
import { ComunicacionesComponent } from './views/menus/comunicaciones/comunicaciones.component';
import { FormulariosSgComponent } from './views/menus/formularios-sg/formularios-sg.component';
import { VideoComponent } from './modals/video/video.component';


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
    PersaModalComponent,
    SafeHtmlPipe,
    EditInfoModalComponent,
    FooterSComponent,
    ProductListComponent,
    ProductEditComponent,
    AllProductsComponent,
    MyProductsComponent,
    GerenciaSuperintendenciasComponent,
    NoticiasComponent,
    DestacadasComponent,
    TodasComponent,
    ReporteroMineroComponent,
    VerNoticiaComponent,
    SafeStylePipe,
    BeneficiosComponent,
    SaludComponent,
    ConveniosComponent,
    FormulariosComponent,
    MenuBeneficiosComponent,
    SaludDetalleComponent,
    ConvenioDetalleComponent,
    ComunidadesComponent,
    SafeTextPipe,
    GaleriaComponent,
    GaleriaMesesComponent,
    GaleriaAlbumesComponent,
    GaleriaAlbumDetalleComponent,
    SeguridadComponent,
    TereconozcoComponent,
    ObservadoresConductasComponent,
    ComiteparitarioComponent,
    MenuComponent,
    IncidentesComponent,
    IncidenteDetalleModalComponent,
    CumpleaniosComponent,
    CampaniaComponent,
    ChatViewComponent,
    ChatListComponent,
    BrandingComponent,
    EquipoEjecutivoComponent,
    DesafioAusteridadComponent,
    InfoComponent,
    RevistaComponent,
    FormularioDAComponent,
    TodosReconocidosComponent,
    ReconocimientoModalComponent,
    ReconocerComponent,
    ReconocidosComponent,
    ComunicacionesComponent,
    FormulariosSgComponent,
    VideoComponent
  ],
  imports: [
    BrowserModule,
    Ng2Rut,
    HttpClientModule,
    AppRoutingModule,
    // OperacionesModule,
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
  providers: [{ provide: LOCALE_ID, useValue: 'es-CL' }],
  entryComponents: [VideoComponent, LoginModalComponent, PollModalComponent, PersaModalComponent, EditInfoModalComponent, IncidenteDetalleModalComponent, ReconocimientoModalComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
