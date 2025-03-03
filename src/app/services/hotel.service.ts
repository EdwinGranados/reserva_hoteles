import { Injectable } from '@angular/core';
import { hoteles } from '../../data/DataMock';
import { Observable, of } from 'rxjs';
import { Hotel } from '../interfaces/hotel';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  private mockHotel = hoteles

  constructor() { }

  getHotels():Observable<Hotel[]>{
    return of(this.mockHotel)
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
}
