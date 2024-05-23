import { Test, TestingModule } from '@nestjs/testing';
import { UpdatePayableService } from './update-payable.service';
import { makePayable } from '../../test/factories/make-payable';
import { IPayableRepository } from '../../repositories/interfaces/payable.repository-interface';
import { InMemoryPayableRepository } from '../../repositories/in-memory/payable.repository';
import { NotFoundResource } from '~/common/exceptions/not-found-resource.exception';
import { PayableEntity } from '../../entities/payable.entity';
import { IAssignorRepository } from '~/modules/assignor/repositories/interfaces/assignor.repository-interface';
import { InMemoryAssignorRepository } from '~/modules/assignor/repositories/in-memory/assignor.repository';
import { makeAssignor } from '~/modules/assignor/test/factories/make-assignor';

describe('UpdatePayableService', () => {
  let service: UpdatePayableService;
  let repository: InMemoryPayableRepository;
  let assignorRepository: InMemoryAssignorRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdatePayableService,
        {
          provide: IPayableRepository,
          useClass: InMemoryPayableRepository,
        },
        {
          provide: IAssignorRepository,
          useClass: InMemoryAssignorRepository,
        },
      ],
    }).compile();

    service = module.get<UpdatePayableService>(UpdatePayableService);
    repository = module.get(IPayableRepository);
    assignorRepository = module.get(IAssignorRepository);
  });

  it('should update a payable', async () => {
    const assignor = makeAssignor();

    assignorRepository.items.push(assignor);

    const payable = makePayable({ assignorId: assignor.id });
    const newValue = payable.value + 10;

    repository.items.push(payable);

    const result = await service.execute({
      id: payable.id,
      value: newValue,
      assignorId: payable.assignorId,
      emissionDate: payable.emissionDate,
    });

    expect(result.isRight()).toBeTruthy();

    expect(result.value).toBeInstanceOf(PayableEntity);

    if (result.isRight()) {
      expect(result.value.value).toEqual(newValue);
      expect(repository.items[0].value).toEqual(newValue);
    }
  });

  it('should not update an inexistent payable', async () => {
    expect(repository.items).toHaveLength(0);

    const result = await service.execute({
      id: 'invalid-id',
      value: 0,
      assignorId: '',
      emissionDate: new Date(),
    });

    expect(result.isLeft()).toBeTruthy();

    expect(result.value).toBeInstanceOf(NotFoundResource);
  });

  it('should not update an payable with inexistent assignor', async () => {
    const payable = makePayable();
    const newValue = payable.value + 10;

    repository.items.push(payable);

    const result = await service.execute({
      id: payable.id,
      value: newValue,
      assignorId: 'fake-assignor-id',
      emissionDate: payable.emissionDate,
    });

    expect(result.isLeft()).toBeTruthy();

    expect(result.value).toBeInstanceOf(NotFoundResource);
  });
});
