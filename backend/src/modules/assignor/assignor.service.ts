import { Injectable } from '@nestjs/common';
import { Assignor } from '@prisma/client';
import { PrismaService } from 'src/config/prisma.service';
import { CrudStrategyService } from '../crud-strategy/crud-strategy.service';
import { AssignorDto } from './dto/assignor.dto';

@Injectable()
export class AssignorService extends CrudStrategyService<
  Assignor,
  Omit<AssignorDto, 'id'>,
  Omit<AssignorDto, 'id'>
> {
  constructor(prisma: PrismaService) {
    super(prisma, 'Assignor');
  }
}
