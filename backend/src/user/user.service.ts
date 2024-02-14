import { Injectable } from '@nestjs/common';
import { User } from './user.model';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) { }

  async getUserByLogin(login: string): Promise<User> {
    return await this.prisma.user.findFirst({
      where: {
        login: login
      },
      include: {
        roles: {
          include: {
            role: true
          }
        }
      }
    });
  }
}