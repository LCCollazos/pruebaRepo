import { Injectable } from '@angular/core';
import { DetalleEvento } from '../models/detalleEvento';
import { Evento } from '../models/evento';

@Injectable({
  providedIn: 'root'
})
export class DetalleEventoService {

  detalleEvento: DetalleEvento[] = []

  constructor() { }

  // Método para obtener todos los eventos
  private getDetailEvents() {
    const detailString = localStorage.getItem('detalleEvento');
    if (detailString !== null) {
      return JSON.parse(detailString);
    } else {
      return []; // Devolver un array vacío si no hay eventos en localStorage
    }
  }

  // Método para obtener todos los detalles de eventos filtrados por el id_evento y en formato DetalleEvento
  getDetailEventsById(id_evento: number): DetalleEvento[] | null  {
    const detailEvents = this.getDetailEvents(); // Obtener todos los detalles de eventos
    const filteredDetailEvents = detailEvents.filter((detalle: DetalleEvento) => detalle.id_evento === id_evento);

    // Mapear los detalles de eventos filtrados al formato DetalleEvento
    const detalleEventos: DetalleEvento[] = filteredDetailEvents.map((detalle: DetalleEvento) => {
      const detalleEvento: DetalleEvento = {
        id_detalle_evento: detalle.id_detalle_evento,
        id_evento: detalle.id_evento,
        servicioContratado: detalle.servicioContratado,
        cantidad: detalle.cantidad,
        valor: detalle.valor
      };
      return detalleEvento;
    });

    return detalleEventos;
  }

  // Método para obtener un evento por su ID
  getDetailEventByIdDetalleEvento(id_detalle_evento: number) {
    const details = this.getDetailEvents();
    return details.find((detail: DetalleEvento) => detail.id_detalle_evento === id_detalle_evento);
  }

  // Método para agregar un nuevo evento
  addDetailEvent(newDetailEvent: DetalleEvento) {
    let details = this.getDetailEvents();
    newDetailEvent.id_detalle_evento = this.generateDetailEventId(); // Generar un nuevo ID para el usuario
    details.push(newDetailEvent);
    localStorage.setItem('detalleEvento', JSON.stringify(details));
  }

  // Método para actualizar un evento existente
  updateDetailEvent(updateDetailEvent: DetalleEvento) {
    let details = this.getDetailEvents();
    const index = details.findIndex((detail: DetalleEvento) => detail.id_detalle_evento === updateDetailEvent.id_detalle_evento);
    if (index !== -1) {
      details[index] = updateDetailEvent;
      localStorage.setItem('detalleEvento', JSON.stringify(details));
    }
  }

  // Método para eliminar un evento
  deleteDetailsEvent(id_detalle_evento: number) {
    let details = this.getDetailEvents();
    details = details.filter((detail: DetalleEvento) => detail.id_detalle_evento !== id_detalle_evento);
    localStorage.setItem('detalleEvento', JSON.stringify(details));
  }

  // Método para eliminar todos los detalles de eventos asociados a un id_evento específico
  deleteDetailsEventsByEventId(id_evento: number) {
    let details = this.getDetailEvents(); // Obtener todos los detalles de eventos

    // Filtrar la lista de detalles de eventos para excluir aquellos asociados al id_evento específico
    details = details.filter((detail: DetalleEvento) => detail.id_evento !== id_evento);

    // Actualizar los detalles de eventos en el almacenamiento local
    localStorage.setItem('detalleEvento', JSON.stringify(details));
  }


  // Método para generar un nuevo ID para un evento
  private generateDetailEventId(): number {
    const details = this.getDetailEvents();
    return details.length > 0 ? Math.max(...details.map((detail: DetalleEvento) => detail.id_detalle_evento)) + 1 : 1;
  }




}
