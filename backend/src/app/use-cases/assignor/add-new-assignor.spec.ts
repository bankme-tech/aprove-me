import { InMemoryAssignorRepository } from 'test/repositories/in-memory-assignor-repository';
import { AddNewAssignor } from './add-new-assignor';
import { makeAssignor } from 'test/factories/assignor';
import { Assignor } from '@/app/entities/assignor';
import { AssignorAlreadyExists } from '@/app/errors/assignor-already-exists';

const makeSut = () => {
  const assignorMemoryRepository = new InMemoryAssignorRepository();

  const sutCase = new AddNewAssignor(assignorMemoryRepository);

  return { assignorMemoryRepository, sutCase };
};

describe('add new assignor use-case', () => {
  describe('when wants to create a new assignor', () => {
    describe('and assignor is not created before', () => {
      it('creates a new assignor correctly', async () => {
        const { sutCase, assignorMemoryRepository } = makeSut();

        const assignor = makeAssignor();

        const { newAssignor } = await sutCase.execute({ ...assignor.props });

        expect(assignorMemoryRepository.assignor).toHaveLength(1);
        expect(assignorMemoryRepository.assignor[0]).toEqual(newAssignor);
      });
    });
  });

  describe('and assignor with the same document is created before', () => {
    let assignor: Assignor;
    let sut: AddNewAssignor;
    let assignorRepo: InMemoryAssignorRepository;

    beforeEach(async () => {
      const { sutCase, assignorMemoryRepository } = makeSut();

      assignorRepo = assignorMemoryRepository;
      sut = sutCase;
      assignor = makeAssignor({ email: 'hx@gmail.com' });

      await assignorRepo.create(assignor);
    });

    it('doesnt create a new assignor', async () => {
      let createdAssignor: Assignor;
      try {
        const { newAssignor } = await sut.execute({
          ...assignor.props,
        });

        createdAssignor = newAssignor;
      } catch (error) {
        expect(error).toBeInstanceOf(AssignorAlreadyExists);
        expect(error.message).toBe('assignor already exists');
        expect(createdAssignor).not.toBeDefined();
        expect(assignorRepo.assignor).toHaveLength(1);
        expect(assignorRepo.assignor[0].props.document).toBe(
          assignor.props.document,
        );
      }
    });
  });

  describe('and assignor with the same email is created before', () => {
    let assignor: Assignor;
    let sut: AddNewAssignor;
    let assignorRepo: InMemoryAssignorRepository;

    beforeEach(async () => {
      const { sutCase, assignorMemoryRepository } = makeSut();

      assignorRepo = assignorMemoryRepository;
      sut = sutCase;
      assignor = makeAssignor({ document: '12837918273' });

      await assignorRepo.create(assignor);
    });

    it('doesnt create a new assignor', async () => {
      let createdAssignor: Assignor;
      try {
        const { newAssignor } = await sut.execute({
          ...assignor.props,
        });

        createdAssignor = newAssignor;
      } catch (error) {
        expect(error).toBeInstanceOf(AssignorAlreadyExists);
        expect(error.message).toBe('assignor already exists');
        expect(createdAssignor).not.toBeDefined();
        expect(assignorRepo.assignor).toHaveLength(1);
        expect(assignorRepo.assignor[0].props.email).toBe(assignor.props.email);
      }
    });
  });
});
