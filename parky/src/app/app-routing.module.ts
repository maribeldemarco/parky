import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  // Otras rutas fuera del sistema de tabs aquí
  {
    path: '',
    loadChildren: () => import('./login/tab1.module').then(m => m.Tab1PageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/tab1.module').then(m => m.Tab1PageModule)
  },
  {
    path: 'crearcuenta',
    loadChildren: () => import('./register/tab2.module').then(m => m.Tab2PageModule),
  },
  {
    path: 'recuperarclave',
    loadChildren: () => import('./forgotPassword/tab3.module').then(m => m.Tab3PageModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
