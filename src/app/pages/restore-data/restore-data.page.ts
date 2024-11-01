import { Component, OnInit, inject } from '@angular/core';
import { AlertController } from '@ionic/angular';

import { GeneralService } from 'src/app/common/services/general.service';

import { File } from '@awesome-cordova-plugins/file/ngx';
import { FileOpener } from '@awesome-cordova-plugins/file-opener/ngx';
import { Platform } from '@ionic/angular';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';


@Component({
  selector: 'app-restore-data',
  templateUrl: './restore-data.page.html',
  styleUrls: ['./restore-data.page.scss'],
})
export class RestoreDataPage {
  generalService: GeneralService = inject(GeneralService)

  constructor(
    private alertController: AlertController,
    private file: File,
    private fileOpener: FileOpener,
    private platform: Platform,
    private androidPermissions: AndroidPermissions
  ) {}

  async exportBackupDataJson() {
    const data: { [key: string]: string } = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(key!);
      if (value !== null) {
        data[key as string] = value;
      }
    }
    const json = JSON.stringify(data);

    const alert = await this.alertController.create({
      header: 'Descargar Copia de Seguridad',
      message: '¿Dónde deseas descargar la copia de seguridad?',
      inputs: [
        {
          name: 'filename',
          type: 'text',
          placeholder: 'Nombre del archivo'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Descargar',
          handler: async (data) => {
            const filename = (data && data.filename) ? data.filename : 'backup_localstorage.json';
            const blob = new Blob([json], { type: 'application/json' });

            if (this.platform.is('android')) {
              this.saveFileAndroid(filename, blob);
            } else if (this.platform.is('ios')) {
              this.saveFileIOS(filename, blob);
            }
          }
        }
      ]
    });

    await alert.present();
  }

  saveFileAndroid(filename: string, blob: Blob) {
    const path = this.file.externalRootDirectory + 'Downloads/';

    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE).then(
      result => {
        if (result.hasPermission) {
          this.file.createDir(path, '', false)
            .then(() => {
              this.file.writeFile(path, filename, blob, { replace: true })
                .then(() => {
                  this.fileOpener.open(path + filename, 'application/json')
                    .then(() => console.log('Archivo abierto exitosamente'))
                    .catch(e => console.error('Error al abrir el archivo', e));
                })
                .catch(err => {
                  console.error('Error al guardar el archivo', err);
                });
            })
            .catch(err => {
              // Si la carpeta ya existe, intenta escribir el archivo
              this.file.writeFile(path, filename, blob, { replace: true })
                .then(() => {
                  this.fileOpener.open(path + filename, 'application/json')
                    .then(() => console.log('Archivo abierto exitosamente'))
                    .catch(e => console.error('Error al abrir el archivo', e));
                })
                .catch(err => {
                  console.error('Error al guardar el archivo', err);
                });
            });
        } else {
          this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE).then(
            () => {
              this.saveFileAndroid(filename, blob);
            },
            err => {
              console.error('Permiso denegado', err);
            }
          );
        }
      },
      err => {
        console.error('Error al verificar los permisos', err);
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE);
      }
    );
  }

  saveFileIOS(filename: string, blob: Blob) {
    const path = this.file.documentsDirectory;

    this.file.writeFile(path, filename, blob, { replace: true })
      .then(() => {
        this.fileOpener.open(path + filename, 'application/json')
          .then(() => console.log('Archivo abierto exitosamente'))
          .catch(e => console.error('Error al abrir el archivo', e));
      })
      .catch(err => {
        console.error('Error al guardar el archivo', err);
      });
  }



  loadBackUp(){
    this.generalService.importBackup()
  }

  exportBackUp(){
    this.generalService.exportBackup()
  }




}
