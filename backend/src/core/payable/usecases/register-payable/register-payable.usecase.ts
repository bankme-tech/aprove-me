import { Injectable, NotFoundException } from '@nestjs/common';
import { Payable } from '@core/payable/model';
import { UseCase } from '@core/shared/contracts/usecases';
import { PayableRepository } from '@core/payable/ports/repository';
import { AssignorRepository } from '@core/assignor/ports/repository';

type RegisterPayableInput = {
  value: number;
  assignor: string;
};

@Injectable()
export class RegisterPayableUseCase
  implements UseCase<RegisterPayableInput, Payable>
{
  constructor(
    private readonly payableRepository: PayableRepository,
    private readonly assignorRepository: AssignorRepository,
  ) {}

  async execute(input: RegisterPayableInput): Promise<Payable> {
    const { value, assignor } = input;

    const existingAssignor = await this.assignorRepository.findById(assignor);
    if (!existingAssignor) {
      throw new NotFoundException(
        'This payable can only be created for an existing assignor',
      );
    }

    const payable = Payable.create({ value, assignor });

    if (payable.containNotifications) {
      return payable;
    }

    await this.payableRepository.save(payable);

    return payable;
  }
}
