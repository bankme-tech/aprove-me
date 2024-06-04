import { UsersRepository } from "@/domain/account/application/repositories/users-repository";
import { User } from "@/domain/account/enterprise/entities/user";

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = [];

  async create(user: User): Promise<void> {
    this.items.push(user);
  }

  async findByLogin(login: string) {
    const user = this.items.find((item) => item.login === login);

    if (!user) return null;

    return user;
  }
}
