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
import { ProductListComponent } from './views/sections/personas/persasg/my-products/product-list/product-list.component';
import { ProductEditComponent } from './views/sections/personas/persasg/my-products/product-edit/product-edit.component';
import { AllProductsComponent } from './views/sections/personas/persasg/all-products/all-products.component';
import { MyProductsComponent } from './views/sections/personas/persasg/my-products/my-products.component';
// import { OperacionesComponent } from './views/sections/nuestra-empresa/gerencia-superintendencias/operaciones/operaciones.component';
import { GerenciaSuperintendenciasComponent } from './views/sections/nuestra-empresa/gerencia-superintendencias/gerencia-superintendencias.component';

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
            loadChildren: './views/sections/nuestra-empresa/gerencia-superintendencias/operaciones/operaciones.module#OperacionesModule',
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
