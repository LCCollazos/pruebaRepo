import { HomePageModule } from './../../home/home.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PersonalPage } from './personal.page';
import { HomePage } from 'src/app/home/home.page';

const routes: Routes = [
  {
    path: '',
    component: PersonalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonalPageRoutingModule {}
