import { Injectable } from '@nestjs/common';
import { UserDto } from 'src/DTOs/user';
import { PrismaService } from '../../database/prisma.service';
import { UserRepo } from '../user-repo';

@Injectable()
export class prismaUserRepo implements UserRepo {
  constructor(private prisma: PrismaService) {}

  createUser(body: UserDto): Promise<UserDto> {
    const createNewUser = this.prisma.user.create({
      data: body,
    });
    return createNewUser;
  }

  getUserById(id: number): Promise<UserDto> {
    const getUserById = this.prisma.user.findUnique({
      where: { id },
    });
    return getUserById;
  }

  getUserByLogin(login: string): Promise<UserDto> {
    const getUserByLogin = this.prisma.user.findFirst({
      where: { login },
    });
    return getUserByLogin;
  }

  getUsersAll(): Promise<UserDto[]> {
    const getUsers = this.prisma.user.findMany();
    return getUsers;
  }

  updateUser(id: number, body: UserDto): Promise<UserDto> {
    const updateUser = this.prisma.user.update({
      where: { id },
      data: body,
    });
    return updateUser;
  }

  deleteUser(id: number): Promise<{
    id: number;
    login: string;
    password: string;
  }> {
    const del = this.prisma.user.delete({
      where: { id },
    });
    return del;
  }
}
