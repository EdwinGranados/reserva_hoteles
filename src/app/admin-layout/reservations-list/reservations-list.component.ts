import { Component } from '@angular/core';
import { ReservationsMod } from '../../interfaces/reservation';
import { DatePipe } from '@angular/common';
import { ReservationDetailComponent } from '../reservation-detail/reservation-detail.component';
import { ReservationService } from '../../services/reservation.service';

@Component({
  selector: 'app-reservations-list',
  standalone: true,
  imports: [DatePipe,ReservationDetailComponent],
  templateUrl: './reservations-list.component.html',
  styleUrl: './reservations-list.component.scss'
})
export class ReservationsListComponent {
  reservations: ReservationsMod[] = [];
  selectedReservation: any = null;

  constructor(private reservationService: ReservationService) {}

  ngOnInit() {
    this.loadReservations();
  }

  loadReservations() {
    this.reservationService.getReservations().subscribe({
      next:(resp)=>{
        this.reservations = resp
      }
    })
  }

  viewDetails(reservation: any) {
    this.selectedReservation = reservation;
  }
}
