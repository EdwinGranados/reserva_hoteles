import { Injectable } from '@angular/core';
import { hoteles } from '../../data/DataMock';
import { Observable, of } from 'rxjs';
import { Hotel } from '../interfaces/hotel';
import { Room } from '../interfaces/room';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  private mockHotel = hoteles

  constructor() { }

  getHotels():Observable<Hotel[]>{
    return of(this.mockHotel)
  }

  getHotelById(id:number):Hotel|undefined{
    return this.mockHotel.find(hotel=>hotel.id === id)
  }

  toggleHotelStatus(id:number):void{
    const hotel = this.mockHotel.find(hotel=>hotel.id === id);
    if(hotel) hotel.enabled = !hotel.enabled
  }

  addHotel(hotel: Hotel): void {
    const newHotel = { ...hotel, id: this.mockHotel.length + 1, rooms: [] };
    this.mockHotel.push(newHotel);
  }

  updateHotel(updatedHotel: Hotel): void {
    const index = this.mockHotel.findIndex(h => h.id === updatedHotel.id);
    if (index !== -1) {
      this.mockHotel[index] = updatedHotel;
    }
  }

  //Rooms
  getRoomsByHotel(hotelId: number): Room[] {
    return this.mockHotel.find(h => h.id === hotelId)?.rooms || [];
  }

  addRoom(hotelId: number, room: Room): void {
    const hotel = this.mockHotel.find(h => h.id === hotelId);
    if (hotel) {
      room.id = hotel.rooms.length ? Math.max(...hotel.rooms.map(r => r.id)) + 1 : 1;
      hotel.rooms.push(room);
    }
  }

  updateRoom(hotelId: number, updatedRoom: Room): void {
    const hotel = this.mockHotel.find(h => h.id === hotelId);
    if (hotel) {
      const index = hotel.rooms.findIndex(r => r.id === updatedRoom.id);
      if (index !== -1) {
        hotel.rooms[index] = updatedRoom;
      }
    }
  }

  toggleRoomStatus(hotelId: number, roomId: number): void {
    const hotel = this.mockHotel.find(h => h.id === hotelId);
    const room = hotel?.rooms.find(r => r.id === roomId);
    if (room) room.enabled = !room.enabled;
  }
}
