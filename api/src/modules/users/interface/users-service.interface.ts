import { IUser } from './user.interface';

export interface IUsersService {
  findByUsername(username: string): Promise<IUser>;
}
