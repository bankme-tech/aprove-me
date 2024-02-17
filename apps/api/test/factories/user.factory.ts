import { User } from '@prisma/client';
import { randomUUID } from 'crypto';

type Override = Partial<User>;

export function makeUser(override?: Override): User {
  return {
    id: randomUUID(),
    username: 'john_doe',
    password: '12345678',
    createdAt: new Date(),
    updatedAt: new Date(),
    ...override,
  };
}
