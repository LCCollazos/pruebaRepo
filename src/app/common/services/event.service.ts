import { DetalleEventoService } from './detalle-evento.service';
import { SongService } from './song.service';
import { Injectable, inject } from '@angular/core';
import { Evento } from '../models/evento';
import { DetalleEvento } from '../models/detalleEvento';
import { ProtocoloService } from './protocolo.service';
import { Abonos } from '../models/abonos';
import { AbonosService } from './abonos.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  songService: SongService = inject(SongService)
  detalleEventoService: DetalleEventoService = inject(DetalleEventoService)
  protocoloService: ProtocoloService = inject(ProtocoloService)
  abonoService: AbonosService = inject(AbonosService)

  event: Evento[] = []

  constructor() { }

  // Método para obtener todos los eventos
  getEvents() {
    const eventString = localStorage.getItem('evento');
    if (eventString !== null) {
      const events: Evento[] = JSON.parse(eventString);
      return this.sortEventsByDateTime(events);
    } else {
      return []; // Devolver un array vacío si no hay eventos en localStorage
    }
  }

  // Método para obtener todos los eventos
  getEventsReport() {
    const personString = localStorage.getItem('evento');
    if (personString !== null) {
      return JSON.parse(personString);
    } else {
      return []; // Devolver un array vacío si no hay eventos en localStorage
    }
  }

  sortEventsByDateTime(events: Evento[]): Evento[] {
    return events.sort((a, b) => {
      // Expresión regular para extraer los componentes de la fecha y la hora en formato año-mes-día
      const dateRegex = /(\d{4})-(\d{2})-(\d{2})/;
  
      // Extraer los componentes de fecha y hora de los eventos a y b
      const matchA = a.fecha_evento.match(dateRegex);
      const matchB = b.fecha_evento.match(dateRegex);
  
      // Manejar el caso donde match retorna null
      if (!matchA || !matchB) {
        throw new Error("Formato de fecha no válido");
      }
  
      // Asignar los componentes extraídos en el orden correcto: [año, mes, día, hora, minuto]
      const [, yearA, monthA, dayA, hourA, minuteA] = matchA;
      const [, yearB, monthB, dayB, hourB, minuteB] = matchB;
  
      // Construir objetos Date a partir de los componentes extraídos
      const dateA = new Date(Number(yearA), Number(monthA) - 1, Number(dayA), Number(hourA), Number(minuteA));
      const dateB = new Date(Number(yearB), Number(monthB) - 1, Number(dayB), Number(hourB), Number(minuteB));
  
      // Comparar las fechas
      return dateA.getTime() - dateB.getTime();
    });
  }
  

  // Método para obtener un evento por su ID
  getEventById(id_evento: number) {
    const events = this.getEvents();
    return events.find((event: Evento) => event.id_evento === id_evento);
  }

  // Método para agregar un nuevo evento
  addEvent(newEvent: Evento) {
    let events = this.getEvents();
    newEvent.id_evento = this.generateEventId(); // Generar un nuevo ID para el usuario
    events.push(newEvent);
    localStorage.setItem('evento', JSON.stringify(events));
  }

  // Método para actualizar un evento existente
  updateEvent(updatedEvent: Evento) {
    let events = this.getEvents();
    const index = events.findIndex((event: Evento) => event.id_evento === updatedEvent.id_evento);
    if (index !== -1) {
      events[index] = updatedEvent;
      localStorage.setItem('evento', JSON.stringify(events));
    }
  }

  // Método para eliminar un evento
  deleteEvent(id_evento: number) {
    this.songService.deleteSongsByEventId(id_evento)
    this.protocoloService.deleteProtocoloByEventId(id_evento)
    this.detalleEventoService.deleteDetailsEventsByEventId(id_evento)
    this.abonoService.deleteAbonosByEventId(id_evento)

    let events = this.getEvents();
    events = events.filter((event: Evento) => event.id_evento !== id_evento);
    localStorage.setItem('evento', JSON.stringify(events));
  }


  getEventsByState(status: string): Evento[] {
    const events = this.getEvents();

    // Filtrar y mapear los eventos al formato Evento
    const eventsBySecondState: Evento[] = events
      .filter((event: Evento) => event.estado === status)
      .map((event: Evento) => ({ ...event } as Evento));

    return eventsBySecondState;
  }


  filterEvents(month: number, date: number): Evento[] {
    return this.getEventsReport().filter((event: any) => {
      const eventDate = new Date(event.fecha_evento);
      return eventDate.getMonth() + 1 === month && eventDate.getDate() === date;
    });
  }



  // Método para generar un nuevo ID para un evento
  generateEventId(): number {
    const events = this.getEvents();
    return events.length > 0 ? Math.max(...events.map((event: Evento) => event.id_evento)) + 1 : 1;
  }


}
