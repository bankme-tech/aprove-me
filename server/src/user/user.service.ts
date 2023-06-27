import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import dbConnection from 'src/config/database/client';

@Injectable()
export class UserService {
  async findByUsername(username: string): Promise<User> {
    return dbConnection.user.findFirst({ where: { username } });
  }
}
