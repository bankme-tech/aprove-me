import { Injectable } from '@nestjs/common';
import { Payable } from '@/app/entities/payable';
import { PayableRepository } from '@/app/repositories/payable.repository';
import { AssignorRepository } from '@/app/repositories/assignor.repository';
import { AssignorNotFound } from '@/app/errors/assignor-not-found';

interface Input {
  value: number;
  emissionDate: Date;
  assignorId: string;
}

interface Output {
  newPayable: Payable;
}

@Injectable()
export class AddNewPayable {
  constructor(
    private payableRepository: PayableRepository,
    private assignorRepository: AssignorRepository,
  ) {}

  async execute(input: Input): Promise<Output> {
    const findAssignor = await this.assignorRepository.findById(
      input.assignorId,
    );

    if (!findAssignor) throw new AssignorNotFound();

    const newPayable = new Payable(input);
    this.payableRepository.create(newPayable);

    return { newPayable };
  }
}
