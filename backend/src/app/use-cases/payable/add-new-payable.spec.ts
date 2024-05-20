import { InMemoryAssignorRepository } from 'test/repositories/in-memory-assignor-repository';
import { InMemoryPayableRepository } from 'test/repositories/in-memory-payable-repository';
import { AddNewPayable } from './add-new-payable';
import { Assignor } from '@/app/entities/assignor';
import { makeAssignor } from 'test/factories/assignor';
import { makePayable } from 'test/factories/payable';
import { Payable } from '@/app/entities/payable';
import { AssignorNotFound } from '@/app/errors/assignor-not-found';

const makeSut = () => {
  const payableMemoryRepository = new InMemoryPayableRepository();
  const assignorMemoryRepository = new InMemoryAssignorRepository();

  const sutCase = new AddNewPayable(
    payableMemoryRepository,
    assignorMemoryRepository,
  );

  return { payableMemoryRepository, assignorMemoryRepository, sutCase };
};

describe('add new payable use-case', () => {
  describe('when assignor exists', () => {
    let assignor: Assignor;
    let sut: AddNewPayable;
    let payableRepo: InMemoryPayableRepository;
    let assignorRepo: InMemoryAssignorRepository;

    beforeEach(async () => {
      const { sutCase, payableMemoryRepository, assignorMemoryRepository } =
        makeSut();

      payableRepo = payableMemoryRepository;
      assignorRepo = assignorMemoryRepository;
      sut = sutCase;
      assignor = makeAssignor();

      await assignorRepo.create(assignor);
    });

    it('creates a new payable correctly', async () => {
      const payable = makePayable();

      const { newPayable } = await sut.execute({
        ...payable.props,
        assignorId: assignor._id,
      });

      expect(payableRepo.payable).toHaveLength(1);
      expect(payableRepo.payable[0]).toEqual(newPayable);
    });
  });

  describe('when assignor doesnt exists', () => {
    it('doesnt create a new payable', async () => {
      const { sutCase, payableMemoryRepository } = makeSut();

      let createdPayable: Payable;
      const payable = makePayable();

      try {
        const { newPayable } = await sutCase.execute({
          ...payable.props,
        });

        createdPayable = newPayable;
      } catch (error) {
        expect(error).toBeInstanceOf(AssignorNotFound);
        expect(error.message).toBe('assignor not found');
        expect(createdPayable).not.toBeDefined();
        expect(payableMemoryRepository.payable).toHaveLength(0);
      }
    });
  });
});
