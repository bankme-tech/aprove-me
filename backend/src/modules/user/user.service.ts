import { Injectable } from '@nestjs/common';

import { User } from '@prisma/client';
import { PrismaService } from 'src/config/prisma.service';
import { CrudStrategyService } from '../crud-strategy/crud-strategy.service';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService extends CrudStrategyService<
  User,
  Omit<UserDto, 'id'>,
  Omit<UserDto, 'id'>
> {
  constructor(prisma: PrismaService) {
    super(prisma, 'User');
  }
}
