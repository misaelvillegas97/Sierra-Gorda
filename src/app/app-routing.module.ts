import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './views/index/index.component';
import { SlayerComponent } from './views/test/slayer/slayer.component';
import { MessagesComponent } from './views/chat/messages/messages.component';
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
    path: 'chats',
    component: MessagesComponent
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
        path: 'ubicacion',
        component: UbicacionComponent
      },
      {
        path: 'historia',
        component: HistoriaComponent
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
        component: PersasgComponent
      }
    ]
  },
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
