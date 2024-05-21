import { Injectable } from '@nestjs/common';
import { Either, right } from '~/common/utils/either';
import { AssignorEntity } from '../../entities/assignor.entity';
import { IAssignorRepository } from '../../repositories/interfaces/assignor.repository-interface';

type ResponseData = Either<Error, AssignorEntity[]>;

@Injectable()
export class GetAssignorsService {
  constructor(private repository: IAssignorRepository) {}

  async execute(): Promise<ResponseData> {
    const assignors = await this.repository.findAll();

    return right(assignors);
  }
}
