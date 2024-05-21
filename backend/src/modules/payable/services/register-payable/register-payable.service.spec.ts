import { Test, TestingModule } from '@nestjs/testing';
import { RegisterPayableService } from './register-payable.service';
import { randomUUID } from 'node:crypto';
import { IPayableRepository } from '../../repositories/interfaces/payable.repository-interface';
import { InMemoryPayableRepository } from '../../repositories/in-memory/payable.repository';
import { IAssignorRepository } from '~/modules/assignor/repositories/interfaces/assignor.repository-interface';
import { InMemoryAssignorRepository } from '~/modules/assignor/repositories/in-memory/assignor.repository';
import { faker } from '@faker-js/faker';

describe('RegisterPayableService', () => {
  let service: RegisterPayableService;
  let repository: InMemoryPayableRepository;
  let assignorRepository: InMemoryAssignorRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RegisterPayableService,
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

    service = module.get<RegisterPayableService>(RegisterPayableService);
    repository = module.get(IPayableRepository);
    assignorRepository = module.get(IAssignorRepository);
  });

  it('should register payable object', async () => {
    expect(repository.items).toHaveLength(0);

    const assignorId = randomUUID();

    assignorRepository.items.push({
      id: assignorId,
      document: faker.string.numeric(),
      email: faker.internet.email(),
      name: faker.person.fullName(),
      phone: '+55 31 90000-0000',
    });

    const payable = {
      assignorId: assignorId,
      value: 10.9,
      emissionDate: new Date(),
    };

    const result = await service.execute(payable);

    expect(result.isRight()).toBeTruthy();
    expect(repository.items).toHaveLength(1);
    if (result.isRight()) expect(result.value.value).toEqual(10.9);
  });
});
