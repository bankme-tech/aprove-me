import { IUseCase } from '@/core/use-cases/interfaces';
import { CreatePayableDto } from '../infra/http/dtos/create-payable.dto';
import { Payable } from '../domain/entities/payable.entity';
import { PayablesRepository } from '../domain/repositories/payables.repository';
import { Injectable } from '@nestjs/common';
import { AssignorsRepository } from '../domain/repositories/assignors.repository';
import { AssignorNotFoundError } from './errors/assignor-not-found.error';

@Injectable()
export class CreatePayableUseCase implements IUseCase {
  constructor(
    private payablesRepository: PayablesRepository,
    private assignorsRepository: AssignorsRepository,
  ) {}

  public async execute(createPayableDto: CreatePayableDto) {
    const assignorExists = await this.assignorsRepository.findById(
      createPayableDto.assignor,
    );

    if (!assignorExists) {
      throw new AssignorNotFoundError();
    }

    const payable = new Payable({
      value: createPayableDto.value,
      emissionDate: createPayableDto.emissionDate,
      assignor: createPayableDto.assignor,
    });

    const createdPayable = await this.payablesRepository.save(payable);

    return createdPayable;
  }
}
