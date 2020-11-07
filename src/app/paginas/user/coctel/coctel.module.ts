import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CoctelPageRoutingModule } from './coctel-routing.module';

import { CoctelPage } from './coctel.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    CoctelPageRoutingModule
  ],
  declarations: [CoctelPage]
})
export class CoctelPageModule {}
