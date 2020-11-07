import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'acercade',
    loadChildren: () => import('./paginas/acercade/acercade.module').then( m => m.AcercadePageModule)
  },
  {
    path: 'alcohol',
    loadChildren: () => import('./paginas/intereses/alcohol/alcohol.module').then( m => m.AlcoholPageModule)
  },
  {
    path: 'cercadeti',
    loadChildren: () => import('./paginas/intereses/cercadeti/cercadeti.module').then( m => m.CercadetiPageModule)
  },
  {
    path: 'cocteles-recomendados',
    loadChildren: () => import('./paginas/intereses/cocteles-recomendados/cocteles-recomendados.module').then( m => m.CoctelesRecomendadosPageModule)
  },
  {
    path: 'sitios',
    loadChildren: () => import('./paginas/intereses/sitios/sitios.module').then( m => m.SitiosPageModule)
  },
  {
    path: 'sitios-modal',
    loadChildren: () => import('./paginas/intereses/sitios-modal/sitios-modal.module').then( m => m.SitiosModalPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./paginas/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./paginas/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./paginas/user/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'nuevo-sitio',
    loadChildren: () => import('./paginas/user/nuevo-sitio/nuevo-sitio.module').then( m => m.NuevoSitioPageModule)
  },
  {
    path: 'coctel',
    loadChildren: () => import('./paginas/user/coctel/coctel.module').then( m => m.CoctelPageModule)
  },
  {
    path: 'comentarios',
    loadChildren: () => import('./paginas/comentarios/comentarios.module').then( m => m.ComentariosPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
