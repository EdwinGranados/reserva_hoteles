import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Room } from '../../interfaces/room';

@Component({
  selector: 'app-room-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './room-form.component.html',
  styleUrl: './room-form.component.scss'
})
export class RoomFormComponent {
  @Input() room: Room | null = null;
  @Output() saveRoom = new EventEmitter<Room>();
  @Output() closeForm = new EventEmitter<void>();

  roomForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.roomForm = this.fb.group({
      id: [null],
      type: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(1)]],
      taxes: [0, [Validators.required, Validators.min(0)]],
      location: ['', Validators.required],
      enabled: [true]
    });
  }

  ngOnInit() {
    if (this.room) {
      this.roomForm.patchValue(this.room);
    }
  }

  save() {
    if (this.roomForm.valid) {
      this.saveRoom.emit(this.roomForm.value);
      this.close();
    }
  }

  close() {
    this.closeForm.emit();
  }
}
