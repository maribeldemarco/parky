import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./login/tab1.module').then(m => m.Tab1PageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/tab1.module').then(m => m.Tab1PageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/tab1.module').then(m => m.Tab1PageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'crearcuenta',
    loadChildren: () => import('./register/tab2.module').then(m => m.Tab2PageModule),
  },
  {
    path: 'recuperarclave',
    loadChildren: () => import('./forgotPassword/tab3.module').then(m => m.Tab3PageModule),
  },
  {
    path: 'home',
    loadChildren: () => import('./home/tab4.module').then( m => m.Tab4PageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/tab5.module').then( m => m.Tab5PageModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then( m => m.UserPageModule)
  },
  {
    path: 'home-duenio',
    loadChildren: () => import('./home-duenio/tab10.module').then( m => m.Tab10PageModule)
  },




];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
