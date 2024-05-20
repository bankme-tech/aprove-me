import { Assignor } from '@/app/entities/assignor';
import { AssignorNotFound } from '@/app/errors/assignor-not-found';
import { makeAssignor } from 'test/factories/assignor';
import { InMemoryAssignorRepository } from 'test/repositories/in-memory-assignor-repository';
import { FindAssignorById } from './find-assignor-by-id';

const makeSut = () => {
  const assignorMemoryRepository = new InMemoryAssignorRepository();

  const sutCase = new FindAssignorById(assignorMemoryRepository);

  return { sutCase, assignorMemoryRepository };
};

describe('find payable by id use-case', () => {
  describe('when wants to find an existent payable', () => {
    let assignor: Assignor;
    let sut: FindAssignorById;
    let assignorRepo: InMemoryAssignorRepository;

    beforeEach(async () => {
      const { sutCase, assignorMemoryRepository } = makeSut();

      assignorRepo = assignorMemoryRepository;
      sut = sutCase;
      assignor = makeAssignor();

      await assignorRepo.create(assignor);
    });

    it('finds the payable correctly', async () => {
      const { assignor: findedAssignor } = await sut.execute({
        assignorId: assignor._id,
      });

      expect(findedAssignor).toBe(assignor);
    });
  });

  describe('when wants to find a non existent payable', () => {
    it('doesnt find nothing', async () => {
      const { sutCase, assignorMemoryRepository } = makeSut();

      const findedAssignor = makeAssignor();

      try {
        await sutCase.execute({
          assignorId: findedAssignor._id,
        });
      } catch (error) {
        expect(error).toBeInstanceOf(AssignorNotFound);
        expect(error.message).toBe('assignor not found');
        expect(assignorMemoryRepository.assignor).toHaveLength(0);
      }
    });
  });
});
