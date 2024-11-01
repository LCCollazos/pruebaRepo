import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PersonalPageRoutingModule } from './personal-routing.module';

import { PersonalPage } from './personal.page';
import { RouterModule } from '@angular/router';
import { slideAnimation } from 'src/app/common/controllers/animation';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PersonalPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [PersonalPage]
})
export class PersonalPageModule {}
