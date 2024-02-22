import { User } from '@prisma/client';

export default abstract class UserRepository {
  abstract findByLogin(login: string): Promise<User>;
}
