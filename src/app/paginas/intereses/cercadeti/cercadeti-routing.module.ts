import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CercadetiPage } from './cercadeti.page';

const routes: Routes = [
  {
    path: '',
    component: CercadetiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CercadetiPageRoutingModule {}
