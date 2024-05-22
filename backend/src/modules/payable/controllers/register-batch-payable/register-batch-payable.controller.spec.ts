import { Test, TestingModule } from '@nestjs/testing';
import { randomUUID } from 'crypto';
import { IPayableRepository } from '../../repositories/interfaces/payable.repository-interface';
import { InMemoryPayableRepository } from '../../repositories/in-memory/payable.repository';
import { IAssignorRepository } from '~/modules/assignor/repositories/interfaces/assignor.repository-interface';
import { InMemoryAssignorRepository } from '~/modules/assignor/repositories/in-memory/assignor.repository';
import { faker } from '@faker-js/faker';
import { FakeAuthModule } from '~/common/test/fake-auth-module';
import { RegisterBatchPayableController } from './register-batch-payable.controller';
import { RegisterBatchPayableService } from '../../services/register-batch-payable/register-batch-payable.service';
import { BullModule } from '@nestjs/bull';
import { QueuesName } from '~/common/types/queues';

describe('RegisterBatchPayableController', () => {
  let controller: RegisterBatchPayableController;
  let assignorRepository: InMemoryAssignorRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ...FakeAuthModule.imports,
        BullModule.registerQueue({ name: QueuesName.PAYABLE }),
      ],
      controllers: [RegisterBatchPayableController],
      providers: [
        ...FakeAuthModule.providers,
        RegisterBatchPayableService,
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

    controller = module.get<RegisterBatchPayableController>(
      RegisterBatchPayableController,
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

    const payables = [payable, payable, payable];

    expect(controller.handle({ payables })).resolves.not.toThrow();
  });
});
