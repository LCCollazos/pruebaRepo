export class Evento {
  id_evento: number;
  lugar: string;
  fecha_evento: string;
  nombre_quinceanera: string;
  nombre_mama: string;
  nombre_papa: string;
  nombre_hermano_hermana: string;
  nombre_abuelo_abuela: string;
  telefono_quinces: string;
  telefono_papas: string;
  zapatillas: string;
  rol_zapatillas: string;
  anillo: string;
  rol_anillo: string;
  corona: string;
  rol_corona: string;
  instructor_encargado: string;
  estado: string;
  observaciones: string;
  ValorEventoTotal: number;

  constructor(
    id_evento: number,
    lugar: string,
    fecha_evento: string,
    nombre_quinceanera: string,
    nombre_mama: string,
    nombre_papa: string,
    nombre_hermano_hermana: string,
    nombre_abuelo_abuela: string,
    telefono_quinces: string,
    telefono_papas: string,
    zapatillas: string,
    rol_zapatillas: string,
    anillo: string,
    rol_anillo: string,
    corona: string,
    rol_corona: string,
    instructor_encargado: string,
    estado: string,
    observaciones: string,
    ValorEventoTotal: number
  ) {
    this.id_evento = id_evento;
    this.lugar = lugar;
    this.fecha_evento = fecha_evento;
    this.nombre_quinceanera = nombre_quinceanera;
    this.nombre_mama = nombre_mama;
    this.nombre_papa = nombre_papa;
    this.nombre_hermano_hermana = nombre_hermano_hermana;
    this.nombre_abuelo_abuela = nombre_abuelo_abuela;
    this.telefono_quinces = telefono_quinces;
    this.telefono_papas = telefono_papas;
    this.zapatillas = zapatillas;
    this.rol_zapatillas = rol_zapatillas;
    this.anillo = anillo;
    this.rol_anillo = rol_anillo;
    this.corona = corona;
    this.rol_corona = rol_corona;
    this.instructor_encargado = instructor_encargado;
    this.estado = estado;
    this.observaciones = observaciones;
    this.ValorEventoTotal = ValorEventoTotal;
  }
}
