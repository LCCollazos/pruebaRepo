import { SongService } from './../common/services/song.service';
import { DetalleEventoService } from './../common/services/detalle-evento.service';
import { DetalleEvento } from './../common/models/detalleEvento';
import { ServiciosVals } from './../common/services/ServiciosVals.service';
import { EventService } from './../common/services/event.service';
import { GeneralService } from './../common/services/general.service';
import { AlertController, IonTabs } from '@ionic/angular';
import { Router } from '@angular/router';
import { Usuario } from '../common/models/usuario';
import { UserServiceService } from '../common/services/user.service';
import { Component, ViewChild, inject } from '@angular/core';
import { Evento } from '../common/models/evento';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Personal } from '../common/models/personal';
import { PersonalService } from '../common/services/personal.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Servicios } from '../common/models/servicios';
import { CancionEvento } from '../common/models/cancionEvento';
import { ProtocoloService } from '../common/services/protocolo.service';
import { Platform } from '@ionic/angular';
import { Abonos } from '../common/models/abonos';
import { AbonosService } from '../common/services/abonos.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  animations: [
    trigger('slideDown', [
      state('void', style({
        transform: 'translateY(-100%)',
        opacity: 0
      })),
      state('*', style({
        transform: 'translateY(0)',
        opacity: 1
      })),
      transition('void => *', animate('300ms ease-out')),
      transition('* => void', animate('300ms ease-in'))
    ])
  ]

})

// esta es una prueba de adicion al codigo nuevo con nuevo pushhhhhh




//SEGUNDO CAMBIO PARA RAMA PERSONAL RA MA GIT Y DEMAS

//NUENAS NUEVAS

export class HomePage {

  @ViewChild('myTabs', { static: true }) tabs: IonTabs | undefined;

  userService: UserServiceService = inject(UserServiceService)
  eventService: EventService = inject(EventService)
  detalleService: DetalleEventoService = inject(DetalleEventoService)
  generalService: GeneralService = inject(GeneralService)
  personalService: PersonalService = inject(PersonalService)
  serviciosVals: ServiciosVals = inject(ServiciosVals)
  protocoloService: ProtocoloService = inject(ProtocoloService)
  abonoService: AbonosService = inject(AbonosService)

  Listusers: Usuario[] = []
  ListEventsActive: Evento[] = []
  ListEventsInactive: Evento[] = []

  ListEstado = [{value: "ACTIVO",  name: "ACTIVO"}, {value: "FINALIZADO",  name: "FINALIZADO"}]
  ListRolPersonas = [
  {value: "NO",  name: "NO"},
  {value: "Hermano/a",  name: "Hermano/a"},
  {value: "Primo/a",  name: "Primo/a"},
  {value: "Tio/a",  name: "Tio/a"},
  {value: "Abuelo/a",  name: "Abuelo/a"},
  {value: "Familiar",  name: "Familiar"}]
  ListEdecanesOP = [{value: "NO", name: "NO"},{value: "SI", name: "SI"}]

  abonoRegister = {}

  ListPersonal: Personal[] = []
  ListServiciosVals: Servicios[] = []
  ListServiciosAsociados: DetalleEvento[] = []
  ListAbonos: Abonos[] = []

  formEvent: FormGroup
  formProtocolo: FormGroup
  formAbono: FormGroup
  dataValue: any
  ValorTotal: number = 0
  ValorExcedente: number = 0
  ValorMontaje: number = 0
  ValorEdecanes: number = 0
  ValorTotalEdecanes: number = 0
  selectedSegment: string = 'general';
  ProtocoloEvento: any
  modeText: string = ''


  isNewEvent = false
  isUpdateEvent = false
  isListServicios = false
  detailShowEvent = false
  abonoShowEvent = false
  showPicker = false
  zapatillas = false
  anillo = false
  corona = false
  edecanes = false
  isEventsInactive = false
  isGenerateEvent = false
  isDarkMode: boolean = false;

  // PESTAÑA CANCIONES ---------------------------------------------------------------------
  songSergice: SongService = inject(SongService)
  formSong: FormGroup
  ListaCanciones: CancionEvento[] = []

  isNewSong = false
  isUpdateSong = false

  public actionSheetButtonsAdd = [
    {
      text: 'Confirmar',
      role: 'destructive',
      handler: () => {
        this.addEvent()
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
        this.updateEvent()
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
        this.deleteEvent()
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

  public actionSheetButtonsUpdateSong = [
    {
      text: 'Confirmar',
      role: 'destructive',
      handler: () => {
        this.updateSong()
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

  public actionSheetButtonsUpdateAbono = [
    {
      text: 'Confirmar',
      role: 'destructive',
      handler: () => {
        this.updateSong()
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

  public actionSheetButtonsDeleteSong = [
    {
      text: 'Confirmar',
      role: 'destructive',
      handler: () => {
        this.deleteSong()
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

  constructor(private formBuilder: FormBuilder, private router: Router, private alertController: AlertController, private platform: Platform,) {
    this.formEvent = this.formBuilder.group({
      id_evento: [null],
      lugar: [null, Validators.required],
      fecha_evento: [null],
      nombre_quinceanera: [null, Validators.required],
      nombre_mama: [null],
      nombre_papa: [null],
      nombre_hermano_hermana: [null],
      nombre_abuelo_abuela: [null],
      telefono_quinces: [null],
      telefono_papas: [null, Validators.required],
      zapatillas: [null],
      rol_zapatillas: ['NO', Validators.required],
      anillo: [null],
      rol_anillo: ['NO', Validators.required],
      corona: [null],
      rol_corona: ['NO', Validators.required],
      instructor_encargado: [null, Validators.required],
      estado: [{value: 'ACTIVO'}],
      observaciones: [null],
      ValorEventoTotal: [null],
    });
    this.formProtocolo = formBuilder.group({
      id_protocolo: [null],
      id_evento: [null],
      descripcion: [null],
      tipo: ['ESTANDAR'],
      estado: ['ACTIVO'],
    })
    this.formAbono = formBuilder.group({
      id_abono: [null],
      id_evento: [null],
      valor: [null],
      fecha: [null]
    })
    this.formSong =this.formBuilder.group({
      id_cancion: [null],
      id_evento: [this.formEvent.controls['id_evento'].value],
      cancion: [null],
      bailaCancion: [null],
      instructorMontaje: [null],
      estado: [{value: 'ACTIVO'}],
      link: [null]
    })
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.cancelNewEvent()
    });
  }


  // PESTAÑA GENERAL EVENTOS ---------------------------------------------------------------------
  ionViewDidEnter(){
    this.getListEvents()
    this.setToday()
    this.resetFormEvent()
    this.loadComponents()
  }

  loadComponents(){
    this.ListPersonal = this.personalService.getPersons()
    this.ListServiciosVals = this.serviciosVals.getServicios()
  }

  // Guardar el estado del formulario antes de cambiar de segmento
  saveFormState() {
    localStorage.setItem('formStateEvent', JSON.stringify(this.formEvent.value));
  }

  // Restaurar el estado del formulario al cambiar de segmento
  restoreFormState() {
    const savedStateString = localStorage.getItem('formStateEvent');
    if (savedStateString) {
      const savedState = JSON.parse(savedStateString);
      this.formEvent.patchValue(savedState);
    }
  }

  // Método para cambiar el valor de selectedSegment
  updateSelectedSegment(segment: string) {
    this.saveFormState(); // Guardar el estado del formulario antes de cambiar
    this.selectedSegment = segment;
    this.restoreFormState();
  }

  verifyInactiveEvents(){
    if(this.ListEventsInactive && this.ListEventsInactive.length > 0){
      this.isEventsInactive = true
    }else{
      this.isEventsInactive = false
    }
  }

  goToAboutPage(page: string) {
    this.router.navigate(['/'+page+'']);
  }

  openEventShow(item: any){
    this.ListServiciosAsociados = []
    this.isUpdateEvent = true
    this.isNewEvent = true
    this.formEvent.controls['id_evento'].setValue(item.id_evento)
    this.formEvent.controls['lugar'].setValue(item.lugar)

    this.formEvent.controls['fecha_evento'].setValue(item.fecha_evento)
    this.formEvent.controls['nombre_quinceanera'].setValue(item.nombre_quinceanera)
    this.formEvent.controls['nombre_mama'].setValue(item.nombre_mama)
    this.formEvent.controls['nombre_papa'].setValue(item.nombre_papa)
    this.formEvent.controls['nombre_hermano_hermana'].setValue(item.nombre_hermano_hermana)
    this.formEvent.controls['nombre_abuelo_abuela'].setValue(item.nombre_abuelo_abuela)
    this.formEvent.controls['telefono_quinces'].setValue(item.telefono_quinces)
    this.formEvent.controls['telefono_papas'].setValue(item.telefono_papas)
    this.formEvent.controls['zapatillas'].setValue(item.zapatillas)
    this.formEvent.controls['rol_zapatillas'].setValue(item.rol_zapatillas)
    this.changeRolControl('zapatillas')
    this.formEvent.controls['anillo'].setValue(item.anillo)
    this.formEvent.controls['rol_anillo'].setValue(item.rol_anillo)
    this.changeRolControl('anillo')
    this.formEvent.controls['corona'].setValue(item.corona)
    this.formEvent.controls['rol_corona'].setValue(item.rol_corona)
    this.changeRolControl('corona')
    this.formEvent.controls['instructor_encargado'].setValue(item.instructor_encargado)
    this.formEvent.controls['estado'].setValue(item.estado)
    this.formEvent.controls['observaciones'].setValue(item.observaciones)
    this.formEvent.controls['ValorEventoTotal'].setValue(item.ValorEventoTotal)
    this.ListServiciosAsociados = this.detalleService.getDetailEventsById(item.id_evento) || []
    this.calcularTotalEvento()
    this.ListaCanciones = this.songSergice.getSongsEventsById(item.id_evento) || []
    this.ListAbonos = this.abonoService.getAbonosEventsById(item.id_evento) || []
    this.calcularTotalSaldo()
    this.ProtocoloEvento = this.protocoloService.getProtocoloEventById(item.id_evento)
    if(this.ProtocoloEvento !== null){
      this.formProtocolo.controls['id_protocolo'].setValue(this.ProtocoloEvento.id_protocolo)
      this.formProtocolo.controls['id_evento'].setValue(this.ProtocoloEvento.id_evento)
      this.formProtocolo.controls['descripcion'].setValue(this.ProtocoloEvento.descripcion)
      this.formProtocolo.controls['tipo'].setValue(this.ProtocoloEvento.tipo)
      this.formProtocolo.controls['estado'].setValue(this.ProtocoloEvento.estado)
    }else{
      this.formProtocolo.controls['id_protocolo'].setValue(null)
      this.formProtocolo.controls['id_evento'].setValue(item.id_evento)
      this.formProtocolo.controls['descripcion'].setValue(null)
      this.formProtocolo.controls['tipo'].setValue(null)
      this.formProtocolo.controls['estado'].setValue(null)
    }

  }

  calcularTotalEvento(){
    let total = 0;
    for (const servicio of this.ListServiciosAsociados) {
      total += servicio.valor * servicio.cantidad;
    }
    this.ValorTotal = total
  }

  calcularTotalSaldo(){
    let total = 0;
    for (const abono of this.ListAbonos) {
      total += abono.valor;
    }
    this.ValorExcedente = this.ValorTotal - total;
  }

  openDetailEvent(){
    this.detailShowEvent = !this.detailShowEvent;
  }

  closeDetailEvent(){
    this.detailShowEvent = !this.detailShowEvent;
  }

  async addServicioVals(item: any) {
    const alert = await this.alertController.create({
      header: 'Cantidad y Valor',
      inputs: [
        {
          id: 'cantidad',
          name: 'cantidad',
          type: 'number',
          placeholder: 'Ingrese la cantidad'
        },
        {
          id: 'valorOriginal',
          name: 'valorOriginal',
          type: 'number',
          value: item.valor.toString(), // Mostrar el valor original
          disabled: false // Bloquear el campo de entrada
        },

      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Aceptar',
          handler: (data) => {
            // Asocia el servicio con la cantidad ingresada y el valor original a la lista existente
            this.asociarServicio(item, data.cantidad, data.valorOriginal);
          }
        }
      ]
    });

    await alert.present();
    const cantidadInput = document.querySelector('ion-alert input[id="cantidad"]') as HTMLInputElement;
    if (cantidadInput) {
      cantidadInput.focus();
    }
  }

  async addAbonoVals() {
    const alert = await this.alertController.create({
      header: 'Valor y Fecha',
      inputs: [
        {
          id: 'Valor',
          name: 'Valor',
          type: 'text', // Cambia a 'text' para manejar el formateo
          placeholder: 'Ingrese el Valor',
          attributes: {
            inputmode: 'numeric', // Opcional: ayuda a mostrar teclado numérico
          }
        },
        {
          id: 'desc',
          name: 'desc',
          type: 'text',
          placeholder: 'Ingrese el medio de pago o una descripcion',
          disabled: false // Bloquear el campo de entrada
        },
        {
          id: 'fecha',
          name: 'fecha',
          type: 'date',
          disabled: false // Bloquear el campo de entrada
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Aceptar',
          handler: (data) => {
            // Eliminar formato al guardar
            const rawValue = data.Valor.replace(/\./g, '').replace(/,/g, '');
            const numberValue = parseFloat(rawValue);
            // Asocia el servicio con la cantidad ingresada y el valor original a la lista existente
            this.registrarAbono(isNaN(numberValue) ? 0 : numberValue, data.fecha, data.desc);
          }
        }
      ]
    });

    await alert.present();
    const valorInput = document.querySelector('ion-alert input[id="Valor"]') as HTMLInputElement;
    if (valorInput) {
      valorInput.select();
      valorInput.focus();

      valorInput.addEventListener('input', () => {
        const rawValue = valorInput.value.replace(/\./g, '').replace(/,/g, ''); // Limpiar entrada
        const numberValue = parseFloat(rawValue); // Convertir a número

        // Solo formatear si es un número válido
        if (!isNaN(numberValue)) {
          // Formatear y mostrar el valor en el input
          valorInput.value = new Intl.NumberFormat('es-ES').format(numberValue);
        } else {
          valorInput.value = ''; // Limpiar si no es un número
        }
      });
    }
  }

  async editQuantity(item: any) {
    const alert = await this.alertController.create({
      header: 'Editar Cantidad',
      inputs: [
        {
          id: 'cantidad',
          name: 'cantidad',
          type: 'number',
          value: item.cantidad.toString(),
          placeholder: 'Cantidad'
        },
        {
          id: 'valorOriginal',
          name: 'valorOriginal',
          type: 'number',
          value: item.valor.toString(), // Mostrar el valor original
          disabled: false // Bloquear el campo de entrada
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Guardar',
          handler: (data) => {
            // Actualizar la cantidad del servicio en el array
            const index = this.ListServiciosAsociados.findIndex(servicio => servicio === item);
            if (index !== -1) {
              this.ListServiciosAsociados[index].cantidad = parseInt(data.cantidad, 10);
              this.ListServiciosAsociados[index].valor = parseInt(data.valorOriginal, 10);
            }
            this.calcularTotalEvento()
          }
        }
      ]
    });

    await alert.present();
    const cantidadInput = document.querySelector('ion-alert input[id="cantidad"]') as HTMLInputElement;
    if (cantidadInput) {
      cantidadInput.select();
      cantidadInput.focus();
    }
  }

  async editQuantityAbono(item: any) {
    const alert = await this.alertController.create({
      header: 'Editar Abono',
      inputs: [
        {
          id: 'Valor',
          name: 'Valor',
          type: 'text', // Cambia a 'text' para manejar el formateo
          value: item.valor.toString(),
          placeholder: 'Valor',
          attributes: {
            inputmode: 'numeric', // Opcional: ayuda a mostrar teclado numérico
          }
        },
        {
          id: 'desc',
          name: 'desc',
          type: 'text',
          value: item.descripcion,
          placeholder: 'Medio de pago ó Descripcion'
        },
        {
          id: 'fecha',
          name: 'fecha',
          type: 'date',
          value: item.fecha.toString(), // Mostrar el valor original
          disabled: false // Bloquear el campo de entrada
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Guardar',
          handler: (data) => {
            // Actualizar la cantidad del servicio en el array
            const index = this.ListAbonos.findIndex(abono => abono === item);
            if (index !== -1) {
              this.ListAbonos[index].fecha = data.fecha;
              this.ListAbonos[index].descripcion = data.desc;

              // Eliminar formato al guardar
              const rawValue = data.Valor.replace(/\./g, '').replace(/,/g, '');
              const numberValue = parseFloat(rawValue);
              this.ListAbonos[index].valor = isNaN(numberValue) ? 0 : numberValue;
              this.abonoRegister = {id_abono: item.id_abono, id_evento: item.id_evento, fecha: data.fecha, valor: this.ListAbonos[index].valor, descripcion: data.desc}
              this.updateAbono(this.abonoRegister);
              this.calcularTotalSaldo()
            }
          }
        }
      ]
    });

    await alert.present();
    const valorInput = document.querySelector('ion-alert input[id="Valor"]') as HTMLInputElement;
    if (valorInput) {
      valorInput.select();
      valorInput.focus();

      valorInput.addEventListener('input', () => {
        const rawValue = valorInput.value.replace(/\./g, '').replace(/,/g, ''); // Limpiar entrada
        const numberValue = parseFloat(rawValue); // Convertir a número

        // Solo formatear si es un número válido
        if (!isNaN(numberValue)) {
          // Formatear y mostrar el valor en el input
          valorInput.value = new Intl.NumberFormat('es-ES').format(numberValue);
        } else {
          valorInput.value = ''; // Limpiar si no es un número
        }
      });
    }
  }

  asociarServicio(servicio: any, cantidad: number, valor: number) {
    if(this.formEvent.controls['id_evento'].value !== null){
      const servicioAsociado: DetalleEvento = { id_detalle_evento: 0, id_evento: this.formEvent.controls['id_evento'].value, servicioContratado: servicio.servicio, valor: valor, cantidad: cantidad };
      this.ValorTotal += (servicio.valor * cantidad)
      this.ListServiciosAsociados.push(servicioAsociado);
      this.calcularTotalEvento()
    }else{
      const idEvento = this.eventService.generateEventId()
      const servicioAsociado: DetalleEvento = { id_detalle_evento: 0, id_evento: idEvento, servicioContratado: servicio.servicio, valor: valor, cantidad: cantidad };
      this.ValorTotal += (servicio.valor * cantidad)
      this.ListServiciosAsociados.push(servicioAsociado);
      this.calcularTotalEvento()
    }
  }

  registrarAbono(valor: number, fecha: string, descripcion: string) {
    if(this.formEvent.controls['id_evento'].value !== null){
      const abono: Abonos = { id_abono: 0, id_evento: this.formEvent.controls['id_evento'].value, valor: valor, fecha: fecha, descripcion: descripcion };
      this.abonoService.addAbono(abono)
      this.ListAbonos.push(abono);
      this.calcularTotalSaldo()
    }
  }


  removeServiceSelected(servicio: any){
    this.ListServiciosAsociados = this.ListServiciosAsociados.filter(item => item.servicioContratado !== servicio);
    this.calcularTotalEvento()
  }

  removeAbonoSelected(Abono: any){
    this.ListAbonos = this.ListAbonos.filter(item => item.id_abono !== Abono.id_abono);
    this.abonoService.deleteAbono(Abono.id_abono)
    this.calcularTotalSaldo()
  }

  changeRolControl(controlName: string){
    if(controlName === 'zapatillas'){
      if((this.formEvent.controls['rol_zapatillas'].value) !== 'NO'){
        this.zapatillas = true
      }else{
        this.formEvent.controls['zapatillas'].setValue(null)
        this.zapatillas = false
      }
    }
    if(controlName === 'anillo'){
      if((this.formEvent.controls['rol_anillo'].value) !== 'NO'){
        this.anillo = true
      }else{
        this.formEvent.controls['anillo'].setValue(null)
        this.anillo = false
      }
    }
    if(controlName === 'corona'){
      if((this.formEvent.controls['rol_corona'].value) !== 'NO'){
        this.corona = true
      }else{
        this.formEvent.controls['corona'].setValue(null)
        this.corona = false
      }
    }
  }

  getListEvents(){
    this.ListEventsActive = this.eventService.getEventsByState('ACTIVO').sort((a, b) => {
      const dateA = new Date(a.fecha_evento);
      const dateB = new Date(b.fecha_evento);
      return dateA.getTime() - dateB.getTime();
    });
    this.ListEventsInactive = this.eventService.getEventsByState('FINALIZADO')
    this.verifyInactiveEvents()
  }

  setToday(){
    const fecha = new Date();
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Sumamos 1 porque los meses comienzan en 0
    const anio = fecha.getFullYear();
    const hora = fecha.getHours().toString().padStart(2, '0');
    const minutos = fecha.getMinutes().toString().padStart(2, '0');

    //this.FechaEventoSeleccionada = `${dia}/${mes}/${anio} ${hora}:${minutos}`;
  }

  dataChanged(value: any) {
    const fecha = new Date(value);
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Sumamos 1 porque los meses comienzan en 0
    const anio = fecha.getFullYear();
    const hora = fecha.getHours().toString().padStart(2, '0');
    const minutos = fecha.getMinutes().toString().padStart(2, '0');

    //this.FechaEventoSeleccionada = `${dia}/${mes}/${anio} ${hora}:${minutos}`;
  }

  resetFormEvent(){
    this.ListServiciosAsociados = []
    this.isNewEvent = false
    this.isUpdateEvent = false
    this.ValorTotal = 0
    this.ValorExcedente = 0
    this.formEvent.controls['id_evento'].setValue(null)
    this.formEvent.controls['lugar'].setValue(null)
    this.formEvent.controls['fecha_evento'].setValue(null)
    this.formEvent.controls['nombre_quinceanera'].setValue(null)
    this.formEvent.controls['nombre_mama'].setValue(null)
    this.formEvent.controls['nombre_papa'].setValue(null)
    this.formEvent.controls['nombre_hermano_hermana'].setValue(null)
    this.formEvent.controls['nombre_abuelo_abuela'].setValue(null)
    this.formEvent.controls['telefono_quinces'].setValue(null)
    this.formEvent.controls['telefono_papas'].setValue(null)
    this.formEvent.controls['zapatillas'].setValue(null)
    this.formEvent.controls['rol_zapatillas'].setValue('NO')
    this.formEvent.controls['anillo'].setValue(null)
    this.formEvent.controls['rol_anillo'].setValue('NO')
    this.formEvent.controls['corona'].setValue(null)
    this.formEvent.controls['rol_corona'].setValue('NO')
    this.formEvent.controls['instructor_encargado'].setValue(null)
    this.formEvent.controls['estado'].setValue('ACTIVO')
    this.formEvent.controls['observaciones'].setValue(null)
    this.formEvent.controls['ValorEventoTotal'].setValue(this.ValorTotal)
  }
  newEvent(){
    this.isNewEvent = true
  }
  addEvent(){
    //this.formEvent.controls['fecha_evento'].setValue(this.FechaEventoSeleccionada)
    this.formEvent.controls['ValorEventoTotal'].setValue(this.ValorTotal)
    this.eventService.addEvent(this.formEvent.value)
    for(const servicio of this.ListServiciosAsociados){
      this.detalleService.addDetailEvent(servicio)
    }
    this.generalService.presentToast('REGISTRO EXITOSO')
    this.resetFormEvent()
    this.getListEvents()
  }
  updateEvent(){
    //this.formEvent.controls['fecha_evento'].setValue(this.FechaEventoSeleccionada)
    this.formEvent.controls['ValorEventoTotal'].setValue(this.ValorTotal)
    this.eventService.updateEvent(this.formEvent.value)
    this.detalleService.deleteDetailsEventsByEventId(this.formEvent.controls['id_evento'].value)
    for(const servicio of this.ListServiciosAsociados){
      this.detalleService.addDetailEvent(servicio)
    }
    this.generalService.presentToast('ACTUALIZACION EXITOSA')
    this.openEventShow(this.formEvent.value)
    this.getListEvents()
  }
  deleteEvent(){
    this.eventService.deleteEvent(this.formEvent.controls['id_evento'].value)
    this.resetFormEvent()
    this.generalService.presentToast('EVENTO ELIMINADO')
    this.getListEvents()
  }
  cancelNewEvent(){
    this.isUpdateEvent = false
    this.isNewEvent = false
    this.resetFormEvent()
    this.getListEvents()
    this.selectedSegment = 'general'
  }



  // PESTAÑA CANCIONES ---------------------------------------------------------------------

  NewSong(){
    this.isNewSong = true
  }

  openSongDetail(item: any){
    this.NewSong()
    this.isUpdateSong = true
    this.formSong.controls['id_cancion'].setValue(item.id_cancion)
    this.formSong.controls['id_evento'].setValue(item.id_evento)
    this.formSong.controls['cancion'].setValue(item.cancion)
    this.formSong.controls['bailaCancion'].setValue(item.bailaCancion)
    this.formSong.controls['instructorMontaje'].setValue(item.instructorMontaje)
    this.formSong.controls['estado'].setValue(item.estado)
    this.formSong.controls['link'].setValue(item.link)
  }

  cancelNewSong(){
    this.isNewSong = false
    this.resetFormSong()
  }

  resetFormSong(){
    this.formSong.controls['id_cancion'].setValue('')
    this.formSong.controls['id_evento'].setValue('')
    this.formSong.controls['cancion'].setValue('')
    this.formSong.controls['bailaCancion'].setValue('')
    this.formSong.controls['instructorMontaje'].setValue('')
    this.formSong.controls['estado'].setValue('')
    this.formSong.controls['link'].setValue('')
    this.isNewSong = false
    this.isUpdateSong = false
  }

  getSongsList(){
    this.ListaCanciones = this.songSergice.getSongsEventsById(this.formEvent.controls['id_evento'].value) || []
  }

  getAbonosList(){
    this.ListAbonos = this.abonoService.getAbonosEventsById(this.formEvent.controls['id_evento'].value) || []
  }

  addSong(){
    this.formSong.controls['id_evento'].setValue(this.formEvent.controls['id_evento'].value)
    this.songSergice.addSong(this.formSong.value)
    this.generalService.presentToast('REGISTRO EXITOSO')
    this.resetFormSong()
    this.getSongsList()
  }

  updateSong(){
    this.songSergice.updateSong(this.formSong.value)
    this.generalService.presentToast('ACTUALIZACION EXITOSA')
    this.resetFormSong()
    this.getSongsList()
  }

  updateAbono(item: any){
    this.abonoService.updateAbono(item)
    this.generalService.presentToast('ACTUALIZACION EXITOSA')
    this.getAbonosList()
  }

  deleteSong(){
    this.songSergice.deleteSong(this.formSong.controls['id_cancion'].value)
    this.generalService.presentToast('CANCION ELIMINADA')
    this.resetFormSong()
    this.getSongsList()
  }

  GenerateProtocolo(){
    const protocoloEstandar = this.protocoloService.getProtocoloEstandar().descripcion
    const protocoloGenerado = `${protocoloEstandar
      .replace("nomQuinces", this.formEvent.controls['nombre_quinceanera'].value)
      .replace("nomMama", this.formEvent.controls['nombre_mama'].value)
      .replace("nomPapa", this.formEvent.controls['nombre_papa'].value)
      .replace("nomHermano", this.formEvent.controls['nombre_hermano_hermana'].value)
      .replace("nomAbue", this.formEvent.controls['nombre_abuelo_abuela'].value)
      .replace("nomZapatillas", this.formEvent.controls['zapatillas'].value)
      .replace("rolZapatillas", this.formEvent.controls['rol_zapatillas'].value)
      .replace("nomQuinces", this.formEvent.controls['nombre_quinceanera'].value)
      .replace("nomAnillo", this.formEvent.controls['anillo'].value)
      .replace("rolAnillo", this.formEvent.controls['rol_anillo'].value)
      .replace("nomCorona", this.formEvent.controls['corona'].value)
      .replace("rolCorona", this.formEvent.controls['rol_corona'].value)
    }`;
    this.formProtocolo.controls['descripcion'].setValue(protocoloGenerado)
  }

  saveProtocolo(){
    if(this.formProtocolo.controls['id_protocolo'].value !== null){
      this.protocoloService.updateProtocolo(this.formProtocolo.value)
      this.generalService.presentToast('ACTUALIZACION EXITOSA')
    }else{
      this.formProtocolo.controls['id_evento'].setValue(this.formEvent.controls['id_evento'].value)
      this.protocoloService.addProtocolo(this.formProtocolo.value)
      this.generalService.presentToast('REGISTRO EXITOSO')
    }
  }





}


