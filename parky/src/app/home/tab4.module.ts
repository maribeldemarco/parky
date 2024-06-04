import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Tab4PageRoutingModule } from './tab4-routing.module';
import { HomePage } from './tab4.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage
  }
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Tab4PageRoutingModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    HomePage
  ]

})
export class Tab4PageModule {}
