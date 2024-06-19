import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Tab10Page } from './tab10.page';

const routes: Routes = [
  {
    path: '',
    component: Tab10Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Tab10PageRoutingModule {}
