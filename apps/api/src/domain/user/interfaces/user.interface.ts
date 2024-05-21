import { Id } from '@domain/shared/id';
import { IPassword } from '@domain/user/interfaces/password.interface';

export interface IUser {
  readonly id: Id;
  readonly username: string;
  readonly password: IPassword;
}
