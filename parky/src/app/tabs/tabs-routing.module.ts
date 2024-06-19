import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'tab4',
      },
      {
        path: 'home',
        loadChildren: () => import('../home/tab4.module').then(m => m.Tab4PageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../profile/tab5.module').then(m => m.Tab5PageModule)
      },
      {
        path: 'tab6',
        loadChildren: () => import('../registro1estacionamiento/tab6.module').then( m => m.Tab6PageModule)
      },
      {
        path: 'tab7',
        loadChildren: () => import('../registro2estacionamiento/tab7.module').then( m => m.Tab7PageModule)
      },
      {
        path: 'tab8',
        loadChildren: () => import('../profile-estacionamiento/tab8.module').then( m => m.Tab8PageModule)
      },
      {
        path: 'tab9',
        loadChildren: () => import('../busco-estacionamiento/tab9.module').then( m => m.Tab9PageModule)
      },
      {
        path: 'tab10',
        loadChildren: () => import('../home-duenio/tab10.module').then( m => m.Tab10PageModule)
      },
      // Agregar otras rutas según sea necesario
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tabs',
    pathMatch: 'full'
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
