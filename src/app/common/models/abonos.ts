export class Abonos {
  id_abono: number;
  id_evento: number;
  valor: number;
  fecha: string;
  descripcion: string

  constructor(
    id_abono: number,
    id_evento: number,
    valor: number,
    fecha: string,
    descripcion: string
  ) {
    this.id_abono = id_abono;
    this.id_evento = id_evento;
    this.valor = valor;
    this.fecha = fecha;
    this.descripcion = descripcion
  }
}
