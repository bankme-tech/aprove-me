import { Injectable } from '@nestjs/common';
import { IUpdatePayableUseCase } from './update-payable.usecase.interface';
import { IPayableRepository } from '../repositories/payable.repository.interface';
import { UpdatePayableInputDTO } from '../dto/update-payable.input.dto';
import { PayableEntity } from '../entities/payable.entity';
import { RecordNotFoundError } from 'src/persistence/errors/record-not-found.error';
import { IAssignorRepository } from 'src/assignor/repositories/assignor.repository.interface';

@Injectable()
export class UpdatePayableUseCase implements IUpdatePayableUseCase {
  constructor(
    private readonly assignorRepository: IAssignorRepository,
    private readonly payableRepository: IPayableRepository,
  ) {}

  async execute(
    updatePayableDTO: UpdatePayableInputDTO,
  ): Promise<PayableEntity> {
    const assignor = await this.assignorRepository.findById(
      updatePayableDTO.assignorId,
    );

    if (!assignor) {
      throw new RecordNotFoundError('Assignor');
    }

    const payable = await this.payableRepository.findById({
      id: updatePayableDTO.id,
    });

    if (!payable) {
      throw new RecordNotFoundError('Payable');
    }
    return this.payableRepository.update(updatePayableDTO);
  }
}
