import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Hotel } from '../../interfaces/hotel';

@Component({
  selector: 'app-hotel-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './hotel-form.component.html',
  styleUrl: './hotel-form.component.scss'
})
export class HotelFormComponent {
  @Input() hotel: Hotel | null = null;
  @Output() saveHotel = new EventEmitter<Hotel>();
  @Output() closeForm = new EventEmitter<void>();

  hotelForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.hotelForm = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      location: ['', Validators.required],
      enabled: [true]
    });
  }

  ngOnInit() {
    if (this.hotel) {
      this.hotelForm.patchValue(this.hotel);
    }
  }

  save() {
    if (this.hotelForm.valid) {
      this.saveHotel.emit(this.hotelForm.value);
      this.close();
    }
  }

  close() {
    this.closeForm.emit();
  }
}
