export class Protocolo {
  id_protocolo: number;
  id_evento: number;
  descripcion: string;
  tipo: string;
  estado: string;

  constructor(
    id_protocolo: number,
    id_evento: number,
    descripcion: string,
    tipo: string,
    estado: string
  ) {
    this.id_protocolo = id_protocolo;
    this.id_evento = id_evento;
    this.descripcion = descripcion;
    this.tipo = tipo;
    this.estado = estado;
  }
}
