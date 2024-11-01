export class Personal {
  id_personal: number;
  nombre: string;
  rol: string;

  constructor(
    id_personal: number,
    nombre: string,
    rol: string
  ) {
    this.id_personal = id_personal;
    this.nombre = nombre;
    this.rol = rol;
  }
}
