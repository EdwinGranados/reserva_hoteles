export interface Usuarios {
  userName: string;
  password: string;
  role: Role;
}

export enum Role {
  admin = '1',
  visitante = '2',
}
