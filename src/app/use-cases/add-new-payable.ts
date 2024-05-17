import { Injectable } from '@nestjs/common';
import { Payable } from '@/app/entities/payable';
import { PayableRepository } from '@/app/repositories/payable.repository';

interface Input {
  value: number;
  emissionDate: Date;
}

interface Output {
  newPayable: Payable;
}

@Injectable()
export class AddNewPayable {
  constructor(private payableRepository: PayableRepository) {}

  async execute(input: Input): Promise<Output> {
    const newPayable = new Payable(input);
    this.payableRepository.create(newPayable);

    return { newPayable };
  }
}
