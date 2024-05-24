import { IUseCase } from '@/core/use-cases/interfaces';
import { Injectable } from '@nestjs/common';
import { PayablesRepository } from '../domain/repositories/payables.repository';

@Injectable()
export class FindAllPayablesUseCase implements IUseCase {
  constructor(private payablesRepository: PayablesRepository) {}

  public async execute() {
    return await this.payablesRepository.findAll();
  }
}
