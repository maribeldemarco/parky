import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'tab8',
        loadChildren: () => import('../profile-estacionamiento/tab8.module').then( m => m.Tab8PageModule)
      },
      {
        path: 'tab10',
        loadChildren: () => import('../home-duenio/tab10.module').then( m => m.Tab10PageModule)
      },
      {
        path: 'tab11',
        loadChildren: () => import('../tab11/tab11.module').then( m => m.Tab11PageModule)
      },
      // Agregar otras rutas según sea necesario
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab10',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
