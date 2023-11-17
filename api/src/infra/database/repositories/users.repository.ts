import { IUserRepository } from '../../../modules/users/interface/users-repository.interface';
import { PrismaService } from '../prisma/prisma.service';
import { IUser } from '../../../modules/users/interface/user.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersRepository implements IUserRepository {
  constructor(private prisma: PrismaService) {}

  async findByUsername(username: string): Promise<IUser> {
    return this.prisma.user.findUnique({
      where: {
        username,
      },
    });
  }
}
