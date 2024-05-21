import { Test, TestingModule } from '@nestjs/testing';
import { RegisterPayableController } from './register-payable.controller';
import { randomUUID } from 'crypto';
import { RegisterPayableService } from '../../services/register-payable/register-payable.service';
import { IPayableRepository } from '../../repositories/interfaces/payable.repository-interface';
import { InMemoryPayableRepository } from '../../repositories/in-memory/payable.repository';
import { IAssignorRepository } from '~/modules/assignor/repositories/interfaces/assignor.repository-interface';
import { InMemoryAssignorRepository } from '~/modules/assignor/repositories/in-memory/assignor.repository';
import { faker } from '@faker-js/faker';
import { FakeAuthModule } from '~/common/test/fake-auth-module';

describe('RegisterPayableController', () => {
  let controller: RegisterPayableController;
  let assignorRepository: InMemoryAssignorRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...FakeAuthModule.imports],
      controllers: [RegisterPayableController],
      providers: [
        ...FakeAuthModule.providers,
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

    controller = module.get<RegisterPayableController>(
      RegisterPayableController,
    );
    assignorRepository = module.get(IAssignorRepository);
  });

  it('should register payable', async () => {
    const assignorId = randomUUID();

    assignorRepository.items.push({
      id: assignorId,
      document: faker.string.numeric(),
      email: faker.internet.email(),
      name: faker.person.fullName(),
      phone: '+55 31 90000-0000',
    });

    const payable = {
      assignor: assignorId,
      value: 10.9,
      emissionDate: new Date(),
    };

    const result = await controller.handle(payable);

    expect(result.assignorId).toEqual(assignorId);
  });
});
