import { Injectable } from '@nestjs/common';
import { Assignor } from '@prisma/client';
import { PrismaService } from 'src/config/prisma.service';
import { JwtPayload } from 'src/types/jwt-payload.types';
import { CrudStrategyService } from '../crud-strategy/crud-strategy.service';
import { UserAssignorService } from './../user-payable/user-assignor.service';
import { AssignorDto } from './dto/assignor.dto';

@Injectable()
export class AssignorService extends CrudStrategyService<
  Assignor,
  Omit<AssignorDto, 'id'>,
  Omit<AssignorDto, 'id'>
> {
  private readonly refPrisma!: PrismaService;

  constructor(
    prisma: PrismaService,
    readonly userAssignorService: UserAssignorService,
  ) {
    super(prisma, 'Assignor');
    this.refPrisma = prisma;
  }

  async create(
    data: Omit<AssignorDto, 'id'>,
    user: JwtPayload,
  ): Promise<Assignor> {
    const assignor = await this.refPrisma.assignor.create({
      data,
    });

    await this.userAssignorService.create({
      assignorId: assignor.id,
      userId: user.id,
    });

    return assignor;
  }
}
