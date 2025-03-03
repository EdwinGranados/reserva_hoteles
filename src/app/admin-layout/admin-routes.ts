import { Routes } from '@angular/router';
import { HotelListComponent } from './hotel-list/hotel-list.component';
import { RoomManagementComponent } from './room-management/room-management.component';
import { ReservationsListComponent } from './reservations-list/reservations-list.component';

export const adminRoutes: Routes = [
  { path: '', redirectTo: 'hotels', pathMatch: 'full' },
  {
    path: 'hotels',
    component: HotelListComponent,
  },
  { path: 'rooms', component: RoomManagementComponent },
  { path: 'reservations', component: ReservationsListComponent },
];
