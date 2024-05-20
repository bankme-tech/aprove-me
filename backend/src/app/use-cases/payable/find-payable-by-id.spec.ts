import { InMemoryPayableRepository } from 'test/repositories/in-memory-payable-repository';
import { FindPayableById } from './find-payable-by-id';
import { makePayable } from 'test/factories/payable';
import { Payable } from '@/app/entities/payable';
import { PayableNotFound } from '@/app/errors/payable-not-found';

const makeSut = () => {
  const payableMemoryRepository = new InMemoryPayableRepository();

  const sutCase = new FindPayableById(payableMemoryRepository);

  return { sutCase, payableMemoryRepository };
};

describe('find payable by id use-case', () => {
  describe('when wants to find an existent payable', () => {
    let payable: Payable;
    let sut: FindPayableById;
    let payableRepo: InMemoryPayableRepository;

    beforeEach(async () => {
      const { sutCase, payableMemoryRepository } = makeSut();

      payableRepo = payableMemoryRepository;
      sut = sutCase;
      payable = makePayable();

      await payableRepo.create(payable);
    });

    it('finds the payable correctly', async () => {
      const { payable: findedPayable } = await sut.execute({
        payableId: payable._id,
      });

      expect(findedPayable).toBe(payable);
    });
  });

  describe('when wnats to find a non existent payable', () => {
    it('doesnt find nothing', async () => {
      const { sutCase, payableMemoryRepository } = makeSut();

      const findedPayable = makePayable();

      try {
        await sutCase.execute({
          payableId: findedPayable._id,
        });
      } catch (error) {
        expect(error).toBeInstanceOf(PayableNotFound);
        expect(error.message).toBe('payable not found');
        expect(payableMemoryRepository.payable).toHaveLength(0);
      }
    });
  });
});
