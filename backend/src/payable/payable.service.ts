import { Injectable } from '@nestjs/common';
import { PayableRepository } from "./repository/repository.service";
// import { PayableRepository } from './repository.service';
import { Prisma, Payable } from '@prisma/client';

@Injectable()
export class PayableService {
  constructor(private readonly payableRepository: PayableRepository) {}

  async create(data: Prisma.PayableCreateInput): Promise<Payable> {
    return this.payableRepository.create(data);
  }

  async findAll(): Promise<Payable[]> {
    return this.payableRepository.findAll();
  }

  async findOne(id: number): Promise<Payable | null> {
    return this.payableRepository.findOne(id);
  }

  async update(id: number, data: Prisma.PayableUpdateInput): Promise<Payable> {
    return this.payableRepository.update(id, data);
  }

  async remove(id: number): Promise<Payable> {
    return this.payableRepository.delete(id);
  }
}
