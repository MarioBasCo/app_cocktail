import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlcoholPageRoutingModule } from './alcohol-routing.module';

import { AlcoholPage } from './alcohol.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlcoholPageRoutingModule
  ],
  declarations: [AlcoholPage]
})
export class AlcoholPageModule {}
