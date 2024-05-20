import { Injectable } from '@nestjs/common';
// import { AssignorRepository } from './repository.service';
import { AssignorRepository } from "./repository/repository.service";
import { Prisma, Assignor } from '@prisma/client';

@Injectable()
export class AssignorService {
  constructor(private readonly assignorRepository: AssignorRepository) {}

  async create(data: Prisma.AssignorCreateInput): Promise<Assignor> {
    return this.assignorRepository.create(data);
  }

  async findAll(): Promise<Assignor[]> {
    return this.assignorRepository.findAll();
  }

  async findOne(id: number): Promise<Assignor | null> {
    return this.assignorRepository.findOne(id);
  }

  async update(id: number, data: Prisma.AssignorUpdateInput): Promise<Assignor> {
    return this.assignorRepository.update(id, data);
  }

  async remove(id: number): Promise<Assignor> {
    return this.assignorRepository.delete(id);
  }
}
