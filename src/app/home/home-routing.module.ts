import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { PersonalPage } from '../pages/personal/personal.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children :
    [
      {
        path: 'personal',
        loadChildren: () => import('../pages/personal/personal.module').then(m => m.PersonalPageModule)
      }
    ]
  },
  {
    path: 'home',
    component: HomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
