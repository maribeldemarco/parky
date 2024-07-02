import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'user',
    pathMatch: 'full',
  },

  {
    path: 'user',
    loadChildren: () =>
      import('./user/user.module').then((m) => m.UserPageModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/tab1.module').then((m) => m.Tab1PageModule),
  },
  {
    path: 'tabs',
    loadChildren: () =>
      import('./tabs/tabs.module').then((m) => m.TabsPageModule),
  },
  {
    path: 'crearcuenta',
    loadChildren: () =>
      import('./register/tab2.module').then((m) => m.Tab2PageModule),
  },
  {
    path: 'recuperarclave',
    loadChildren: () =>
      import('./forgotPassword/tab3.module').then((m) => m.Tab3PageModule),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./home/tab4.module').then((m) => m.Tab4PageModule),
  },
  {
    path: 'registroPropietario',
    loadChildren: () =>
      import('./registro1estacionamiento/tab6.module').then((m) => m.Tab6PageModule),
  },
  {
    path: 'registroEstacionamientoAutos',
    loadChildren: () =>
      import('./registro2estacionamiento/tab7.module').then((m) => m.Tab7PageModule),
  }
];

// Otras rutas fuera del sistema de tabs aquí

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
