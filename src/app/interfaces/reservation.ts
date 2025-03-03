import { of } from 'rxjs';
import { Type } from '@angular/core';
import { Hotel } from './hotel';
import { Room } from './room';

export interface Reservation {
  id: number;
  hotelId: number;
  roomId: number;
  guest: Guest;
  checkIn: Date;
  checkOut: Date;
  emergencyContact:EmergencyContact
}

export interface ReservationsMod extends Reservation {
  hotel: Hotel | undefined;
  room: Room | undefined;
}

export interface Guest {
  name:string,
  birthday:Date,
  gender:string,
  typeDocument:string,
  document:string,
  email:string,
  phoneNumber:number
}

export interface EmergencyContact {name:string,phoneNumber:number}
