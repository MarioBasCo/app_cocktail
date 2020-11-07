import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SitiosModalPageRoutingModule } from './sitios-modal-routing.module';

import { SitiosModalPage } from './sitios-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SitiosModalPageRoutingModule
  ],
  declarations: [SitiosModalPage]
})
export class SitiosModalPageModule {}
