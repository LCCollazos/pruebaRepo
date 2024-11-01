import { Injectable } from '@angular/core';
import { Personal } from '../models/personal';

@Injectable({
  providedIn: 'root'
})
export class PersonalService {

  personal: Personal[] = []

  constructor() { }

  // Método para obtener todos los eventos
  getPersons() {
    const personString = localStorage.getItem('personal');
    if (personString !== null) {
      return JSON.parse(personString);
    } else {
      return []; // Devolver un array vacío si no hay eventos en localStorage
    }
  }

  // Método para obtener un evento por su ID
  getPersonById(id_personal: number) {
    const persons = this.getPersons();
    return persons.find((person: Personal) => person.id_personal === id_personal);
  }

  // Método para agregar un nuevo evento
  addPersonal(newPerson: Personal) {
    let persons = this.getPersons();
    newPerson.id_personal = this.generatePersonId(); // Generar un nuevo ID para el usuario
    persons.push(newPerson);
    localStorage.setItem('personal', JSON.stringify(persons));
  }

  // Método para actualizar un evento existente
  updatePersonal(updatedPersonal: Personal) {
    let persons = this.getPersons();
    const index = persons.findIndex((person: Personal) => person.id_personal === updatedPersonal.id_personal);
    if (index !== -1) {
      persons[index] = updatedPersonal;
      localStorage.setItem('personal', JSON.stringify(persons));
    }
  }

  // Método para eliminar un evento
  deletePersonal(id_personal: number) {
    let persons = this.getPersons();
    persons = persons.filter((person: Personal) => person.id_personal !== id_personal);
    localStorage.setItem('personal', JSON.stringify(persons));
  }

  // Método para generar un nuevo ID para un evento
  private generatePersonId(): number {
    const persons = this.getPersons();
    return persons.length > 0 ? Math.max(...persons.map((person: Personal) => person.id_personal)) + 1 : 1;
  }


}
