import { Component, ViewChild } from '@angular/core';
import { Hotel } from '../../interfaces/hotel';
import { HotelService } from '../../services/hotel.service';
import { FormsModule } from '@angular/forms';
import { RoomListComponent } from '../room-list/room-list.component';

@Component({
  selector: 'app-room-management',
  standalone: true,
  imports: [FormsModule, RoomListComponent],
  templateUrl: './room-management.component.html',
  styleUrl: './room-management.component.scss',
})
export class RoomManagementComponent {
  hotels: Hotel[] = [];
  selectedHotel: Hotel | null = null;
  @ViewChild(RoomListComponent) roomListComponent!: RoomListComponent;


  constructor(private hotelService: HotelService) {}

  ngOnInit() {
    this.hotelService.getHotels().subscribe((data) => {
      this.hotels = data;
    });
  }

  loadRooms(hotel:Hotel) {
    this.roomListComponent.loadRoomsParent(hotel.id)
  }
}
