import { InMemoryPayableRepository } from 'test/repositories/in-memory-payable-repository';
import { EditPayable } from './edit-payable';
import { makePayable } from 'test/factories/payable';
import { Payable } from '@/app/entities/payable';
import { PayableNotFound } from '@/app/errors/payable-not-found';

const makeSut = () => {
  const payableMemoryRepository = new InMemoryPayableRepository();

  const sutCase = new EditPayable(payableMemoryRepository);

  return { sutCase, payableMemoryRepository };
};

describe('edit payable use-case', () => {
  describe('when wants to edit an existent payable', () => {
    let payable: Payable;
    let sut: EditPayable;
    let payableRepo: InMemoryPayableRepository;

    beforeEach(async () => {
      const { sutCase, payableMemoryRepository } = makeSut();

      payableRepo = payableMemoryRepository;
      sut = sutCase;
      payable = makePayable();

      await payableRepo.create(payable);
    });

    it('edits the payable correctly', async () => {
      expect(payableRepo.payable[0].props.value).toBe(payable.props.value);
      const editedPayable = makePayable({ value: 56.32 });

      await sut.execute({ ...editedPayable.props, payableId: payable._id });

      expect(payableRepo.payable[0].props.value).toBe(
        editedPayable.props.value,
      );
    });
  });

  describe('when wants do edit a non existent payable', () => {
    it('doesnt edit nothing', async () => {
      const { sutCase, payableMemoryRepository } = makeSut();

      const editedPayable = makePayable({ value: 56.32 });

      try {
        await sutCase.execute({
          ...editedPayable.props,
          payableId: editedPayable._id,
        });
      } catch (error) {
        expect(error).toBeInstanceOf(PayableNotFound);
        expect(error.message).toBe('payable not found');
        expect(payableMemoryRepository.payable).toHaveLength(0);
      }
    });
  });
});
