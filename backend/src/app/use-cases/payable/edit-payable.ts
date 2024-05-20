import { Payable } from '@/app/entities/payable';
import { PayableNotFound } from '@/app/errors/payable-not-found';
import { PayableRepository } from '@/app/repositories/payable.repository';
import { Injectable } from '@nestjs/common';

interface Input {
  value: number;
  payableId: string;
  assignorId: string;
  emissionDate: Date;
}

interface Output {
  payable: Payable;
}

@Injectable()
export class EditPayable {
  constructor(private payableRepository: PayableRepository) {}

  async execute(input: Input): Promise<Output> {
    const { value, assignorId, emissionDate } = input;
    const findPayable = await this.payableRepository.findById(input.payableId);

    if (!findPayable) throw new PayableNotFound();

    findPayable.updatePayable({ value, assignorId, emissionDate });
    await this.payableRepository.edit(findPayable);

    return { payable: findPayable };
  }
}
