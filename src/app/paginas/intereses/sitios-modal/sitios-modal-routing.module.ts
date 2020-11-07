import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SitiosModalPage } from './sitios-modal.page';

const routes: Routes = [
  {
    path: '',
    component: SitiosModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SitiosModalPageRoutingModule {}
