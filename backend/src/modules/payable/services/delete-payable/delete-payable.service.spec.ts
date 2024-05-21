import { Test, TestingModule } from '@nestjs/testing';
import { DeletePayableService } from './delete-payable.service';
import { IPayableRepository } from '../../repositories/interfaces/payable.repository-interface';
import { InMemoryPayableRepository } from '../../repositories/in-memory/payable.repository';
import { makePayable } from '../../test/factories/make-payable';
import { NotFoundResource } from '~/common/exceptions/not-found-resource.exception';

describe('DeletePayableService', () => {
  let service: DeletePayableService;
  let repository: InMemoryPayableRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeletePayableService,
        {
          provide: IPayableRepository,
          useClass: InMemoryPayableRepository,
        },
      ],
    }).compile();

    service = module.get<DeletePayableService>(DeletePayableService);
    repository = module.get(IPayableRepository);
  });

  it('should delete a payable', async () => {
    const payable = makePayable();

    repository.items.push(payable);

    expect(repository.items).toHaveLength(1);

    const result = await service.execute({ id: payable.id });

    expect(result.isRight()).toBeTruthy();

    expect(repository.items).toHaveLength(0);
  });

  it('should not delete an inexistent payable', async () => {
    expect(repository.items).toHaveLength(0);

    const result = await service.execute({ id: 'invalid-id' });

    expect(result.isLeft()).toBeTruthy();

    expect(result.value).toBeInstanceOf(NotFoundResource);
  });
});
