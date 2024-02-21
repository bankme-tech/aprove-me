import { Injectable } from '@nestjs/common';
import { CreatePayableDataDTO } from './dtos/CreatePayableDTO';
import { FindOnePayableDataDTO } from './dtos/FindOnePayableDTO';
import { PayablesRepository } from './payables.repository';
import { UpdatePayableDataDTO } from './dtos/UpdatePayableDTO';
import { FindAllPayableDataDTO } from './dtos/FindAllPayableDTO'; 
import { DeletePayableDataDTO } from './dtos/DeletePayableDTO';

@Injectable()
export class PayablesService {
  constructor(private payablesRepository: PayablesRepository) {}

  async create(data: CreatePayableDataDTO) {
    const { value, valueInCents, emissionDate, userId, assignorId } = data;
    return this.payablesRepository.create({
      value,
      valueInCents,
      emissionDate,
      userId,
      assignorId,
    });
  }

  async findOne(data: FindOnePayableDataDTO) {
    const { id } = data;
    return this.payablesRepository.findOne({ id });
  }

  async findAll(data: FindAllPayableDataDTO) {
    const { emissionDate, assignorId, limit, offset } = data;
    return this.payablesRepository.findAll({
      emissionDate,
      assignorId,
      limit,
      offset,
    });
  }

  async update(data: UpdatePayableDataDTO) {
    const {
      id,
      value,
      valueInCents
    } = data;
    return this.payablesRepository.update({
      id,
      value,
      valueInCents,
    });
  }

  async delete(data: DeletePayableDataDTO) {
    const { id } = data;
    this.payablesRepository.delete(id);
  }
}
