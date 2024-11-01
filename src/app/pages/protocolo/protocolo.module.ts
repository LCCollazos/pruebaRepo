import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProtocoloPageRoutingModule } from './protocolo-routing.module';

import { ProtocoloPage } from './protocolo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProtocoloPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [ProtocoloPage]
})
export class ProtocoloPageModule {}
