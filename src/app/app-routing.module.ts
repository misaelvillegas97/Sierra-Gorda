import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './views/index/index.component';
import { SlayerComponent } from './views/test/slayer/slayer.component';
import { QuienessomosComponent } from './views/sections/nuestra-empresa/quienessomos/quienessomos.component';
import { RefreshComponent } from './views/global/refresh/refresh.component';
import { PropiedadComponent } from './views/sections/nuestra-empresa/propiedad/propiedad.component';
import { UbicacionComponent } from './views/sections/nuestra-empresa/ubicacion/ubicacion.component';
import { HistoriaComponent } from './views/sections/nuestra-empresa/historia/historia.component';
import { CulturaComponent } from './views/sections/personas/cultura/cultura.component';
import { PersonasComponent } from './views/sections/personas/personas.component';
import { NuestraEmpresaComponent } from './views/sections/nuestra-empresa/nuestra-empresa.component';
import { PortalComponent } from './views/sections/personas/portal/portal.component';
import { CategoriasComponent } from './views/sections/personas/portal/categorias/categorias.component';
import { ListaVideosComponent } from './views/sections/personas/portal/lista-videos/lista-videos.component';
import { PersasgComponent } from './views/sections/personas/persasg/persasg.component';
import { ProductListComponent } from './views/sections/personas/persasg/my-products/product-list/product-list.component';
import { ProductEditComponent } from './views/sections/personas/persasg/my-products/product-edit/product-edit.component';
import { AllProductsComponent } from './views/sections/personas/persasg/all-products/all-products.component';
import { MyProductsComponent } from './views/sections/personas/persasg/my-products/my-products.component';
import { GerenciaSuperintendenciasComponent } from './views/sections/nuestra-empresa/gerencia-superintendencias/gerencia-superintendencias.component';
import { NoticiasComponent } from './views/noticias/noticias.component';
import { TodasComponent } from './views/noticias/todas/todas.component';
import { DestacadasComponent } from './views/noticias/destacadas/destacadas.component';
import { ReporteroMineroComponent } from './views/noticias/reportero-minero/reportero-minero.component';
import { VerNoticiaComponent } from './views/noticias/ver-noticia/ver-noticia.component';
import { BeneficiosComponent } from './views/beneficios/beneficios.component';
import { MenuBeneficiosComponent } from './views/beneficios/menu-beneficios/menu-beneficios.component';
import { SaludComponent } from './views/beneficios/salud/salud.component';
import { ConveniosComponent } from './views/beneficios/convenios/convenios.component';
import { FormulariosComponent } from './views/beneficios/formularios/formularios.component';
import { SaludDetalleComponent } from './views/beneficios/salud/salud-detalle/salud-detalle.component';
import { ComunidadesComponent } from './views/sections/personas/comunidades/comunidades.component';
import { GaleriaComponent } from './views/galeria/galeria.component';
import { ConvenioDetalleComponent } from './views/beneficios/convenios/convenio-detalle/convenio-detalle.component';
import { GaleriaMesesComponent } from './views/galeria/galeria-meses/galeria-meses.component';
import { GaleriaAlbumesComponent } from './views/galeria/galeria-albumes/galeria-albumes.component';
import { GaleriaAlbumDetalleComponent } from './views/galeria/galeria-album-detalle/galeria-album-detalle.component';
import { SeguridadComponent } from './views/seguridad/seguridad.component';
import { TereconozcoComponent } from './views/tereconozco/tereconozco.component';
import { ObservadoresConductasComponent } from './views/seguridad/observadores-conductas/observadores-conductas.component';
import { MenuComponent } from './views/seguridad/menu/menu.component';
import { ComiteparitarioComponent } from './views/seguridad/comiteparitario/comiteparitario.component';
import { IncidentesComponent } from './views/seguridad/incidentes/incidentes.component';
import { CumpleaniosComponent } from './views/sections/personas/cumpleanios/cumpleanios.component';
import { CampaniaComponent } from './views/seguridad/campania/campania.component';
import { ChatViewComponent } from './views/chat-view/chat-view.component';
import { BrandingComponent } from './views/branding/branding.component';
import { EquipoEjecutivoComponent } from './views/sections/nuestra-empresa/equipo-ejecutivo/equipo-ejecutivo.component';
import { DesafioAusteridadComponent } from './views/desafio-austeridad/desafio-austeridad.component';
import { InfoComponent } from './views/desafio-austeridad/info/info.component';
import { RevistaComponent } from './views/sections/personas/revista/revista.component';
import { FormularioDAComponent } from './views/desafio-austeridad/formulario-d-a/formulario-d-a.component';
import { TodosReconocidosComponent } from './views/tereconozco/todos-reconocidos/todos-reconocidos.component';
import { ReconocerComponent } from './views/tereconozco/reconocer/reconocer.component';
import { ReconocidosComponent } from './views/tereconozco/reconocidos/reconocidos.component';
import { ComunicacionesComponent } from './views/menus/comunicaciones/comunicaciones.component';
import { FormulariosSgComponent } from './views/menus/formularios-sg/formularios-sg.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent
  },
  {
    path: 'test',
    component: SlayerComponent
  },
  {
    path: 'chat',
    component: ChatViewComponent
  },
  {
    path: 'refresh',
    component: RefreshComponent
  },
  {
    path: 'nuestra-empresa',
    component: NuestraEmpresaComponent,
    children: [
      {
        path: '',
        redirectTo: '/nuestra-empresa/quienes-somos',
        pathMatch: 'full'
      },
      {
        path: 'quienes-somos',
        component: QuienessomosComponent
      },
      {
        path: 'propiedad',
        component: PropiedadComponent
      },
      {
        path: 'gerencia',
        component: GerenciaSuperintendenciasComponent,
        children: [
          {
            path: '',
            redirectTo: 'operaciones',
            pathMatch: 'full'
          },
          {
            path: 'operaciones',
            loadChildren:
              './views/sections/nuestra-empresa/gerencia-superintendencias/operaciones/operaciones.module#OperacionesModule'
          },
          {
            path: 'finanzas',
            loadChildren:
              './views/sections/nuestra-empresa/gerencia-superintendencias/finanzas/finanzas.module#FinanzasModule'
          },
          {
            path: 'rrhh',
            loadChildren:
              './views/sections/nuestra-empresa/gerencia-superintendencias/rrhh/rrhh.module#RrhhModule'
          },
          {
            path: 'serv-corp',
            loadChildren:
              './views/sections/nuestra-empresa/gerencia-superintendencias/servicios-corporativos/servicios-corporativos.module#ServiciosCorporativosModule'
          },
          {
            path: 'sustentabilidad',
            loadChildren:
              './views/sections/nuestra-empresa/gerencia-superintendencias/sustentabilidad/sustentabilidad.module#SustentabilidadModule'
          },
          {
            path: 'gerencia-general',
            loadChildren:
              './views/sections/nuestra-empresa/gerencia-superintendencias/gerencia-general/gerencia-general.module#GerenciaGeneralModule'
          }
        ]
      },
      {
        path: 'ubicacion',
        component: UbicacionComponent
      },
      {
        path: 'historia',
        component: HistoriaComponent
      },
      {
        path: 'equipo-ejecutivo',
        component: EquipoEjecutivoComponent
      }
    ]
  },
  {
    path: 'personas',
    component: PersonasComponent,
    children: [
      {
        path: '',
        redirectTo: '/personas/cultura',
        pathMatch: 'full'
      },
      {
        path: 'cultura',
        component: CulturaComponent
      },
      {
        path: 'cumpleanios',
        component: CumpleaniosComponent
      },
      {
        path: 'revista',
        component: RevistaComponent
      },
      {
        path: 'portal',
        component: PortalComponent,
        children: [
          {
            path: '',
            component: CategoriasComponent,
            data: {
              animation: 'isLeft'
            }
          },
          {
            path: ':idCategoria',
            component: ListaVideosComponent,
            data: {
              animation: 'isRight'
            }
          }
        ]
      },
      {
        path: 'persasg',
        component: PersasgComponent,
        children: [
          {
            path: 'lista-productos',
            component: AllProductsComponent
          },
          {
            path: 'mis-productos',
            component: MyProductsComponent,
            children: [
              {
                path: '',
                component: ProductListComponent
              },
              {
                path: 'edit/:idProducto',
                component: ProductEditComponent
              },
              {
                path: '**',
                pathMatch: 'full',
                redirectTo: ''
              }
            ]
          },
          {
            path: '**',
            pathMatch: 'full',
            redirectTo: 'lista-productos'
          }
        ]
      },
      {
        path: 'comunidades',
        component: ComunidadesComponent
      }
    ]
  },
  {
    path: 'noticias',
    component: NoticiasComponent,
    children: [
      {
        path: '',
        redirectTo: 'todas',
        pathMatch: 'full'
      },
      {
        path: 'todas',
        component: TodasComponent
      },
      {
        path: 'destacadas',
        component: DestacadasComponent
      },
      {
        path: 'reportero-minero',
        component: ReporteroMineroComponent
      }
    ]
  },
  {
    path: 'noticia',
    redirectTo: 'noticias',
    pathMatch: 'full'
  },
  {
    path: 'noticia/:id',
    component: VerNoticiaComponent
  },
  {
    path: 'beneficios',
    component: BeneficiosComponent,
    children: [
      {
        path: '',
        component: MenuBeneficiosComponent
      },
      {
        path: 'salud',
        children: [
          {
            path: '',
            component: SaludComponent
          },
          {
            path: ':nombre',
            component: SaludDetalleComponent
          }
        ]
      },
      {
        path: 'convenios',
        children: [
          {
            path: '',
            component: ConveniosComponent
          },
          {
            path: ':nombre',
            component: ConvenioDetalleComponent
          }
        ]
      },
      {
        path: 'formularios-laborales',
        component: FormulariosComponent
      },
      {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'comunicaciones',
    component: ComunicacionesComponent
  },
  {
    path: 'formularios-sg',
    component: FormulariosSgComponent
  },
  {
    path: 'galeria',
    component: GaleriaComponent,
    children: [
      {
        path: '',
        component: GaleriaMesesComponent
      },
      {
        path: ':year/:month',
        component: GaleriaAlbumesComponent
      },
      {
        path: ':year/:month/:idGaleria',
        component: GaleriaAlbumDetalleComponent
      }
    ]
  },
  {
    path: 'seguridad',
    component: SeguridadComponent,
    children: [
      {
        path: '',
        component: MenuComponent
      },
      {
        path: 'observadores-conducta',
        component: ObservadoresConductasComponent
      },
      {
        path: 'comite-paritario',
        component: ComiteparitarioComponent
      },
      {
        path: 'incidentes-y-lecciones',
        component: IncidentesComponent
      },
      {
        path: 'campanias',
        component: CampaniaComponent
      },
      {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'te-reconozco',
    component: TereconozcoComponent,
    children: [
      {
        path: '',
        component: TodosReconocidosComponent
      },
      {
        path: 'reconocer',
        component: ReconocerComponent
      },
      {
        path: 'mis-reconocimientos',
        component: ReconocidosComponent
      }
    ]
  },
  {
    path: 'branding-formatos',
    component: BrandingComponent
  },
  {
    path: 'desafio-austeridad',
    component: DesafioAusteridadComponent,
    children: [
      {
        path: '',
        component: InfoComponent
      },
      {
        path: 'formulario',
        component: FormularioDAComponent
      }
    ]
  }
  // {
  //   path: 'chats',
  //   component: MessagesComponent
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
