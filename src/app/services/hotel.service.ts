import { Injectable } from '@angular/core';
import { hoteles } from '../../data/DataMock';
import { Observable, of } from 'rxjs';
import { Hotel } from '../interfaces/hotel';
import { Room } from '../interfaces/room';

@Injectable({
  providedIn: 'root',
})
export class HotelService {
  private mockHotel: Hotel[] = JSON.parse(
    localStorage.getItem('hoteles') || '[]'
  );

  constructor() {}

  getHotels(): Observable<Hotel[]> {
    return of(this.mockHotel);
  }

  getHotelsActives(): Observable<Hotel[]> {
    return of(this.mockHotel.filter(hotel=>hotel.enabled));
  }

  getHotelById(id: number): Hotel | undefined {
    return this.mockHotel.find((hotel) => hotel.id === id);
  }

  toggleHotelStatus(id: number): void {
    const hotel = this.mockHotel.find((hotel) => hotel.id === id);
    if (hotel) hotel.enabled = !hotel.enabled;
    localStorage.setItem('hoteles', JSON.stringify(this.mockHotel))
    this.mockHotel = JSON.parse(localStorage.getItem('hoteles')||'[]')
  }

  addHotel(hotel: Hotel): void {
    const newHotel = { ...hotel, id: this.mockHotel.length + 1, rooms: [] };
    this.mockHotel.push(newHotel);
    localStorage.setItem('hoteles', JSON.stringify(this.mockHotel));
    this.mockHotel = JSON.parse(localStorage.getItem('hoteles') || '[]');
  }

  updateHotel(updatedHotel: Hotel): void {
    const index = this.mockHotel.findIndex((h) => h.id === updatedHotel.id);
    if (index !== -1) {
      this.mockHotel[index] = updatedHotel;
      localStorage.setItem('hoteles', JSON.stringify(this.mockHotel));
      this.mockHotel = JSON.parse(localStorage.getItem('hoteles') || '[]');
    }
  }

  //Rooms
  getRoomsByHotel(hotelId: number): Room[] {
    return this.mockHotel.find((h) => h.id === hotelId)?.rooms || [];
  }

  addRoom(hotelId: number, room: Room): void {
    const hotel = this.mockHotel.find((h) => h.id === hotelId);
    if (hotel) {
      room.id = hotel.rooms.length
        ? Math.max(...hotel.rooms.map((r) => r.id)) + 1
        : 1;
      hotel.rooms.push(room);
    }
    localStorage.setItem('hoteles', JSON.stringify(this.mockHotel));
    this.mockHotel = JSON.parse(localStorage.getItem('hoteles') || '[]');
  }

  updateRoom(hotelId: number, updatedRoom: Room): void {
    const hotel = this.mockHotel.find((h) => h.id === hotelId);
    if (hotel) {
      const index = hotel.rooms.findIndex((r) => r.id === updatedRoom.id);
      if (index !== -1) {
        hotel.rooms[index] = updatedRoom;
      }
    }
    localStorage.setItem('hoteles', JSON.stringify(this.mockHotel))
    this.mockHotel = JSON.parse(localStorage.getItem('hoteles')||'[]')
  }

  toggleRoomStatus(hotelId: number, roomId: number): void {
    const hotel = this.mockHotel.find((h) => h.id === hotelId);
    const room = hotel?.rooms.find((r) => r.id === roomId);
    if (room) room.enabled = !room.enabled;
    localStorage.setItem('hoteles', JSON.stringify(this.mockHotel))
    this.mockHotel = JSON.parse(localStorage.getItem('hoteles')||'[]')
  }
}
