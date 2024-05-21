import { makeAssignor } from 'test/factories/assignor';
import { InMemoryAssignorRepository } from 'test/repositories/in-memory-assignor-repository';
import { FindAll } from './find-all';

const makeSut = () => {
  const assignorMemoryRepository = new InMemoryAssignorRepository();

  const sutCase = new FindAll(assignorMemoryRepository);

  return { sutCase, assignorMemoryRepository };
};

describe('find all payables use-case', () => {
  describe('when wants to find existends payables', () => {
    let sut: FindAll;
    let assignorRepo: InMemoryAssignorRepository;

    beforeEach(async () => {
      const { sutCase, assignorMemoryRepository } = makeSut();

      assignorRepo = assignorMemoryRepository;
      sut = sutCase;

      for (let index = 0; index < 10; index++) {
        const assignor = makeAssignor();
        await assignorRepo.create(assignor);
      }
    });

    it('finds all avaiables payables ', async () => {
      const { assignors } = await sut.execute();

      expect(assignors).toHaveLength(10);
    });
  });

  describe('when have nothing to find', () => {
    it('returns nothing', async () => {
      const { sutCase } = makeSut();

      const { assignors } = await sutCase.execute();

      expect(assignors).toHaveLength(0);
    });
  });
});
