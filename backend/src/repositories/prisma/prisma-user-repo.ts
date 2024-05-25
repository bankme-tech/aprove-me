import { Injectable } from '@nestjs/common';
import { UserDto } from '../../DTOs/user';
import { PrismaService } from '../../database/prisma.service';
import { UserRepo } from '../user-repo';
import * as bcrypt from 'bcrypt';

@Injectable()
export class prismaUserRepo implements UserRepo {
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

  async getUserByLogin(login: string): Promise<UserDto> {
    const getUserByLogin = this.prisma.user.findFirst({
      where: { login },
    });
    return getUserByLogin;
  }

  async getUsersAll(): Promise<UserDto[]> {
    const getUsers = await this.prisma.user.findMany();
    return getUsers;
  }

  async updateUser(id: number, body: UserDto): Promise<UserDto> {
    const updateUser = await this.prisma.user.update({
      where: { id },
      data: body,
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
