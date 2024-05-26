import { Injectable } from '@nestjs/common';
import { UserDto } from '../../DTOs/user';
import { PrismaService } from '../../database/prisma.service';
import * as bcrypt from 'bcrypt';
import { UserRepo } from './user.repo';

@Injectable()
export class UserService implements UserRepo {
  constructor(private prisma: PrismaService) {}

  async createUser(body: UserDto) {
    const salt = parseInt(process.env.SALT_ROUND, 10);
    const hashingPassword = await bcrypt.hash(body.password, salt);

    const createNewUser = await this.prisma.user.create({
      data: {
        login: body.login,
        password: hashingPassword,
      },
    });

    const newUser = {
      login: createNewUser.login,
      id: createNewUser.id,
    } as any;

    return newUser;
  }

  async getUserById(id: number): Promise<UserDto> {
    const getUserById = await this.prisma.user.findUnique({
      where: { id },
    });
    return getUserById;
  }

  async getUserByLogin(login: any): Promise<UserDto> {
    try {
      const getUserByLogin = await this.prisma.user.findUnique({
        where: { login },
      });
      return getUserByLogin;
    } catch (e) {
      return e;
    }
  }

  async getUsersAll(): Promise<UserDto[]> {
    const getUsers = await this.prisma.user.findMany();
    return getUsers;
  }

  async updateUser(id: number, body: UserDto): Promise<UserDto> {
    const salt = parseInt(process.env.SALT_ROUND, 10);

    const hashingPassword = await bcrypt.hash(body.password, salt);
    const toLowerCaseLogin = body.login.toLocaleLowerCase();

    const newBody = { id, login: toLowerCaseLogin, password: hashingPassword };
    const updateUser = await this.prisma.user.update({
      where: { id },
      data: newBody,
    });
    return updateUser;
  }

  async deleteUser(id: number): Promise<{
    id: number;
    login: string;
    password: string;
  }> {
    const del = await this.prisma.user.delete({
      where: { id },
    });
    return del;
  }
}
