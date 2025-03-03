import { Component, OnInit } from '@angular/core';
import { Hotel } from '../../interfaces/hotel';
import { HotelService } from '../../services/hotel.service';
import { HotelFormComponent } from '../hotel-form/hotel-form.component';

@Component({
  selector: 'app-hotel-list',
  standalone: true,
  imports: [HotelFormComponent],
  templateUrl: './hotel-list.component.html',
  styleUrl: './hotel-list.component.scss',
})
export class HotelListComponent implements OnInit {
  hotels: Hotel[] = [];
  showForm = false;
  selectedHotel: Hotel | null = null;

  constructor(private hotelService: HotelService) {}

  ngOnInit(): void {
    this.loadHotels();
  }

  openHotelForm() {
    this.selectedHotel = null;
    this.showForm = true;
  }

  editHotel(hotel: Hotel) {
    this.selectedHotel = { ...hotel };
    this.showForm = true;
  }

  toggleHotel(id: number) {
    this.hotelService.toggleHotelStatus(id);
  }
  loadHotels() {
    this.hotelService.getHotels().subscribe({
      next: (resp) => {
        this.hotels = resp;
      },
    });
  }
  onSaveHotel(hotel: Hotel) {
    if (this.selectedHotel) {
      this.hotelService.updateHotel(hotel);
    } else {
      this.hotelService.addHotel(hotel);
    }
    this.loadHotels();
    this.showForm = false;
  }
}
