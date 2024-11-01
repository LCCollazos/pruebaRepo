import { Injectable } from '@angular/core';
import { CancionEvento } from '../models/cancionEvento';
import { Protocolo } from '../models/protocolo';

@Injectable({
  providedIn: 'root'
})
export class ProtocoloService {

  Protocolo: Protocolo[] = []

  constructor() { }

  // Método para obtener todos los eventos
  getProtocolo() {
    const protocoloString = localStorage.getItem('protocoloEvento');
    if (protocoloString !== null) {
      return JSON.parse(protocoloString);
    } else {
      return []; // Devolver un array vacío si no hay eventos en localStorage
    }
  }

  // Método para obtener un evento por su ID
  getProtocoloByType(type: string) {
    const protocolos = this.getProtocolo();
    return protocolos.find((protocolo: Protocolo) => protocolo.tipo === type);
  }

  // Método para obtener un evento por su ID
  getProtocoloByID(id_protocolo: number) {
    const protocolos = this.getProtocolo();
    return protocolos.find((protocolo: Protocolo) => protocolo.id_protocolo === id_protocolo);
  }

  // Método para agregar una nueva cancion a un evento
  addProtocolo(newProtocolo: Protocolo) {
    let protocolo = this.getProtocolo();
    newProtocolo.id_protocolo = this.generateProtocoloId(); // Generar un nuevo ID para una cancion
    protocolo.push(newProtocolo);
    localStorage.setItem('protocoloEvento', JSON.stringify(protocolo));
  }

  // Método para actualizar una cancion existente
  updateProtocolo(updatedProtocolo: Protocolo) {
    let protocolos = this.getProtocolo();
    const index = protocolos.findIndex((protocolo: Protocolo) => protocolo.id_protocolo === updatedProtocolo.id_protocolo);
    if (index !== -1) {
      protocolos[index] = updatedProtocolo;
      localStorage.setItem('protocoloEvento', JSON.stringify(protocolos));
    }
  }

  // Método para eliminar un evento
  deleteProtocolo(id_protocolo: number) {
    let protocolos = this.getProtocolo();
    protocolos = protocolos.filter((protocolos: Protocolo) => protocolos.id_protocolo !== id_protocolo);
    localStorage.setItem('protocoloEvento', JSON.stringify(protocolos));
  }

  // Método para generar un nuevo ID para un evento
  private generateProtocoloId(): number {
    const protocolos = this.getProtocolo();
    return protocolos.length > 0 ? Math.max(...protocolos.map((protocolo: Protocolo) => protocolo.id_protocolo)) + 1 : 1;
  }

  getProtocoloEventById(id_evento: number): Protocolo | null {
    const detailProtocolo = this.getProtocolo(); // Obtener todos los detalles de eventos
    const filteredProtocoloEvents = detailProtocolo.filter((protocolo: Protocolo) => protocolo.id_evento === id_evento);

    // Si hay eventos filtrados, devuelve el primero
    if (filteredProtocoloEvents.length > 0) {
      return filteredProtocoloEvents[0];
    } else {
      return null; // No se encontraron eventos con el id_evento especificado
    }
  }

  // Método para obtener todos los eventos
  getProtocoloEstandar() {
    const protocoloString = localStorage.getItem('protocolo');
    if (protocoloString !== null) {
      return JSON.parse(protocoloString);
    } else {
      return []; // Devolver un array vacío si no hay eventos en localStorage
    }
  }

  // Método para agregar una nueva cancion a un evento
  saveProtocolo(protocoloEstandar: Protocolo) {
    localStorage.setItem('protocolo', JSON.stringify(protocoloEstandar));
  }

  // Método para eliminar todos los detalles de eventos asociados a un id_evento específico
  deleteProtocoloByEventId(id_evento: number) {
    let protocolo = this.getProtocolo(); // Obtener todos los detalles de eventos

    // Filtrar la lista de detalles de eventos para excluir aquellos asociados al id_evento específico
    protocolo = protocolo.filter((protoc: Protocolo) => protoc.id_evento !== id_evento);

    // Actualizar los detalles de eventos en el almacenamiento local
    localStorage.setItem('protocoloEvento', JSON.stringify(protocolo));
  }




}
