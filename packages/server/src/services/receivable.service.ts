import { Injectable } from '@nestjs/common';
import { receivableBodyDto, receivableResponseDto } from 'src/dtos/receivable.dto';
import { ReceivableRepository } from 'src/repositories/receivable.repository';
import { to_cents, to_money } from 'src/shared/utils';
import { Err, Ok, Result } from 'src/types/either';
import { ValidationService } from './validations.service';

@Injectable()
export class ReceivableService {
  private receivable_repository: ReceivableRepository;
  private validation_service: ValidationService;
  constructor(receivable_repository: ReceivableRepository, validation_service: ValidationService) {
    this.receivable_repository = receivable_repository;
    this.validation_service = validation_service;
  }
  async create_receivable(receivable: receivableBodyDto): Promise<ReceivableRepository.IdResponseType> {
    try {
      const data = this.validation_service.validateReceivable(receivable);
      const cents_result = to_cents(data.value);
      if (cents_result.isError()) {
        return Err(cents_result.value);
      }
      data.value = cents_result.value;
      const result = await this.receivable_repository.create_receivable(data);
      return result;
    } catch (error) {
      return Err(error);
    }
  }
  async get_receivable(id: string): Promise<ReceivableRepository.responseType> {
    try {
      const id_result = this.validation_service.validateUuid(id);
      const is_error = await this.receivable_repository.get_receivable(id_result);
      if (is_error.isError()) {
        return is_error;
      }
      const receivable = is_error.value;
      const money_result = to_money(receivable.value);

      if (money_result.isError()) {
        return Err(money_result.value);
      }
      receivable.value = money_result.value;

      return Ok(receivable);
    } catch (error) {
      return Err(error);
    }
  }
  async get_list_receivable(): Promise<ReceivableRepository.listResponseType> {
    const receivables = await this.receivable_repository.get_list_receivable();
    if (receivables.isError()) {
      return receivables;
    }
    const result: receivableResponseDto[] = [];

    for (const receivable of receivables.value) {
      const money_result = to_money(receivable.value);
      if (money_result.isError()) {
        return Err(money_result.value);
      }
      receivable.value = money_result.value;
      result.push(receivable);
    }

    return Ok(result);
  }
  async delete_receivable(id: string): Promise<Result<Error, void>> {
    try {
      const id_result = this.validation_service.validateUuid(id);
      await this.receivable_repository.delete_receivable(id_result);
    } catch (error) {
      return Err(error);
    }
  }
  async update_receivable(
    id: string,
    receivable: ReceivableRepository.bodyType,
  ): Promise<ReceivableRepository.responseType> {
    try {
      const id_result = this.validation_service.validateUuid(id);
      const data = this.validation_service.validateUpdateReceivable(receivable);
      const result = await this.receivable_repository.update_receivable(id_result, data);
      return result;
    } catch (error) {
      return Err(error);
    }
  }
}
