import { Test, TestingModule } from '@nestjs/testing';
import { FindPayableByIdController } from './find-payable-by-id.controller';
import { InMemoryPayableRepository } from '../../repositories/in-memory/payable.repository';
import { IPayableRepository } from '../../repositories/interfaces/payable.repository-interface';
import { faker } from '@faker-js/faker';
import { FindPayableByIdService } from '../../services/find-payable-by-id/find-payable-by-id.service';

describe('FindPayableByIdController', () => {
  let controller: FindPayableByIdController;
  let repository: InMemoryPayableRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FindPayableByIdController],
      providers: [
        FindPayableByIdService,
        {
          provide: IPayableRepository,
          useClass: InMemoryPayableRepository,
        },
      ],
    }).compile();

    controller = module.get<FindPayableByIdController>(
      FindPayableByIdController,
    );
    repository = module.get(IPayableRepository);
  });

  it('should find payable by id', async () => {
    const payable = {
      id: faker.string.uuid(),
      value: faker.number.float(),
      assignorId: faker.string.uuid(),
      emissionDate: faker.date.anytime(),
    };

    repository.items.push(payable);

    const result = await controller.handle(payable.id);

    expect(result).toEqual(expect.objectContaining(payable));
  });
});
