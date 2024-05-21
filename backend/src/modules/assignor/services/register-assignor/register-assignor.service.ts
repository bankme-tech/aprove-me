import { Injectable } from '@nestjs/common';
import { type Either, left, right } from '~/common/utils/either';
import { AssignorEntity } from '../../entities/assignor.entity';
import { IAssignorRepository } from '../../repositories/interfaces/assignor.repository-interface';

interface RequestData {
  name: string;
  document: string;
  email: string;
  phone: string;
}

type ResponseData = Either<Error, AssignorEntity>;

@Injectable()
export class RegisterAssignorService {
  constructor(private repository: IAssignorRepository) {}

  async execute(data: RequestData): Promise<ResponseData> {
    const assignorOrError = AssignorEntity.create(data);

    if (assignorOrError.isLeft()) return left(assignorOrError.value);

    await this.repository.create(assignorOrError.value);

    return right(assignorOrError.value);
  }
}
