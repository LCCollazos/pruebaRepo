import { Abonos } from './../models/abonos';
import { Injectable } from '@angular/core';
import { Personal } from '../models/personal';

@Injectable({
  providedIn: 'root'
})
export class AbonosService {

  abonos: Abonos[] = []

  constructor() { }

  // Método para obtener todos los eventos
  getAbonos() {
    const abonosString = localStorage.getItem('abonos');
    if (abonosString !== null) {
      return JSON.parse(abonosString);
    } else {
      return []; // Devolver un array vacío si no hay eventos en localStorage
    }
  }

  // Método para obtener un evento por su ID
  getAbonosById(id_abono: number) {
    const abonos = this.getAbonos();
    return abonos.find((abono: Abonos) => abono.id_abono === id_abono);
  }

  // Método para agregar un nuevo evento
  addAbono(newAbono: Abonos) {
    let abonos = this.getAbonos();
    abonos.id_abono = this.generateAbonoId(); // Generar un nuevo ID para el usuario
    abonos.push(newAbono);
    localStorage.setItem('abonos', JSON.stringify(abonos));
  }

  // Método para actualizar un evento existente
  updateAbono(updatedAbono: Abonos) {
    let abonos = this.getAbonos();
    const index = abonos.findIndex((abono: Abonos) => abono.id_abono === updatedAbono.id_abono);
    if (index !== -1) {
      abonos[index] = updatedAbono;
      localStorage.setItem('abonos', JSON.stringify(abonos));
    }
  }

  // Método para eliminar un evento
  deleteAbono(id_abono: number) {
    let abonos = this.getAbonos();
    abonos = abonos.filter((abono: Abonos) => abono.id_abono !== id_abono);
    localStorage.setItem('abonos', JSON.stringify(abonos));
  }

  deleteAbonosByEventId(id_evento: number) {
    let abonos = this.getAbonos(); // Obtener todos los detalles de eventos

    // Filtrar la lista de detalles de eventos para excluir aquellos asociados al id_evento específico
    abonos = abonos.filter((abono: Abonos) => abono.id_evento !== id_evento);

    // Actualizar los detalles de eventos en el almacenamiento local
    localStorage.setItem('abonos', JSON.stringify(abonos));
  }

  // Método para obtener todos los detalles de eventos filtrados por el id_evento y en formato DetalleEvento
  getAbonosEventsById(id_evento: number): Abonos[] | null  {
    const AbonosEvents = this.getAbonos(); // Obtener todos los detalles de eventos
    const filteredDetailEvents = AbonosEvents.filter((abono: Abonos) => abono.id_evento === id_evento);

    // Mapear los detalles de eventos filtrados al formato DetalleEvento
    const detalleEventos: Abonos[] = filteredDetailEvents.map((abono: Abonos) => {
      const detalleEvento: Abonos = {
        id_abono: abono.id_abono,
        id_evento: abono.id_evento,
        valor: abono.valor,
        fecha: abono.fecha,
        descripcion: abono.descripcion
      };
      return detalleEvento;
    });

    return detalleEventos;
  }

  // Método para generar un nuevo ID para un evento
  private generateAbonoId(): number {
    const abonos = this.getAbonos();
    return abonos.length > 0 ? Math.max(...abonos.map((abono: Abonos) => abono.id_abono)) + 1 : 1;
  }


}
