import { Injectable } from '@nestjs/common';
import { AssignorRepository } from 'src/repositories/assignor.repository';
import { Result } from 'src/types/either';

@Injectable()
export class AssignorService {
  private assignor_repository: AssignorRepository;
  constructor(assignor_repository: AssignorRepository) {
    this.assignor_repository = assignor_repository;
  }
  async create_assignor(assignor: AssignorRepository.bodyType): Promise<AssignorRepository.IdResponseType> {
    return this.assignor_repository.create_assignor(assignor);
  }
  async get_assignor(id: string): Promise<AssignorRepository.responseType> {
    return this.assignor_repository.get_assignor(id);
  }
  async get_list_assignor(): Promise<AssignorRepository.listResponseType> {
    return this.assignor_repository.get_list_assignor();
  }
  async delete_assignor(id: string): Promise<Result<Error, void>> {
    return this.assignor_repository.delete_assignor(id);
  }
  async update_assignor(id: string, assignor: AssignorRepository.bodyType): Promise<AssignorRepository.IdResponseType> {
    return this.assignor_repository.update_assignor(id, assignor);
  }
}
