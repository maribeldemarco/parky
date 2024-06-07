import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Tab9PageRoutingModule } from './tab9-routing.module';

import { Tab9Page } from './tab9.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Tab9PageRoutingModule
  ],
  declarations: [Tab9Page]
})
export class Tab9PageModule {}
