import { IUseCase } from '@/core/use-cases/interfaces';
import { PayablesRepository } from '../domain/repositories/payables.repository';
import { FindPayableByIdUseCase } from './find-payable-by-id.use-case';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DeletePayableUseCase implements IUseCase {
  constructor(
    private payablesRepository: PayablesRepository,
    private findPayableByIdUseCase: FindPayableByIdUseCase,
  ) {}

  public async execute(id: string) {
    await this.findPayableByIdUseCase.execute(id);
    await this.payablesRepository.delete(id);
  }
}
