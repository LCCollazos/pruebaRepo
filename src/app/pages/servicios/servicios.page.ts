import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Servicios } from 'src/app/common/models/servicios';
import { ServiciosVals } from 'src/app/common/services/ServiciosVals.service';
import { GeneralService } from 'src/app/common/services/general.service';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.page.html',
  styleUrls: ['./servicios.page.scss'],
})
export class ServiciosPage {

  servicioService: ServiciosVals = inject(ServiciosVals)
  generalService: GeneralService = inject(GeneralService)

  formServicio: FormGroup

  ListServicios: Servicios[] = []

  isNew = false
  isUpdate = false

  public actionSheetButtonsDelete = [
    {
      text: 'Confirmar',
      role: 'destructive',
      handler: () => {
        this.deleteServicio()
      },
    },
    {
      text: 'Cancelar',
      role: 'cancel',
      data: {
        action: 'cancel',
      },
    },
  ];

  public actionSheetButtonsUpdate = [
    {
      text: 'Confirmar',
      role: 'destructive',
      handler: () => {
        this.updateServicio()
      },
    },
    {
      text: 'Cancel',
      role: 'cancel',
      data: {
        action: 'cancel',
      },
    },
  ];

  constructor(private formBuilder: FormBuilder) {
    this.formServicio = this.formBuilder.group({
      id_servicio: [null],
      servicio: [null, Validators.required],
      valor: [null, Validators.required]
    })
  }

  ionViewDidEnter(){
    this.getServicios()
  }

  OpenDetailServicio(item: any){
    this.isNew = true
    this.isUpdate = true
    this.formServicio.controls['id_servicio'].setValue(item.id_servicio)
    this.formServicio.controls['servicio'].setValue(item.servicio)
    this.formServicio.controls['valor'].setValue(item.valor)
  }

  getServicios(){
    this.ListServicios = this.servicioService.getServicios()
  }

  NuevoServicio(){
    this.isUpdate = false
    this.isNew = true
  }

  resetFormAll(){
    this.isNew = false
    this.isUpdate = false
    this.formServicio.controls['id_servicio'].setValue(null)
    this.formServicio.controls['servicio'].setValue(null)
    this.formServicio.controls['valor'].setValue(null)
  }

  cancelNewServicio(){
    this.isUpdate = false
    this.isNew = false
    this.resetFormAll()
  }

  addServicio(){
    this.servicioService.addServiceVals(this.formServicio.value)
    this.generalService.presentToast('REGISTRO EXITOSO')
    this.getServicios()
    this.resetFormAll()
  }

  updateServicio(){
    this.servicioService.updateService(this.formServicio.value)
    this.generalService.presentToast('ACTUALIZACION EXITOSA')
    this.getServicios()
  }

  deleteServicio(){
    this.servicioService.delelteServiceVals(this.formServicio.controls['id_servicio'].value)
    this.generalService.presentToast('REGISTRO ELIMINADO')
    this.getServicios()
    this.resetFormAll()
  }


}
