import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './views/index/index.component';
import { SlayerComponent } from './views/test/slayer/slayer.component';
import { MessagesComponent } from './views/chat/messages/messages.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
