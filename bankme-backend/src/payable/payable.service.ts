import { Injectable } from '@nestjs/common';
import { CreatePayableDto, UpdatePayableDto } from './dto/payable.dto';
import { PayableRepository } from './payable.repository';

@Injectable()
export class PayableService {
  constructor(private readonly repository: PayableRepository) {}

  async getPayableById(id: string) {
    const payable = await this.repository.findById(id);
    return payable;
  }

  async createPayable(dto: CreatePayableDto) {
    const createdPayable = await this.repository.create(dto);
    return createdPayable;
  }

  async updatePayable(id: string, dto: UpdatePayableDto) {
    const updatedPayable = await this.repository.update(id, dto);
    return updatedPayable;
  }

  async deletePayable(id: string) {
    await this.repository.delete(id);
  }
}
