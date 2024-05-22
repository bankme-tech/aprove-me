import { Injectable, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { PrismaService } from './../../config/prisma.service';

type UserPayable = {
  id: string;
  userId: string;
  payableId: string;
};

@UseGuards(AuthGuard)
@Injectable()
export class UserPayableService {
  constructor(private prisma: PrismaService) {}

  async create(data: Omit<UserPayable, 'id'>): Promise<UserPayable> {
    return await this.prisma.userPayable.create({ data });
  }
}
