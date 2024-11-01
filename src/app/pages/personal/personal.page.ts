import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, inject } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Personal } from 'src/app/common/models/personal';
import { PersonalService } from 'src/app/common/services/personal.service';
import { IfStmt } from '@angular/compiler';
import { GeneralService } from 'src/app/common/services/general.service';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.page.html',
  styleUrls: ['./personal.page.scss'],
})
export class PersonalPage {

  personalService: PersonalService = inject(PersonalService)
  generarService: GeneralService = inject(GeneralService)

  ListPersonalActivo: Personal[] = []
  ddlRol = [{value: 'ADMINISTRATIVO', name: 'ADMINISTRATIVO'},{value: 'EDECAN', name: 'EDECAN'}]

  formPersonal: FormGroup

  isUpdate = false
  isNew = false

  public actionSheetButtonsAdd = [
    {
      text: 'Confirmar',
      role: 'destructive',
      handler: () => {
        this.addPersonal()
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

  public actionSheetButtonsDelete = [
    {
      text: 'Confirmar',
      role: 'destructive',
      handler: () => {
        this.deletePerson()
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

  public actionSheetButtonsUpdate = [
    {
      text: 'Confirmar',
      role: 'destructive',
      handler: () => {
        this.updatePerson()
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

  constructor(private router: Router, private formBuilder: FormBuilder) {
    this.formPersonal = this.formBuilder.group({
      id_personal: [null],
      nombre: [null, Validators.required],
      rol: [null, Validators.required]
    })
  }

  ionViewDidEnter(){
    this.getPersonal()
  }

  NuevoPersonal(){
    this.isNew = true
  }

  NuevoRegistro(){
    this.isNew = false
    this.isUpdate = false
    this.formPersonal.controls['id_personal'].setValue(null)
    this.formPersonal.controls['nombre'].setValue(null)
    this.formPersonal.controls['rol'].setValue(null)
  }

  cancelNewPerson(){
    this.NuevoRegistro()
  }

  OpenDetailPersonal(item: any){
    this.isUpdate = true
    this.isNew = true
    this.formPersonal.controls['id_personal'].setValue(item.id_personal)
    this.formPersonal.controls['nombre'].setValue(item.nombre)
    this.formPersonal.controls['rol'].setValue(item.rol)
  }

  getPersonal(){
    this.ListPersonalActivo = this.personalService.getPersons()
  }

  addPersonal(){
    this.personalService.addPersonal(this.formPersonal.value)
    this.generarService.presentToast('REGISTRO EXITOSO')
    this.getPersonal()
    this.NuevoRegistro()
  }

  updatePerson(){
    this.personalService.updatePersonal(this.formPersonal.value)
    this.generarService.presentToast('ACTUALIZACION EXITOSA')
    this.getPersonal()
    this.NuevoRegistro()
  }

  deletePerson(){
    this.personalService.deletePersonal(this.formPersonal.controls['id_personal'].value)
    this.generarService.presentToast('REGISTRO ELIMINADO CORRECTAMENTE')
    this.getPersonal()
    this.NuevoRegistro()
  }


}
