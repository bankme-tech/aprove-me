import { IUseCase } from '@/core/use-cases/interfaces';
import { Injectable } from '@nestjs/common';

import { PayablesRepository } from '../domain/repositories/payables.repository';
import { Payable } from '../domain/entities/payable.entity';
import { PatchPayableDto } from '../infra/http/dtos/patch-payable.dto';
import { FindPayableByIdUseCase } from './find-payable-by-id.use-case';

@Injectable()
export class PatchPayableUseCase implements IUseCase {
  constructor(
    private payablesRepository: PayablesRepository,
    private findPayableByIdUseCase: FindPayableByIdUseCase,
  ) {}

  public async execute(patch: {
    id: string;
    patchPayableDto: PatchPayableDto;
  }) {
    await this.findPayableByIdUseCase.execute(patch.id);

    const payable = new Payable({
      id: patch.id,
      value: patch.patchPayableDto.value,
      emissionDate: patch.patchPayableDto.emissionDate,
      assignor: patch.patchPayableDto.assignor,
    });

    const updatePayable = await this.payablesRepository.update(payable);

    return updatePayable;
  }
}
