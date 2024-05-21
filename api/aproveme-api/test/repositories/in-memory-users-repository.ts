import { UsersRepository } from "@/domain/account/application/repositories/users-repository";
import { User } from "@/domain/account/enterprise/entities/user";

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = [];

  async create(user: User): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async findByLogin(email: string): Promise<User> {
    throw new Error("Method not implemented.");
  }
}
