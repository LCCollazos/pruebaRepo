import { Injectable } from '@angular/core';
import { Servicios } from '../models/servicios';

@Injectable({
  providedIn: 'root'
})

export class ServiciosVals {

  servicios: Servicios[] = []

  constructor() { }


  // Método para obtener todos los eventos
  getServicios() {
    const serviciosString = localStorage.getItem('servicios');
    if (serviciosString !== null) {
      return JSON.parse(serviciosString);
    } else {
      return []; // Devolver un array vacío si no hay eventos en localStorage
    }
  }

  // Método para agregar una nueva cancion a un evento
  addServiceVals(newService: Servicios) {
    let servicios = this.getServicios();
    newService.id_servicio = this.generateServiceId(); // Generar un nuevo ID para una cancion
    servicios.push(newService);
    localStorage.setItem('servicios', JSON.stringify(servicios));
  }

  // Método para actualizar un evento existente
  updateService(updatedService: Servicios) {
    let services = this.getServicios();
    const index = services.findIndex((service: Servicios) => service.id_servicio === updatedService.id_servicio);
    if (index !== -1) {
      services[index] = updatedService;
      localStorage.setItem('servicios', JSON.stringify(services));
    }
  }

  delelteServiceVals(id_servicio: number){
    let services = this.getServicios();
    services = services.filter((service: Servicios) => service.id_servicio !== id_servicio);
    localStorage.setItem('servicios', JSON.stringify(services));
  }

  // Método para generar un nuevo ID para un evento
  private generateServiceId(): number {
    const servicios = this.getServicios();
    return servicios.length > 0 ? Math.max(...servicios.map((servicio: Servicios) => servicio.id_servicio)) + 1 : 1;
  }


}
