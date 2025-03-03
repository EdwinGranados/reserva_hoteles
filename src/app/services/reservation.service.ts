import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Reservation, ReservationsMod } from '../interfaces/reservation';
import { HotelService } from './hotel.service';
import { Reservations } from '../../data/DataMock';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private mockReservations: Reservation[] =  Reservations

  constructor(private hotelService: HotelService) {}

  getReservations(): Observable<ReservationsMod[]> {
    return of(this.mockReservations.map(reservation => {
      const hotel = this.hotelService.getHotelById(reservation.hotelId);
      const room = hotel?.rooms.find(r => r.id === reservation.roomId);
      return { ...reservation, hotel, room };
    }));
  }

  getReservationById(id: number): Observable<any> {
    const reservation = this.mockReservations.find(r => r.id === id);
    if (reservation) {
      const hotel = this.hotelService.getHotelById(reservation.hotelId);
      const room = hotel?.rooms.find(r => r.id === reservation.roomId);
      return of({ ...reservation, hotel, room });
    }
    return of(null);
  }

  addReservation(reservation: Reservation): void {
    reservation.id = this.mockReservations.length + 1;
    this.mockReservations.push(reservation);
  }

  cancelReservation(id: number): void {
    this.mockReservations = this.mockReservations.filter(r => r.id !== id);
  }
}

