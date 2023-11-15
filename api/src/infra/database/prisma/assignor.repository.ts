import { IAssignorRepository } from 'src/modules/assignor/interfaces/assignor.repository.interface';
import { PrismaService } from './prisma.service';
import { IAssignor } from 'src/modules/assignor/interfaces/assignor.interface';

export class AssignorRepository implements IAssignorRepository {
  constructor(private prisma: PrismaService) {}

  async create(assignor: IAssignor): Promise<IAssignor> {
    return this.prisma.assignor.create({ data: assignor });
  }
}
