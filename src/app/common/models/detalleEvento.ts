export class DetalleEvento {
  id_detalle_evento: number;
  id_evento: number;
  servicioContratado: string;
  valor: number;
  cantidad: number;

  constructor(
    id_detalle_evento: number,
    id_evento: number,
    servicioContratado: string,
    valor: number,
    cantidad: number
  ) {
    this.id_detalle_evento = id_detalle_evento;
    this.id_evento = id_evento;
    this.servicioContratado = servicioContratado;
    this.valor = valor;
    this.cantidad = cantidad;
  }
}
