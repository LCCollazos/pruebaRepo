import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  user: Usuario[] = []

  constructor() { }



  // Método para obtener todos los usuarios
  getUsers() {
    const usersString = localStorage.getItem('usuarios');
    if (usersString !== null) {
      return JSON.parse(usersString);
    } else {
      return []; // Devolver un array vacío si no hay usuarios en localStorage
    }
  }

  // Método para obtener un usuario por su ID
  getUserById(userId: number) {
    const users = this.getUsers();
    return users.find((user: Usuario) => user.id === userId);
  }

  // Método para agregar un nuevo usuario
  addUser(newUser: Usuario) {
    let users = this.getUsers();
    newUser.id = this.generateUserId(); // Generar un nuevo ID para el usuario
    users.push(newUser);
    localStorage.setItem('usuarios', JSON.stringify(users));
  }

  // Método para actualizar un usuario existente
  updateUser(updatedUser: Usuario) {
    let users = this.getUsers();
    const index = users.findIndex((user: Usuario) => user.id === updatedUser.id);
    if (index !== -1) {
      users[index] = updatedUser;
      localStorage.setItem('usuarios', JSON.stringify(users));
    }
  }

  // Método para eliminar un usuario
  deleteUser(userId: number) {
    let users = this.getUsers();
    users = users.filter((user: Usuario) => user.id !== userId);
    localStorage.setItem('usuarios', JSON.stringify(users));
  }

  // Método para generar un nuevo ID para un usuario
  private generateUserId(): number {
    const users = this.getUsers();
    return users.length > 0 ? Math.max(...users.map((user: Usuario) => user.id)) + 1 : 1;
  }



}
