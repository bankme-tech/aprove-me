import { Injectable } from '@nestjs/common';
import { IUpdatePayableUseCase } from './update-payable.usecase.interface';
import { IPayableRepository } from '../repositories/payable.repository.interface';
import { UpdatePayableInputDTO } from '../dto/update-payable.input.dto';
import { PayableEntity } from '../entities/payable.entity';

@Injectable()
export class UpdatePayableUseCase implements IUpdatePayableUseCase {
  constructor(private readonly payableRepository: IPayableRepository) {}

  execute(updatePayableDTO: UpdatePayableInputDTO): Promise<PayableEntity> {
    return this.payableRepository.update(updatePayableDTO);
  }
}
