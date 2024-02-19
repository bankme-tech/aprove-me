import { AssignorRepository } from '@/database/repositories/assignor.repository';
import { Injectable } from '@nestjs/common';
import { Assignor } from '@prisma/client';
import { Either, left, right } from '@util/either';
import { isUUID } from 'class-validator';
import { cnpj, cpf } from 'cpf-cnpj-validator';

export enum UpdateAssignorUseCaseError {
  ASSIGNOR_NOT_FOUND = 'assignor_not_found',
  INVALID_ID_FORMAT = 'invalid_id_format',
  DOCUMENT_ALREADY_USED = 'document_already_used',
  INVALID_DOCUMENT = 'invalid_document',
}

type UpdateAssignorUseCaseRequest = {
  id: string;
  document?: string;
  email?: string;
  phone?: string;
  name?: string;
};

type UpdateAssignorUseCaseResponse = Either<
  UpdateAssignorUseCaseError,
  {
    assignor: Assignor;
  }
>;

@Injectable()
export class UpdateAssignorUseCase {
  constructor(private assignorRepository: AssignorRepository) {}

  async execute({
    id,
    ...data
  }: UpdateAssignorUseCaseRequest): Promise<UpdateAssignorUseCaseResponse> {
    if (!isUUID(id, 4)) {
      return left(UpdateAssignorUseCaseError.INVALID_ID_FORMAT);
    }

    const assignor = await this.assignorRepository.findById(id);

    if (!assignor) {
      return left(UpdateAssignorUseCaseError.ASSIGNOR_NOT_FOUND);
    }

    if (data.document) {
      if (!cpf.isValid(data.document) && !cnpj.isValid(data.document)) {
        return left(UpdateAssignorUseCaseError.INVALID_DOCUMENT);
      }

      const assignorWithSameDocument =
        await this.assignorRepository.findByDocument(data.document);

      if (assignorWithSameDocument && assignorWithSameDocument.id !== id) {
        return left(UpdateAssignorUseCaseError.DOCUMENT_ALREADY_USED);
      }
    }

    const updatedAssignor = await this.assignorRepository.update(id, data);

    return right({
      assignor: updatedAssignor,
    });
  }
}
