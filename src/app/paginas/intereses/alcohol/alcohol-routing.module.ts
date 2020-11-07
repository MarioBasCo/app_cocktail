import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlcoholPage } from './alcohol.page';

const routes: Routes = [
  {
    path: '',
    component: AlcoholPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlcoholPageRoutingModule {}
