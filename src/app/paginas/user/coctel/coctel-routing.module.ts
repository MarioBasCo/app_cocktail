import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoctelPage } from './coctel.page';

const routes: Routes = [
  {
    path: '',
    component: CoctelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoctelPageRoutingModule {}
