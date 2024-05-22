import { Id } from '../../shared';
import { IPassword } from './password.interface';

export interface IUser {
  readonly id: Id;
  readonly username: string;
  readonly password: IPassword;
}
