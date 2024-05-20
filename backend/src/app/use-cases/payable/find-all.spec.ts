import { InMemoryPayableRepository } from 'test/repositories/in-memory-payable-repository';
import { FindAll } from './find-all';
import { Payable } from '@/app/entities/payable';
import { makePayable } from 'test/factories/payable';

const makeSut = () => {
  const payableMemoryRepository = new InMemoryPayableRepository();

  const sutCase = new FindAll(payableMemoryRepository);

  return { sutCase, payableMemoryRepository };
};

describe('find all payables use-case', () => {
  describe('when wants to find existends payables', () => {
    let payable: Payable;
    let sut: FindAll;
    let payableRepo: InMemoryPayableRepository;

    beforeEach(async () => {
      const { sutCase, payableMemoryRepository } = makeSut();

      payableRepo = payableMemoryRepository;
      sut = sutCase;

      for (let index = 0; index < 10; index++) {
        payable = makePayable();
        await payableRepo.create(payable);
      }
    });

    it('finds all avaiables payables ', async () => {
      const { totalPages, totalPayables, payables } = await sut.execute({
        take: 5,
        skip: 0,
      });

      expect(totalPages).toBe(2);
      expect(totalPayables).toBe(10);
      expect(payables).toHaveLength(5);
    });

    it('finds all payables if take more than the total', async () => {
      const { totalPayables, payables } = await sut.execute({
        take: 15,
        skip: 0,
      });

      expect(totalPayables).toBe(10);
      expect(payables).toHaveLength(10);
    });

    it('finds nothing if skip more than the avaiable', async () => {
      const { totalPayables, payables } = await sut.execute({
        take: 15,
        skip: 15,
      });

      expect(totalPayables).toBe(10);
      expect(payables).toHaveLength(0);
    });
  });

  describe('when have nothing to find', () => {
    it('returns nothing', async () => {
      const { sutCase } = makeSut();

      const { totalPayables, payables } = await sutCase.execute({
        take: 15,
        skip: 0,
      });

      expect(totalPayables).toBe(0);
      expect(payables).toHaveLength(0);
    });
  });
});
