import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Reservation } from '../../interfaces/reservation';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RoomMod } from '../../interfaces/room';
import { ReservationService } from '../../services/reservation.service';
import { CurrencyPipe } from '@angular/common';
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reservation-form',
  standalone: true,
  imports: [ReactiveFormsModule, CurrencyPipe],
  templateUrl: './reservation-form.component.html',
  styleUrl: './reservation-form.component.scss',
})
export class ReservationFormComponent {
  @Input() room!: RoomMod;
  @Input() chekinDates!: any;
  @Output() closeForm = new EventEmitter<void>();

  reservationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private reservationService: ReservationService
  ) {
    this.reservationForm = this.fb.group({
      guestName: ['', Validators.required],
      guestDob: ['', Validators.required],
      guestGender: ['', Validators.required],
      guestDocumentType: ['', Validators.required],
      guestDocumentNumber: ['', Validators.required],
      guestEmail: ['', [Validators.required, Validators.email]],
      guestPhone: ['', Validators.required],
      emergencyName: ['', Validators.required],
      emergencyPhone: ['', Validators.required],
      checkIn: ['', Validators.required],
      checkOut: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.reservationForm.controls['checkIn'].setValue(this.chekinDates.In);
    this.reservationForm.controls['checkOut'].setValue(this.chekinDates.Out);
  }

  save() {
    if (this.reservationForm.valid) {
      const reservation: Reservation = {
        id: 0,
        hotelId: this.room.hotelId,
        roomId: this.room.id,
        guest: {
          name: this.reservationForm.value.guestName,
          birthday: new Date(this.reservationForm.value.guestDob),
          gender: this.reservationForm.value.guestGender,
          typeDocument: this.reservationForm.value.guestDocumentType,
          document: this.reservationForm.value.guestDocumentNumber,
          email: this.reservationForm.value.guestEmail,
          phoneNumber: this.reservationForm.value.guestPhone,
        },
        checkIn: new Date(this.reservationForm.value.checkIn),
        checkOut: new Date(this.reservationForm.value.checkOut),
        emergencyContact: {
          name: this.reservationForm.value.emergencyName,
          phoneNumber: this.reservationForm.value.emergencyPhone,
        },
      };

      this.reservationService.addReservation(reservation).subscribe((resp) => {
        const { guest } = reservation;
        const emailParamns = {
          guestName: guest.name,
          hotelName: this.room.hotelName,
          checkIn: reservation.checkIn,
          checkOut: reservation.checkOut,
          guestEmail: guest.email,
        };

        emailjs
          .send(
            'service_rgljfrh',
            'template_rz7tww9',
            emailParamns,
            'lrzsY7SD4IcISkVJU'
          )
          .then(() => {
            Swal.fire({
              title: 'Reserva Exitosa',
              text: 'Su reserva ha sido creada exitosamente. Recibirá un correo con la información.',
              icon: 'success',
              confirmButtonText: 'Aceptar',
            }).then(() => {
              this.close();
            });
          })
          .catch((err) => {
            console.error('Error al enviar el correo:', err);
            Swal.fire({
              title: 'Error',
              text: 'Hubo un problema al enviar el correo de confirmación. Intente nuevamente.',
              icon: 'error',
              confirmButtonText: 'Aceptar',
            });
          });
      });
    }
  }

  close() {
    this.closeForm.emit();
  }
}
