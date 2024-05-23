import { UserDto } from 'src/DTOs/user';

export abstract class UserRepo {
  abstract createUser(body: UserDto): Promise<UserDto>;
  abstract getUserById(id: number): Promise<UserDto>;
  abstract getUserByLogin(login: string): Promise<UserDto>;
  abstract getUsersAll(): Promise<UserDto[]>;
  abstract updateUser(id: number, body: UserDto): Promise<UserDto>;
  abstract deleteUser(id: number): Promise<void>;
}
