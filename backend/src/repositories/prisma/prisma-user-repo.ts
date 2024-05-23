import { Injectable } from '@nestjs/common';
import { UserDto } from 'src/DTOs/user';
import { PrismaService } from 'src/database/prisma.service';
import { UserRepo } from '../user-repo';

@Injectable()
export class prismaUserRepo implements UserRepo {
  constructor(private prisma: PrismaService) {}

  createUser(body: UserDto): Promise<UserDto> {
    throw new Error('Method not implemented.');
  }
  getUserById(id: string): Promise<UserDto> {
    throw new Error('Method not implemented.');
  }
  getUserByLogin(login: string): Promise<UserDto> {
    throw new Error('Method not implemented.');
  }
  getUsers(): Promise<UserDto[]> {
    throw new Error('Method not implemented.');
  }
  updateUser(id: string, body: UserDto): Promise<UserDto> {
    throw new Error('Method not implemented.');
  }
  deleteUser(id: string): Promise<UserDto> {
    throw new Error('Method not implemented.');
  }
}
