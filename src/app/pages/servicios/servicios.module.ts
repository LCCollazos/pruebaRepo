import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServiciosPageRoutingModule } from './servicios-routing.module';

import { ServiciosPage } from './servicios.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServiciosPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ServiciosPage]
})
export class ServiciosPageModule {}
