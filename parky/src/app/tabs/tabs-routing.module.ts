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
        path: 'tab4',
        loadChildren: () => import('../home/tab4.module').then(m => m.Tab4PageModule)
      },
      {
        path: 'profile',
  loadChildren: () => import('../profile/profile.module').then(m => m.ProfilePageModule),

      }
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
