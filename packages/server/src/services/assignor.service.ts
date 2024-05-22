import { Injectable } from '@nestjs/common';
import { AssignorRepository } from 'src/repositories/assignor.repository';
import { Err, Ok, Result } from 'src/types/either';
import { ValidationService } from './validations.service';
import { CustomError, NotFoundError } from 'src/validations/errors';

@Injectable()
export class AssignorService {
  private assignor_repository: AssignorRepository;
  private validation_service: ValidationService;
  constructor(assignor_repository: AssignorRepository, validation_service: ValidationService) {
    this.assignor_repository = assignor_repository;
    this.validation_service = validation_service;
  }
  async create_assignor(assignor: AssignorRepository.bodyType): Promise<AssignorRepository.IdResponseType> {
    try {
      const data = this.validation_service.validateAssignor(assignor);
      const try_assignor = await this.assignor_repository.get_unique_assignor(data);
      if (try_assignor.isError()) {
        return try_assignor;
      }
      if (try_assignor.value.id) {
        return Err(new CustomError(`${try_assignor.value.field} is already registered.`));
      }
      const result = await this.assignor_repository.create_assignor(data);
      return result;
    } catch (error) {
      return Err(error);
    }
  }
  async get_assignor(id: string): Promise<AssignorRepository.responseType> {
    try {
      const id_result = this.validation_service.validateUuid(id);
      const is_error = await this.assignor_repository.get_assignor(id_result);
      if (is_error.isError()) {
        return is_error;
      }
      const assignor = is_error.value;
      if (!assignor) {
        return Err(new NotFoundError('Assignor not found'));
      }
      return Ok(assignor);
    } catch (error) {
      return Err(error);
    }
  }
  async get_list_assignor(): Promise<AssignorRepository.listResponseType> {
    const assignors = await this.assignor_repository.get_list_assignor();
    return assignors;
  }
  async delete_assignor(id: string): Promise<Result<Error, void>> {
    try {
      const id_result = this.validation_service.validateUuid(id);
      const is_error = await this.get_assignor(id_result);
      if (is_error.isError()) {
        return Err(is_error.value);
      }
      await this.assignor_repository.delete_assignor(id_result);
      return Ok(undefined);
    } catch (error) {
      return Err(error);
    }
  }
  async update_assignor(id: string, assignor: AssignorRepository.bodyType): Promise<AssignorRepository.IdResponseType> {
    try {
      const id_result = this.validation_service.validateUuid(id);
      const data = this.validation_service.validateUpdateAssignor(assignor);
      const is_error = await this.get_assignor(id_result);
      if (is_error.isError()) {
        return Err(is_error.value);
      }
      const result = await this.assignor_repository.update_assignor(id_result, data);
      return result;
    } catch (error) {
      return Err(error);
    }
  }
}
