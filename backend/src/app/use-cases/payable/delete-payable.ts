import { PayableNotFound } from '@/app/errors/payable-not-found';
import { PayableRepository } from '@/app/repositories/payable.repository';
import { Injectable } from '@nestjs/common';

interface Input {
  payableId: string;
}

type Output = void;

@Injectable()
export class DeletePayable {
  constructor(private payableRepository: PayableRepository) {}

  async execute(input: Input): Promise<Output> {
    const findAssignor = await this.payableRepository.findById(input.payableId);

    if (!findAssignor) throw new PayableNotFound();

    await this.payableRepository.delete(input.payableId);
  }
}
