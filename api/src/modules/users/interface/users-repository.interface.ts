import { IUser } from './user.interface';

export interface IUserRepository {
  findByUsername(id: string): Promise<IUser>;
}
