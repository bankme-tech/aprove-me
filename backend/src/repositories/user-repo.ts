import { UserDto } from 'src/DTOs/user';

export abstract class UserRepo {
  abstract createUser(body: UserDto): Promise<UserDto>;
  abstract getUserById(id: string): Promise<UserDto>;
  abstract getUserByLogin(login: string): Promise<UserDto>;
  abstract getUsers(): Promise<UserDto[]>;
  abstract updateUser(id: string, body: UserDto): Promise<UserDto>;
  abstract deleteUser(id: string): Promise<UserDto>;
}
