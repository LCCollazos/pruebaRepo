import { Injectable } from '@angular/core';
import { CancionEvento } from '../models/cancionEvento';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  song: CancionEvento[] = []

  constructor() { }

  // Método para obtener todos los eventos
  getSongs() {
    const songString = localStorage.getItem('cancionesEvent');
    if (songString !== null) {
      return JSON.parse(songString);
    } else {
      return []; // Devolver un array vacío si no hay eventos en localStorage
    }
  }

  // Método para obtener una cancion por su ID
  getSongById(id_cancion: number) {
    const songs = this.getSongs();
    return songs.find((song: CancionEvento) => song.id_cancion === id_cancion);
  }

  // Método para agregar una nueva cancion a un evento
  addSong(newSong: CancionEvento) {
    let songs = this.getSongs();
    newSong.id_cancion = this.generateSongId(); // Generar un nuevo ID para una cancion
    songs.push(newSong);
    localStorage.setItem('cancionesEvent', JSON.stringify(songs));
  }

  // Método para actualizar una cancion existente
  updateSong(updatedSong: CancionEvento) {
    let songs = this.getSongs();
    const index = songs.findIndex((song: CancionEvento) => song.id_cancion === updatedSong.id_cancion);
    if (index !== -1) {
      songs[index] = updatedSong;
      localStorage.setItem('cancionesEvent', JSON.stringify(songs));
    }
  }

  // Método para eliminar un evento
  deleteSong(id_cancion: number) {
    let songs = this.getSongs();
    songs = songs.filter((songs: CancionEvento) => songs.id_cancion !== id_cancion);
    localStorage.setItem('cancionesEvent', JSON.stringify(songs));
  }

  // Método para generar un nuevo ID para un evento
  private generateSongId(): number {
    const songs = this.getSongs();
    return songs.length > 0 ? Math.max(...songs.map((song: CancionEvento) => song.id_cancion)) + 1 : 1;
  }

  // Método para eliminar todos los detalles de eventos asociados a un id_evento específico
  deleteSongsByEventId(id_evento: number) {
    let songs = this.getSongs(); // Obtener todos los detalles de eventos

    // Filtrar la lista de detalles de eventos para excluir aquellos asociados al id_evento específico
    songs = songs.filter((song: CancionEvento) => song.id_evento !== id_evento);

    // Actualizar los detalles de eventos en el almacenamiento local
    localStorage.setItem('cancionesEvent', JSON.stringify(songs));
  }

  // Método para obtener todos los detalles de eventos filtrados por el id_evento y en formato DetalleEvento
  getSongsEventsById(id_evento: number): CancionEvento[] | null  {
    const detailEvents = this.getSongs(); // Obtener todos los detalles de eventos
    const filteredDetailEvents = detailEvents.filter((song: CancionEvento) => song.id_evento === id_evento);

    // Mapear los detalles de eventos filtrados al formato DetalleEvento
    const detalleEventos: CancionEvento[] = filteredDetailEvents.map((detalle: CancionEvento) => {
      const detalleEvento: CancionEvento = {
        id_cancion: detalle.id_cancion,
        id_evento: detalle.id_evento,
        cancion: detalle.cancion,
        bailaCancion: detalle.bailaCancion,
        instructorMontaje: detalle.instructorMontaje,
        estado: detalle.estado,
        link: detalle.link
      };
      return detalleEvento;
    });

    return detalleEventos;
  }


}
