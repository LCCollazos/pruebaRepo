import { AlertController, ToastController } from '@ionic/angular';
import { Injectable } from '@angular/core';

 
@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(private alertController: AlertController, private toastController: ToastController) { }

  async AlertMessage(Message: any, band: any) {
    if(band == 1){
      const alert = await this.alertController.create({
        header: '¡Operacion exitosa!',
        message: ''+Message,
        buttons: ['OK']
      });
      alert.present();
    }
    if(band == 2){
      const alert = await this.alertController.create({
        header: 'Error',
        message: ''+Message,
        buttons: ['OK']
      });
      alert.present();
    }
  }

 
  async exportBackup() {
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
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
          }
        }
      ]
    });

    await alert.present();
  }

  async importBackup() {
    const alert = await this.alertController.create({
      header: 'Restaurar Copia de Seguridad',
      message: 'Selecciona el archivo de copia de seguridad',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Seleccionar Archivo',
          handler: async () => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = '.json';
            input.style.display = 'none'; // Ocultar el input de tipo file
            input.addEventListener('change', async (event: any) => {
              const file = event.target.files[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = async (e: any) => {
                  const json = e.target.result;
                  if (json) {
                    const backupData = JSON.parse(json);
                    Object.keys(backupData).forEach(key => {
                      localStorage.setItem(key, backupData[key]);
                    });
                    await alert.dismiss();
                    this.AlertMessage('Copia de seguridad restaurada con éxito', 1)

                  }
                };
                reader.readAsText(file);
              }
            });
            document.body.appendChild(input);
            input.click();
          }
        }
      ]
    });

    await alert.present();
  }

  
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      icon: 'alert-circle-outline',
      message: message,
      duration: 2000,
    });
    toast.present();
  }


}
