import { Test, TestingModule } from '@nestjs/testing';
import { UpdatePayableController } from './update-payable.controller';
import { makePayable } from '../../test/factories/make-payable';
import { IPayableRepository } from '../../repositories/interfaces/payable.repository-interface';
import { InMemoryPayableRepository } from '../../repositories/in-memory/payable.repository';
import { UpdatePayableService } from '../../services/update-payable/update-payable.service';
import { FakeAuthModule } from '~/common/test/fake-auth-module';
import { IAssignorRepository } from '~/modules/assignor/repositories/interfaces/assignor.repository-interface';
import { InMemoryAssignorRepository } from '~/modules/assignor/repositories/in-memory/assignor.repository';
import { makeAssignor } from '~/modules/assignor/test/factories/make-assignor';

describe('UpdatePayableController', () => {
  let controller: UpdatePayableController;
  let repository: InMemoryPayableRepository;
  let assignorRepository: InMemoryAssignorRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...FakeAuthModule.imports],
      controllers: [UpdatePayableController],
      providers: [
        ...FakeAuthModule.providers,
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

    controller = module.get<UpdatePayableController>(UpdatePayableController);
    repository = module.get(IPayableRepository);
    assignorRepository = module.get(IAssignorRepository);
  });

  it('should update a payable', async () => {
    const assignor = makeAssignor();

    assignorRepository.items.push(assignor);

    const payable = makePayable({ assignorId: assignor.id });
    const newValue = payable.value + 10;

    repository.items.push(payable);

    const result = await controller.handle(payable.id, {
      value: newValue,
      assignorId: payable.assignorId,
      emissionDate: payable.emissionDate,
    });

    expect(result).toEqual(
      expect.objectContaining({
        id: payable.id,
        assignorId: payable.assignorId,
        emissionDate: payable.emissionDate,
        value: newValue,
      }),
    );
  });

  it('should not update an inexistent payable', async () => {
    const result = controller.handle('fake-id', {
      value: 0,
      assignorId: '',
      emissionDate: new Date(),
    });

    expect(result).rejects.toThrow();

    await result.catch((err) => expect(err.status).toEqual(404));
  });
});
