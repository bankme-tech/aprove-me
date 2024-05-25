import { UUID } from 'crypto';

export class UserEntity {
  public id?: UUID;
  public login: string;
  public password: string;

  constructor(id: UUID, login: string, password: string) {
    this.id = id;
    this.login = login;
    this.password = password;
  }
}
