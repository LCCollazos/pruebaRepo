import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'personal',
    loadChildren: () => import('./pages/personal/personal.module').then(m => m.PersonalPageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'servicios',
    loadChildren: () => import('./pages/servicios/servicios.module').then( m => m.ServiciosPageModule)
  },
  {
    path: 'protocolo',
    loadChildren: () => import('./pages/protocolo/protocolo.module').then( m => m.ProtocoloPageModule)
  },
  {
    path: 'restore-data',
    loadChildren: () => import('./pages/restore-data/restore-data.module').then( m => m.RestoreDataPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
