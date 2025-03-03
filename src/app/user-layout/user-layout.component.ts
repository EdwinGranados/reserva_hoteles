import { Component } from '@angular/core';
import { UserSideBarComponent } from './user-side-bar/user-side-bar.component';
import { Router, RouterOutlet } from '@angular/router';
import { Hotel } from '../interfaces/hotel';
import { HotelService } from '../services/hotel.service';
import { CurrencyPipe } from '@angular/common';
import { Reservation } from '../interfaces/reservation';
import { ReservationService } from '../services/reservation.service';
import { RoomMod } from '../interfaces/room';
import { ReservationFormComponent } from './reservation-form/reservation-form.component';

@Component({
  selector: 'app-user-layout',
  standalone: true,
  imports: [UserSideBarComponent, CurrencyPipe,ReservationFormComponent],
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.scss',
})
export class UserLayoutComponent {
  hotels: Hotel[] = [];
  filteredRooms: any[] = [];
  reservations: Reservation[] = [];
  selectedRoom: RoomMod|null = null;
  filtersDates: any = {In:'',Out:''}

  constructor(
    private hotelService: HotelService,
    private reservationService: ReservationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadRooms();
  }

  loadRooms() {
    this.hotelService.getHotelsActives().subscribe((data) => {
      this.hotels = data;
      this.filteredRooms = this.getAllRooms();
    });
    this.reservationService.getReservations().subscribe((resp) => {
      this.reservations = resp;
    });
  }

  getAllRooms() {
    return this.hotels.flatMap((hotel) =>
      hotel.rooms.map((room) => ({ ...room, hotelName: hotel.name,hotelId:hotel.id }))
    );
  }

  isRoomAvailable(room: any, checkIn: string, checkOut: string): boolean {
    const checkInDate = new Date(checkIn).getTime();
    const checkOutDate = new Date(checkOut).getTime();

    return !this.reservations.some(
      (reservation) =>
        reservation.roomId === room.id &&
        reservation.hotelId ===
          this.hotels.find((h) => h.name === room.hotelName)?.id &&
        new Date(reservation.checkIn).getTime() < checkOutDate &&
        new Date(reservation.checkOut).getTime() > checkInDate
    );
  }

  applyFilters(filters: any) {
    this.filtersDates = {In:filters.checkIn,Out:filters.checkOut}
    this.filteredRooms = this.getAllRooms().filter(
      (room) =>
        (!filters.city ||
          this.hotels.find((h) => h.name === room.hotelName)?.location ===
            filters.city) &&
        (!filters.guests || room.capacity >= filters.guests) &&
        (!filters.checkIn ||
          !filters.checkOut ||
          this.isRoomAvailable(room, filters.checkIn, filters.checkOut))
    );
  }

  openReservationForm(room: RoomMod) {
    this.selectedRoom = room;
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
