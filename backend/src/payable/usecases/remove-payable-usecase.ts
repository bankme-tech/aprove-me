import { Injectable } from '@nestjs/common';
import { IRemovePayableUseCase } from './remove-payable.usecase.interface';
import { IPayableRepository } from '../repositories/payable.repository.interface';
import { RemovePayableInputDTO } from '../dto/remove-payable.input.dto';
import { RecordNotFoundError } from 'src/persistence/errors/record-not-found.error';

@Injectable()
export class RemovePayableUseCase implements IRemovePayableUseCase {
  constructor(private readonly payableRepository: IPayableRepository) {}

  async execute(removePayableDTO: RemovePayableInputDTO): Promise<void> {
    const payable = await this.payableRepository.findById(removePayableDTO);
    if (!payable) {
      throw new RecordNotFoundError('Payable');
    }
    return this.payableRepository.remove(removePayableDTO);
  }
}
