import { Hotel } from '../app/interfaces/hotel';
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
        price: 200,
        taxes: 18,
        location: 'Piso 1',
        enabled: true,
      },
      {
        id: 2,
        type: 'Doble',
        price: 150,
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
        taxes: 18,
        location: 'Piso 3',
        enabled: true,
      },
    ],
  },
];
