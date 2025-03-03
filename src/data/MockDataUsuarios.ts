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
