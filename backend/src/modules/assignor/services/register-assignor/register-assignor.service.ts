import { Injectable } from '@nestjs/common';
import { type Either, left, right } from '~/common/utils/either';
import { AssignorEntity } from '../../entities/assignor.entity';
import { IAssignorRepository } from '../../repositories/interfaces/assignor.repository-interface';
import { ConflictResource } from '~/common/exceptions/conflict-resource.exception';

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
    const assignorAlreadyExists = await this.repository.findByEmailOrDocument(
      data.email,
      data.document,
    );

    if (assignorAlreadyExists)
      return left(new ConflictResource('Assignor already exists.'));

    const assignorOrError = AssignorEntity.create(data);

    if (assignorOrError.isLeft()) return left(assignorOrError.value);

    await this.repository.create(assignorOrError.value);

    return right(assignorOrError.value);
  }
}
