import { Test, TestingModule } from '@nestjs/testing';
import { GetPayablesService } from './get-payables.service';
import { InMemoryPayableRepository } from '../../repositories/in-memory/payable.repository';
import { IPayableRepository } from '../../repositories/interfaces/payable.repository-interface';
import { PayableEntity } from '../../entities/payable.entity';
import { makePayable } from '../../test/factories/make-payable';

describe('GetPayablesService', () => {
  let service: GetPayablesService;
  let repository: InMemoryPayableRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetPayablesService,
        {
          provide: IPayableRepository,
          useClass: InMemoryPayableRepository,
        },
      ],
    }).compile();

    service = module.get<GetPayablesService>(GetPayablesService);
    repository = module.get(IPayableRepository);
  });

  it('should get all payables', async () => {
    repository.items.push(makePayable());
    repository.items.push(makePayable());
    repository.items.push(makePayable());

    const result = await service.execute();

    expect(result.isRight()).toBeTruthy();
    expect(result.value).toBeInstanceOf(Array<PayableEntity>);
    expect(result.value).toHaveLength(3);
  });
});
