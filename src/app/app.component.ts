import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { hoteles, Reservations } from '../data/DataMock';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'reserva_hoteles';
  MockHoteles = hoteles;
  MockReservations = Reservations;
  ngOnInit(): void {
    if (!localStorage.getItem('hoteles')) {
      localStorage.setItem('hoteles', JSON.stringify(this.MockHoteles));
    }
    if (!localStorage.getItem('reservations')) {
      localStorage.setItem(
        'reservations',
        JSON.stringify(this.MockReservations)
      );
    }
  }
}
