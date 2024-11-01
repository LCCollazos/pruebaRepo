export class CancionEvento {
  id_cancion: number;
  id_evento: number;
  cancion: string;
  bailaCancion: string;
  instructorMontaje: string;
  estado: string;
  link: string;

  constructor(
    id_cancion: number,
    id_evento: number,
    cancion: string,
    bailaCancion: string,
    instructorMontaje: string,
    estado: string,
    link: string
  ) {
    this.id_cancion = id_cancion;
    this.id_evento = id_evento;
    this.cancion = cancion;
    this.bailaCancion = bailaCancion;
    this.instructorMontaje = instructorMontaje;
    this.estado = estado;
    this.link = link;
  }
}
