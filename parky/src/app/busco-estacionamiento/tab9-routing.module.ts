import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Tab9Page } from './tab9.page';

const routes: Routes = [
  {
    path: '',
    component: Tab9Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Tab9PageRoutingModule {}
