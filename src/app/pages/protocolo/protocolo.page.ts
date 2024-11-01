import { FormBuilder, FormGroup } from '@angular/forms';
import { ProtocoloService } from './../../common/services/protocolo.service';
import { Protocolo } from './../../common/models/protocolo';
import { Component, inject } from '@angular/core';
import { GeneralService } from 'src/app/common/services/general.service';

@Component({
  selector: 'app-protocolo',
  templateUrl: './protocolo.page.html',
  styleUrls: ['./protocolo.page.scss'],
})
export class ProtocoloPage {
  protocoloservice: ProtocoloService = inject(ProtocoloService)
  generalService: GeneralService = inject(GeneralService)

  formProtocolo: FormGroup

  ListProtocolo: Protocolo[] = []

  ListEstadosProtocolo = [{value: 'ACTIVO'},{value: 'INACTIVO'}]

  ItemProtocolo: Protocolo | undefined

  protocolo: string = ''

  nomQuinces: string = 'nomQuinces'
  nomMama: string = 'nomMama'
  nomPapa: string = 'nomPapa'
  nomHermano: string = 'nomHermano'
  nomAbue: string = 'nomAbue'
  nomZapatillas: string = 'nomZapatillas'
  rolZapatillas: string = 'rolZapatillas'
  nomAnillo: string = 'nomAnillo'
  rolAnillo: string = 'rolAnillo'
  nomCorona: string = 'nomCorona'
  rolCorona: string = 'rolCorona'

  constructor(private formBuilder: FormBuilder) {
    this.formProtocolo = formBuilder.group({
      id_protocolo: [null],
      id_evento: [null],
      descripcion: [null],
      tipo: [null],
      estado: ['ACTIVO'],
    })
   }

  ionViewDidEnter(){
    this.loadProtocolo()
  }

  LoadProtocoloByID(id_protocolo: number){
    this.ItemProtocolo= this.protocoloservice.getProtocoloByID(id_protocolo)
  }

  saveProtocolo(){
    this.formProtocolo.controls['id_protocolo'].setValue(0)
    this.formProtocolo.controls['id_evento'].setValue(0)
    this.formProtocolo.controls['estado'].setValue('ACTIVO')
    this.formProtocolo.controls['tipo'].setValue('ESTANDAR')
    this.protocoloservice.saveProtocolo(this.formProtocolo.value)
    this.generalService.presentToast('ACTUALIZACION EXITOSA')
  }

  OpenProtocoloDetail(item: any){
    this.ItemProtocolo = item
    this.formProtocolo.controls['id_protocolo'].setValue(this.ItemProtocolo?.id_protocolo)
    this.formProtocolo.controls['id_evento'].setValue(this.ItemProtocolo?.id_evento)
    this.formProtocolo.controls['descripcion'].setValue(this.ItemProtocolo?.descripcion)
    this.formProtocolo.controls['tipo'].setValue(this.ItemProtocolo?.tipo)
    this.formProtocolo.controls['estado'].setValue(this.ItemProtocolo?.estado)
  }

  loadProtocoloEstandar(){
    const quinceañeraProtocol: string = `PROTOCOLO ESTANDAR QUINCE AÑOS\n\nFAMILIA – (  )\n\nQUINCEAÑERA - \nnomQuinces\n\n1- Bienvenida maestro ceremonia\n\n2- presentación corte de honor\n\n   - Edecanes\n\n   - Madre de la quinceañera - \n     nomMama\n\n   - Papá de la quinceañera - \n     nomPapa\n\n   - Herman@ quinceañera - \n     nomHermano\n\n   - Abuelo@ quinceañera - \n     nomAbue\n\n   - Ingreso Quinceañera – \n     nomQuinces\n\n   - Zapatillas - \n     nomZapatillas - rolZapatillas\n\n   - Anillo - \n     nomAnillo - rolAnillo\n\n   - Corona - \n     nomCorona - rolCorona\n\n3 – Inicio Primer Baile de la Noche:\n\n   - VALS Edecanes\n\n   - VALS Padre e Invitados\n\n4 - Palabras y brindis - \n     Champaña ( # Copas )\n\n5 – Cantada Cumpleaños\n\n6 – Sesión de fotos\n\n7 - Baile Sorpresa\n\n8 – Inicio de la fiesta (música a cargo del DJ)\n
    `;
    this.formProtocolo.controls['descripcion'].setValue(quinceañeraProtocol)
  }

  loadProtocolo(){
    this.formProtocolo.controls['descripcion'].setValue(this.protocoloservice.getProtocoloEstandar().descripcion)
  }




}
