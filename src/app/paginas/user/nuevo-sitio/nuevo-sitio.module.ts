import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NuevoSitioPageRoutingModule } from './nuevo-sitio-routing.module';

import { NuevoSitioPage } from './nuevo-sitio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    NuevoSitioPageRoutingModule
  ],
  declarations: [NuevoSitioPage]
})
export class NuevoSitioPageModule {}
