import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReservationsMod } from '../../interfaces/reservation';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-reservation-detail',
  standalone: true,
  imports: [DatePipe,CurrencyPipe],
  templateUrl: './reservation-detail.component.html',
  styleUrl: './reservation-detail.component.scss'
})
export class ReservationDetailComponent {
  @Input() reservation!: ReservationsMod;
  @Output() closeDetail = new EventEmitter<void>();

  close() {
    this.closeDetail.emit();
  }
  calculateTotal(reservation: any): number {
    if (!reservation.room) return 0;
    const days = (new Date(reservation.checkOut).getTime() - new Date(reservation.checkIn).getTime()) / (1000 * 60 * 60 * 24);
    return days * reservation.room.price;
  }
}
