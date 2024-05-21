import { Test, TestingModule } from '@nestjs/testing';
import { DeletePayableController } from './delete-payable.controller';
import { DeletePayableService } from '../../services/delete-payable/delete-payable.service';
import { IPayableRepository } from '../../repositories/interfaces/payable.repository-interface';
import { InMemoryPayableRepository } from '../../repositories/in-memory/payable.repository';
import { makePayable } from '../../test/factories/make-payable';

describe('DeletePayableController', () => {
  let controller: DeletePayableController;
  let repository: InMemoryPayableRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeletePayableController],
      providers: [
        DeletePayableService,
        {
          provide: IPayableRepository,
          useClass: InMemoryPayableRepository,
        },
      ],
    }).compile();

    controller = module.get<DeletePayableController>(DeletePayableController);
    repository = module.get(IPayableRepository);
  });

  it('should delete a payable', async () => {
    const payable = makePayable();

    repository.items.push(payable);

    expect(repository.items).toHaveLength(1);

    const result = await controller.handle(payable.id);

    expect(result).not.toBeDefined();
  });

  it('should not delete an inexistent payable', async () => {
    const result = controller.handle('fake-id');

    expect(result).rejects.toThrow();

    await result.catch((err) => expect(err.status).toEqual(404));
  });
});
