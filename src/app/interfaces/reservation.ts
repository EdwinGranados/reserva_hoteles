import { of } from 'rxjs';
import { Type } from '@angular/core';
import { Hotel } from './hotel';
import { Room } from './room';

export interface Reservation {
  id: number;
  hotelId: number;
  roomId: number;
  guestName: string;
  checkIn: Date;
  checkOut: Date;
}

export interface ReservationsMod extends Reservation {
  hotel: Hotel | undefined;
  room: Room | undefined;
}
