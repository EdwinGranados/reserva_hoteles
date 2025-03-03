import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HotelService } from '../../services/hotel.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-side-bar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-side-bar.component.html',
  styleUrl: './user-side-bar.component.scss',
})
export class UserSideBarComponent implements OnInit {
  @Output() filtersApplied = new EventEmitter<any>();
  cities: string[] = [];
  checkIn: string = '';
  checkOut: string = '';
  selectedCity: string = '';
  guests: number = 1;
  dateError: boolean = false;

  constructor(private hotelSertvice: HotelService) {}

  ngOnInit(): void {
    this.hotelSertvice.getHotelsActives().subscribe({
      next: (resp) => {
        this.cities = [
          ...new Set(
            resp.map((hotel) => hotel.location).filter((city) => city)
          ),
        ].sort();
      },
    });
  }

  validateDates() {
    if (this.checkIn && this.checkOut) {
      this.dateError = new Date(this.checkIn) > new Date(this.checkOut);
    }
  }

  applyFilters() {
    this.filtersApplied.emit({
      checkIn: this.checkIn,
      checkOut: this.checkOut,
      city: this.selectedCity,
      guests: this.guests
    });
  }
}
