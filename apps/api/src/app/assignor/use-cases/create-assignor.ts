import { cnpj, cpf } from 'cpf-cnpj-validator';
import { randomUUID } from 'node:crypto';
import { AssignorRepository } from '@/database/repositories/assignor.repository';
import { Either, left, right } from '@util/either';
import { Injectable } from '@nestjs/common';
import { Assignor } from '@prisma/client';

export enum CreateAssignorUseCaseError {
  INVALID_DOCUMENT,
}

type CreateAssignorUseCaseRequest = {
  document: string;
  email: string;
  phone: string;
  name: string;
};

type CreateAssignorUseCaseResponse = Either<
  CreateAssignorUseCaseError,
  {
    assignor: Assignor;
  }
>;

@Injectable()
export class CreateAssignorUseCase {
  constructor(private assignorRepository: AssignorRepository) {}

  async execute({
    document,
    email,
    name,
    phone,
  }: CreateAssignorUseCaseRequest): Promise<CreateAssignorUseCaseResponse> {
    if (!cpf.isValid(document) && !cnpj.isValid(document)) {
      return left(CreateAssignorUseCaseError.INVALID_DOCUMENT);
    }

    const assignor = await this.assignorRepository.create({
      id: randomUUID(),
      document,
      email,
      name,
      phone,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return right({
      assignor,
    });
  }
}
