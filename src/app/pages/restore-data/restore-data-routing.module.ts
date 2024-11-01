import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RestoreDataPage } from './restore-data.page';

const routes: Routes = [
  {
    path: '',
    component: RestoreDataPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RestoreDataPageRoutingModule {}
