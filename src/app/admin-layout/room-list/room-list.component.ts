import { Component, Input } from '@angular/core';
import { Hotel } from '../../interfaces/hotel';
import { Room } from '../../interfaces/room';
import { HotelService } from '../../services/hotel.service';
import { RoomFormComponent } from '../room-form/room-form.component';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-room-list',
  standalone: true,
  imports: [RoomFormComponent,CurrencyPipe],
  templateUrl: './room-list.component.html',
  styleUrl: './room-list.component.scss',
})
export class RoomListComponent {
  @Input() hotel!: Hotel;
  rooms: Room[] = [];
  showForm = false;
  selectedRoom: Room | null = null;

  constructor(private hotelService: HotelService) {}

  ngOnInit() {
    this.loadRooms();
  }

  loadRooms() {
    this.rooms = this.hotelService.getRoomsByHotel(this.hotel.id);
  }

  openRoomForm() {
    this.selectedRoom = null;
    this.showForm = true;
  }

  editRoom(room: Room) {
    this.selectedRoom = { ...room };
    this.showForm = true;
  }

  toggleRoom(id: number) {
    this.hotelService.toggleRoomStatus(this.hotel.id, id);
    this.loadRooms();
  }

  onSaveRoom(room: Room) {
    if (this.selectedRoom) {
      this.hotelService.updateRoom(this.hotel.id, room);
    } else {
      this.hotelService.addRoom(this.hotel.id, room);
    }
    this.loadRooms();
    this.showForm = false;
  }

  loadRoomsParent(id:number) {
    this.rooms = this.hotelService.getRoomsByHotel(id);
  }
}
