import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { Tab8PageRoutingModule } from './tab8-routing.module';
import { Tab8Page } from './tab8.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Tab8PageRoutingModule,
    ReactiveFormsModule // Importa ReactiveFormsModule si estás usando formControlName en tu template
  ],
  declarations: [Tab8Page]
})
export class Tab8PageModule {}

