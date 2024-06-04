import { User } from "../../enterprise/entities/user";

export abstract class UsersRepository {
  abstract create(user: User): Promise<void>;
  abstract findByLogin(login: string): Promise<User | null>;
}
