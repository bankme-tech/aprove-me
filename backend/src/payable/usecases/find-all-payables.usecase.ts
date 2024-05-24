import { Injectable } from '@nestjs/common';
import { IFindAllPayablesUseCase } from './find-all-payables.usecase.interface';
import { IPayableRepository } from '../repositories/payable.repository.interface';
import { PayableEntity } from '../entities/payable.entity';

@Injectable()
export class FindAllPayablesUseCase implements IFindAllPayablesUseCase {
  constructor(private readonly assignorRepository: IPayableRepository) {}

  async execute(): Promise<PayableEntity[]> {
    return await this.assignorRepository.findAll();
  }
}
