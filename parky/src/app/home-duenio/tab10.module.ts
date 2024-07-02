import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Tab10PageRoutingModule } from './tab10-routing.module';

import { Tab10Page } from './tab10.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    Tab10PageRoutingModule
  ],
  declarations: [Tab10Page]
})
export class Tab10PageModule {}
