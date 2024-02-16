import { InMemoryAssignorRepository } from '@/database/repositories/in-memory/in-memory-assignor.repository';
import { makeAssignor } from '@test/factories/assignor.factory';
import { cnpj } from 'cpf-cnpj-validator';
import {
  UpdateAssignorUseCase,
  UpdateAssignorUseCaseError,
} from './update-assignor';
import { randomUUID } from 'crypto';

let assignorRepository = new InMemoryAssignorRepository();
let service = new UpdateAssignorUseCase(assignorRepository);

describe('UpdateAssignorUseCase', () => {
  beforeEach(() => {
    assignorRepository = new InMemoryAssignorRepository();
    service = new UpdateAssignorUseCase(assignorRepository);
  });

  it('should be able to update assignor', async () => {
    const assignor = makeAssignor();
    assignorRepository.create(assignor);

    const generatedCnpj = cnpj.generate(false);

    const response = await service.execute({
      id: assignor.id,
      name: 'updated-name',
      email: 'updated@mail.com',
      phone: 'updated-phone',
      document: generatedCnpj,
    });

    expect(response.isRight()).toBeTruthy();
    expect(response.isRight() && response.value.assignor.email).toBe(
      'updated@mail.com',
    );
    expect(response.isRight() && response.value.assignor.name).toBe(
      'updated-name',
    );
    expect(response.isRight() && response.value.assignor.phone).toBe(
      'updated-phone',
    );
    expect(response.isRight() && response.value.assignor.document).toBe(
      generatedCnpj,
    );
  });

  it('should be able to update only assignor name', async () => {
    const assignor = makeAssignor();
    assignorRepository.create(assignor);

    const response = await service.execute({
      id: assignor.id,
      name: 'updated-name',
    });

    expect(response.isRight()).toBeTruthy();
    expect(response.isRight() && response.value.assignor.name).toBe(
      'updated-name',
    );
    expect(response.isRight() && response.value.assignor.phone).toBe(
      assignor.phone,
    );
    expect(response.isRight() && response.value.assignor.document).toBe(
      assignor.document,
    );
  });

  it('should not be able to update inexistent assignor', async () => {
    const inexistentId = randomUUID();

    const response = await service.execute({
      id: inexistentId,
      name: 'updated-name',
    });

    expect(response.isLeft()).toBeTruthy();
    expect(response.value).toBe(UpdateAssignorUseCaseError.ASSIGNOR_NOT_FOUND);
  });

  it('should not be able to update assignor using invalid id', async () => {
    const response = await service.execute({
      id: 'invalid-id',
      name: 'updated-name',
    });

    expect(response.isLeft()).toBeTruthy();
    expect(response.value).toBe(UpdateAssignorUseCaseError.INVALID_ID_FORMAT);
  });

  it('should not be able to update assignor using already registered document', async () => {
    const alreadyUsedDocument = cnpj.generate(false);
    const assignorToUpdate = makeAssignor();
    const existentAssignor = makeAssignor({
      document: alreadyUsedDocument,
    });

    assignorRepository.create(assignorToUpdate);
    assignorRepository.create(existentAssignor);

    const response = await service.execute({
      id: assignorToUpdate.id,
      document: alreadyUsedDocument,
    });

    expect(response.isLeft()).toBeTruthy();
    expect(response.value).toBe(
      UpdateAssignorUseCaseError.DOCUMENT_ALREADY_USED,
    );
  });

  it('should not be able to update assignor using invalid document', async () => {
    const assignorToUpdate = makeAssignor();

    assignorRepository.create(assignorToUpdate);

    const response = await service.execute({
      id: assignorToUpdate.id,
      document: 'invalid-document',
    });

    expect(response.isLeft()).toBeTruthy();
    expect(response.value).toBe(UpdateAssignorUseCaseError.INVALID_DOCUMENT);
  });
});
