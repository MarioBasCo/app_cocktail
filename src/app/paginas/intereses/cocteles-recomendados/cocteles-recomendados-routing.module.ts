import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoctelesRecomendadosPage } from './cocteles-recomendados.page';

const routes: Routes = [
  {
    path: '',
    component: CoctelesRecomendadosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoctelesRecomendadosPageRoutingModule {}
