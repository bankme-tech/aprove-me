import { Injectable } from '@nestjs/common';
import { IRemovePayableUseCase } from './remove-payable.usecase.interface';
import { IPayableRepository } from '../repositories/payable.repository.interface';
import { RemovePayableInputDTO } from '../dto/remove-payable.input.dto';

@Injectable()
export class RemovePayableUseCase implements IRemovePayableUseCase {
  constructor(private readonly payableRepository: IPayableRepository) {}

  execute(removePayableDTO: RemovePayableInputDTO): Promise<void> {
    return this.payableRepository.remove(removePayableDTO);
  }
}
