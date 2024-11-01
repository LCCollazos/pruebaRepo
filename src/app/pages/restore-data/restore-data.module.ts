import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RestoreDataPageRoutingModule } from './restore-data-routing.module';

import { RestoreDataPage } from './restore-data.page';

import { File } from '@awesome-cordova-plugins/file/ngx';
import { FileOpener } from '@awesome-cordova-plugins/file-opener/ngx';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RestoreDataPageRoutingModule,
    
  ],
  providers: [
    File,
    FileOpener,
    AndroidPermissions
  ],
  declarations: [RestoreDataPage]
})
export class RestoreDataPageModule {}
