export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export class User {
  assignorId: number;
  role: Role;
  username: string;
  password: string;
}
