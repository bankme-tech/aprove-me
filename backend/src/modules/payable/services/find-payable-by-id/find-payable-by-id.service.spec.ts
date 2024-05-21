import { Test, TestingModule } from '@nestjs/testing';
import { FindPayableByIdService } from './find-payable-by-id.service';
import { IPayableRepository } from '../../repositories/interfaces/payable.repository-interface';
import { InMemoryPayableRepository } from '../../repositories/in-memory/payable.repository';
import { faker } from '@faker-js/faker';
import { PayableEntity } from '../../entities/payable.entity';
import { NotFoundResource } from '~/common/exceptions/not-found-resource.exception';

describe('FindPayableByIdService', () => {
  let service: FindPayableByIdService;
  let repository: InMemoryPayableRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindPayableByIdService,
        {
          provide: IPayableRepository,
          useClass: InMemoryPayableRepository,
        },
      ],
    }).compile();

    service = module.get<FindPayableByIdService>(FindPayableByIdService);
    repository = module.get(IPayableRepository);
  });

  it('should fetch one payable', async () => {
    const payable = {
      id: faker.string.uuid(),
      value: faker.number.float(),
      assignorId: faker.string.uuid(),
      emissionDate: faker.date.anytime(),
    };

    repository.items.push(payable);

    const result = await service.execute({ id: payable.id });

    expect(result.isRight()).toBeTruthy();
    expect(result.value).toBeInstanceOf(PayableEntity);
    if (result.isRight()) {
      expect(result.value.id).toEqual(payable.id);
    }
  });

  it('should not fetch inexistent payable', async () => {
    const result = await service.execute({ id: 'fake-id' });

    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(NotFoundResource);
  });
});
