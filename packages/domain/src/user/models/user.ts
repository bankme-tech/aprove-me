import { Id } from '../../shared';
import { IUser } from '../interfaces/user.interface';
import { Password } from '../value-objects/password';

export interface IUserConstructor {
  id: Id;
  username: string;
  password: Password;
}

export class User implements IUser {
  readonly id: Id;
  readonly username: string;
  readonly password: Password;

  private constructor(user: IUser) {
    this.id = user.id;
    this.username = user.username;
    this.password = Password.fromExisting(user.password);
    Object.freeze(this);
  }

  static fromExisting(user: IUser): User {
    return new User(user);
  }

  static fromData(user: IUserConstructor): User {
    return new User({
      id: user.id,
      username: user.username,
      password: Password.fromExisting(user.password),
    });
  }

  eq(other: string | IUser): boolean {
    if (typeof other === 'string') {
      return this.id === other;
    }
    return this.id === other.id;
  }
}
