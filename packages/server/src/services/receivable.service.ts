import { Injectable } from '@nestjs/common';
import { receivableResponseDto } from 'src/dtos/receivable.dto';
import { ReceivableRepository } from 'src/repositories/receivable.repository';
import { to_cents, to_money } from 'src/shared/utils';
import { Err, Ok } from 'src/types/either';

@Injectable()
export class ReceivableService {
  private receivable_repository: ReceivableRepository;
  constructor(receivable_repository: ReceivableRepository) {
    this.receivable_repository = receivable_repository;
  }
  async create_receivable(receivable: ReceivableRepository.bodyType): Promise<ReceivableRepository.IdResponseType> {
    const cents_result = to_cents(receivable.value);
    if (cents_result.isError()) {
      return Err(cents_result.value);
    }
    receivable.value = cents_result.value;
    const result = await this.receivable_repository.create_receivable(receivable);
    return result;
  }
  async get_receivable(id: string): Promise<ReceivableRepository.responseType> {
    const is_error = await this.receivable_repository.get_receivable(id);
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
  async delete_receivable(id: string): Promise<void> {
    return this.receivable_repository.delete_receivable(id);
  }
  async update_receivable(
    id: string,
    receivable: ReceivableRepository.bodyType,
  ): Promise<ReceivableRepository.responseType> {
    const cents_result = to_cents(receivable.value);
    if (cents_result.isError()) {
      return Err(cents_result.value);
    }
    receivable.value = cents_result.value;
    return this.receivable_repository.update_receivable(id, receivable);
  }
}
