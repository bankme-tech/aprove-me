import { Injectable, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { PrismaService } from './../../config/prisma.service';
import { UserAssignorDto } from './dto/user-assignor.dto';

@UseGuards(AuthGuard)
@Injectable()
export class UserAssignorService {
  constructor(private prisma: PrismaService) {}

  async create(data: Omit<UserAssignorDto, 'id'>) {
    return await this.prisma.userAssignor.create({ data });
  }
}
