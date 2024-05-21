import { IUseCase } from '@/core/use-cases/interfaces';
import { Injectable } from '@nestjs/common';
import { PayablesRepository } from '../domain/repositories/payables.repository';
import { PayableNotFoundError } from './errors/payable-not-found.error';

@Injectable()
export class FindPayableByIdUseCase implements IUseCase {
  constructor(private payablesRepository: PayablesRepository) {}

  public async execute(id: string) {
    const payable = await this.payablesRepository.findById(id);

    if (!payable) {
      throw new PayableNotFoundError();
    }

    return payable;
  }
}
