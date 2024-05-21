import { IUseCase } from '@/core/use-cases/interfaces';
import { CreatePayableDto } from '../infra/http/dtos/create-payable.dto';
import { Payable } from '../domain/entities/payable.entity';
import { PayablesRepository } from '../domain/repositories/payables.repository';
import { Injectable } from '@nestjs/common';
import { FindAssignorByIdUseCase } from './find-assignor-by-id.use-case';

@Injectable()
export class CreatePayableUseCase implements IUseCase {
  constructor(
    private payablesRepository: PayablesRepository,
    private findAssignorByIdUseCase: FindAssignorByIdUseCase,
  ) {}

  public async execute(createPayableDto: CreatePayableDto) {
    await this.findAssignorByIdUseCase.execute(createPayableDto.assignor);

    const payable = new Payable({
      value: createPayableDto.value,
      emissionDate: createPayableDto.emissionDate,
      assignor: createPayableDto.assignor,
    });

    const createdPayable = await this.payablesRepository.save(payable);

    return createdPayable;
  }
}
