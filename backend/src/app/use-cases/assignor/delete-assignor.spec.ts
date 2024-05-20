import { InMemoryAssignorRepository } from 'test/repositories/in-memory-assignor-repository';
import { DeleteAssignor } from './delete-assignor';
import { makeAssignor } from 'test/factories/assignor';
import { Assignor } from '@/app/entities/assignor';
import { AssignorNotFound } from '@/app/errors/assignor-not-found';

const makeSut = () => {
  const assignorMemoryRepository = new InMemoryAssignorRepository();

  const sutCase = new DeleteAssignor(assignorMemoryRepository);

  return { sutCase, assignorMemoryRepository };
};

describe('delete assignor use-case', () => {
  describe('when wants to delete an existent assignor', () => {
    let assignor: Assignor;
    let sut: DeleteAssignor;
    let assignorRepo: InMemoryAssignorRepository;

    beforeEach(async () => {
      const { sutCase, assignorMemoryRepository } = makeSut();

      assignorRepo = assignorMemoryRepository;
      sut = sutCase;
      assignor = makeAssignor({ email: 'hx@gmail.com' });

      await assignorRepo.create(assignor);
    });

    it('deletes the assignor correctly', async () => {
      expect(assignorRepo.assignor[0]).toEqual(assignor);
      expect(assignorRepo.assignor).toHaveLength(1);

      await sut.execute({ assignorId: assignor._id });

      expect(assignorRepo.assignor).toHaveLength(0);
      expect(assignorRepo.assignor[0]).not.toEqual(assignor);
    });
  });

  describe('when want do delete a non existent assignor', () => {
    it('doesnt delete nothing', async () => {
      const { sutCase, assignorMemoryRepository } = makeSut();

      const assignor = makeAssignor();

      try {
        await sutCase.execute({ assignorId: assignor._id });
      } catch (error) {
        expect(error).toBeInstanceOf(AssignorNotFound);
        expect(error.message).toBe('assignor not found');
        expect(assignorMemoryRepository.assignor).toHaveLength(0);
      }
    });
  });
});
