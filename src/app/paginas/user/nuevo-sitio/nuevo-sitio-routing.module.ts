import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NuevoSitioPage } from './nuevo-sitio.page';

const routes: Routes = [
  {
    path: '',
    component: NuevoSitioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NuevoSitioPageRoutingModule {}
