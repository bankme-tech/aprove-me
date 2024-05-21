import { Injectable } from '@nestjs/common';
import { IAssignorRepository } from '../../repositories/interfaces/assignor.repository-interface';
import { Either, left, right } from '~/common/utils/either';
import { AssignorEntity } from '../../entities/assignor.entity';
import { NotFoundResource } from '~/common/exceptions/not-found-resource.exception';

interface RequestData {
  id: string;
}

type ResponseDate = Either<Error, AssignorEntity>;

@Injectable()
export class FindAssignorByIdService {
  constructor(private repository: IAssignorRepository) {}

  async execute({ id }: RequestData): Promise<ResponseDate> {
    const assignor = await this.repository.findById(id);

    if (!assignor) return left(new NotFoundResource('Assignor not found.'));

    return right(assignor);
  }
}
