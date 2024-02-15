import { User as UserPrisma } from '@prisma/client';
import { randomUUID } from 'crypto';

export class User implements UserPrisma {
  created_at: Date;
  id: string;
  password: string;
  username: string;

  static create(props: Omit<User, 'id' | 'created_at'>, id?: string) {
    const user = new User();
    user.id = id ?? randomUUID();
    user.password = props.password;
    user.username = props.username;
    user.created_at = new Date();
    return user;
  }
}
