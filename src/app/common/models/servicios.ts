export class Servicios{
  id_servicio: number;
  servicio: string;
  valor: number;

  constructor(
    id_servicio: number,
    servicio: string,
    valor: number
  ) {
    this.id_servicio = id_servicio;
    this.servicio = servicio;
    this.valor = valor;
  }
}
