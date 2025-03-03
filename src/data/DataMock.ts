import { Hotel } from '../app/interfaces/hotel';
import { Reservation } from '../app/interfaces/reservation';
import { Usuarios, Role } from '../app/interfaces/usuarios';

export const usuarios: Usuarios[] = [
  {
    userName: 'admin.UltraGroup',
    password: 'Admin123',
    role: Role.admin,
  },
  {
    userName: 'visit.UltraGroup',
    password: 'Visit123',
    role: Role.visitante,
  },
];

export const hoteles: Hotel[] = [
  {
    id: 1,
    name: 'Hotel Mar Azul',
    location: 'Cartagena',
    enabled: true,
    rooms: [
      {
        id: 1,
        type: 'Suite',
        capacity: 5,
        price: 200,
        taxes: 18,
        location: 'Piso 1',
        enabled: true,
      },
      {
        id: 2,
        type: 'Doble',
        price: 150,
        capacity: 4,
        taxes: 18,
        location: 'Piso 2',
        enabled: true,
      },
    ],
  },
  {
    id: 2,
    name: 'Hotel Andes',
    location: 'Bogotá',
    enabled: false,
    rooms: [
      {
        id: 3,
        type: 'Individual',
        price: 100,
        capacity: 2,
        taxes: 18,
        location: 'Piso 3',
        enabled: true,
      },
    ],
  },
];

export const Reservations: Reservation[] = [
  {
    id: 1,
    hotelId: 1,
    roomId: 1,
    guest: {
      name: 'juan perez',
      birthday: new Date('1999-05-17'),
      gender: 'masculino',
      typeDocument: 'Cedula',
      document: '1233694357',
      email: 'emailfalso@gmail.com',
      phoneNumber: 123456789,
    },
    checkIn: new Date('2024-07-01'),
    checkOut: new Date('2024-07-05'),
    emergencyContact: {
      name: 'lorena perez',
      phoneNumber: 1234566987,
    },
  },
  {
    id: 2,
    hotelId: 2,
    roomId: 3,
    guest: {
      name: 'juan perez',
      birthday: new Date('1999-05-17'),
      gender: 'masculino',
      typeDocument: 'Cedula',
      document: '1233694357',
      email: 'emailfalso@gmail.com',
      phoneNumber: 123456789,
    },
    checkIn: new Date('2024-07-10'),
    checkOut: new Date('2024-07-15'),
    emergencyContact: {
      name: 'lorena perez',
      phoneNumber: 1234566987,
    },
  },
];
