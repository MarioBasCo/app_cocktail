import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CoctelesRecomendadosPageRoutingModule } from './cocteles-recomendados-routing.module';

import { CoctelesRecomendadosPage } from './cocteles-recomendados.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CoctelesRecomendadosPageRoutingModule
  ],
  declarations: [CoctelesRecomendadosPage]
})
export class CoctelesRecomendadosPageModule {}
