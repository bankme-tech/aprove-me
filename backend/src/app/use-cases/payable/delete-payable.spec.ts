import { InMemoryPayableRepository } from 'test/repositories/in-memory-payable-repository';
import { DeletePayable } from './delete-payable';
import { makePayable } from 'test/factories/payable';
import { Payable } from '@/app/entities/payable';
import { PayableNotFound } from '@/app/errors/payable-not-found';

const makeSut = () => {
  const payableMemoryRepository = new InMemoryPayableRepository();

  const sutCase = new DeletePayable(payableMemoryRepository);

  return { sutCase, payableMemoryRepository };
};

describe('delete payable use-case', () => {
  describe('when want do delete an existent payable', () => {
    let payable: Payable;
    let sut: DeletePayable;
    let payableRepo: InMemoryPayableRepository;

    beforeEach(async () => {
      const { sutCase, payableMemoryRepository } = makeSut();

      payableRepo = payableMemoryRepository;
      sut = sutCase;
      payable = makePayable();

      await payableRepo.create(payable);
    });

    it('delete it correctly', async () => {
      expect(payableRepo.payable).toHaveLength(1);

      await sut.execute({ payableId: payable._id });

      expect(payableRepo.payable).toHaveLength(0);
    });
  });

  describe('when want do delete a non existent payable', () => {
    it('doesnt delete nothing', async () => {
      const { sutCase, payableMemoryRepository } = makeSut();

      const payable = makePayable();

      try {
        await sutCase.execute({ payableId: payable._id });
      } catch (error) {
        expect(error).toBeInstanceOf(PayableNotFound);
        expect(error.message).toBe('payable not found');
        expect(payableMemoryRepository.payable).toHaveLength(0);
      }
    });
  });
});
