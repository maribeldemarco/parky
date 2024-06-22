import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  
    {
      path: '',
      redirectTo: 'user',
      pathMatch: 'full'
    },
    
    {
    path: 'user',
    loadChildren: () => import('./user/user.module').then( m => m.UserPageModule)
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
    path: 'home-duenio',
    loadChildren: () => import('./home-duenio/tab10.module').then( m => m.Tab10PageModule)
  },  {
    path: 'tab11',
    loadChildren: () => import('./tab11/tab11.module').then( m => m.Tab11PageModule)
  },

  



];


  // Otras rutas fuera del sistema de tabs aquí

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
