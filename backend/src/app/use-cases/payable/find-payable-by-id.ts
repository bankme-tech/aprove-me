import { Payable } from '@/app/entities/payable';
import { PayableNotFound } from '@/app/errors/payable-not-found';
import { PayableRepository } from '@/app/repositories/payable.repository';
import { Injectable } from '@nestjs/common';

interface Input {
  payableId: string;
}

interface Output {
  payable: Payable;
}

@Injectable()
export class FindPayableById {
  constructor(private payableRepository: PayableRepository) {}

  async execute(input: Input): Promise<Output> {
    const findById = await this.payableRepository.findById(input.payableId);

    if (!findById) throw new PayableNotFound();

    return { payable: findById };
  }
}
