import { Test, TestingModule } from '@nestjs/testing';
import { GetPayablesController } from './get-payables.controller';
import { GetPayablesService } from '../../services/get-payables/get-payables.service';
import { InMemoryPayableRepository } from '../../repositories/in-memory/payable.repository';
import { IPayableRepository } from '../../repositories/interfaces/payable.repository-interface';
import { makePayable } from '../../test/factories/make-payable';

describe('GetPayablesController', () => {
  let controller: GetPayablesController;
  let repository: InMemoryPayableRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetPayablesController],
      providers: [
        GetPayablesService,
        {
          useClass: InMemoryPayableRepository,
          provide: IPayableRepository,
        },
      ],
    }).compile();

    controller = module.get<GetPayablesController>(GetPayablesController);
    repository = module.get(IPayableRepository);
  });

  it('should get all payables', async () => {
    const [payableA, payableB, payableC] = [
      makePayable(),
      makePayable(),
      makePayable(),
    ];
    repository.items.push(payableA);
    repository.items.push(payableB);
    repository.items.push(payableC);

    const result = await controller.handle();

    expect(result).toBeInstanceOf<Array<Record<string, unknown>>>;
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: payableA.id }),
        expect.objectContaining({ id: payableB.id }),
        expect.objectContaining({ id: payableC.id }),
      ]),
    );
  });
});
