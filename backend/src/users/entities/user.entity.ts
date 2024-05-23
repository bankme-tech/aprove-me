export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export class User {
  assignorId?: string;
  role: Role;
  username: string;
  password: string;
}
