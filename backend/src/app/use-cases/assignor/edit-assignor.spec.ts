import { InMemoryAssignorRepository } from 'test/repositories/in-memory-assignor-repository';
import { EditAssignor } from './edit-assignor';
import { Assignor } from '@/app/entities/assignor';
import { makeAssignor } from 'test/factories/assignor';
import { AssignorNotFound } from '@/app/errors/assignor-not-found';

const makeSut = () => {
  const assignorMemoryRepository = new InMemoryAssignorRepository();

  const sutCase = new EditAssignor(assignorMemoryRepository);

  return { sutCase, assignorMemoryRepository };
};

describe('edit assignor use-case', () => {
  describe('when wants to edit an existent assignor', () => {
    let assignor: Assignor;
    let sut: EditAssignor;
    let assignorRepo: InMemoryAssignorRepository;

    beforeEach(async () => {
      const { sutCase, assignorMemoryRepository } = makeSut();

      assignorRepo = assignorMemoryRepository;
      sut = sutCase;
      assignor = makeAssignor();

      await assignorRepo.create(assignor);
    });

    it('edits the assignor correctly', async () => {
      expect(assignorRepo.assignor[0].props).toEqual(assignor.props);

      const editedAssignor = makeAssignor({
        document: '12389712',
        email: 'hx@gmail.com',
        name: 'hxsggsz',
      });

      const { assignor: newEditedAssignor } = await sut.execute({
        ...editedAssignor.props,
        assignorId: assignor._id,
      });

      expect(assignorRepo.assignor[0].props).toEqual(newEditedAssignor.props);
    });
  });

  describe('when wants do edit a non existent assignor', () => {
    it('doesnt edit nothing', async () => {
      const { sutCase, assignorMemoryRepository } = makeSut();

      const editedAssignor = makeAssignor({
        document: '12389712',
        email: 'hx@gmail.com',
        name: 'hxsggsz',
      });

      try {
        await sutCase.execute({
          ...editedAssignor.props,
          assignorId: editedAssignor._id,
        });
      } catch (error) {
        expect(error).toBeInstanceOf(AssignorNotFound);
        expect(error.message).toBe('assignor not found');
        expect(assignorMemoryRepository.assignor).toHaveLength(0);
      }
    });
  });
});
