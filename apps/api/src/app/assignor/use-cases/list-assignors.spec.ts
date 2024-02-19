import { ListAssignorsUseCase } from './list-assignors';
import { InMemoryAssignorRepository } from '@/database/repositories/in-memory/in-memory-assignor.repository';
import { makeAssignor } from '@test/factories/assignor.factory';

let assignorRepository = new InMemoryAssignorRepository();
let service = new ListAssignorsUseCase(assignorRepository);

describe('ListAssignorsUseCase', () => {
  beforeEach(() => {
    assignorRepository = new InMemoryAssignorRepository();
    service = new ListAssignorsUseCase(assignorRepository);
  });

  it('should be able to list all assignors', async () => {
    assignorRepository.create(makeAssignor());
    assignorRepository.create(makeAssignor());
    assignorRepository.create(makeAssignor());
    assignorRepository.create(makeAssignor());

    const assignors = await service.execute();

    expect(assignors.isRight()).toBeTruthy();
    expect(assignors.isRight() && assignors.value.assignors.length).toBe(4);
  });
});
