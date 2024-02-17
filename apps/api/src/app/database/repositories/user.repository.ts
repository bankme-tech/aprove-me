import { User } from '@prisma/client';

export abstract class UserRepository {
  abstract findById(id: string): Promise<User | null>;
  abstract findByUsername(username: string): Promise<User | null>;
  abstract create(data: User): Promise<User>;
}
