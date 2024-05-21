import { Test, TestingModule } from '@nestjs/testing';
import { FindAssignorByIdController } from './find-assignor-by-id.controller';
import { InMemoryAssignorRepository } from '../../repositories/in-memory/assignor.repository';
import { IAssignorRepository } from '../../repositories/interfaces/assignor.repository-interface';
import { faker } from '@faker-js/faker';
import { FindAssignorByIdService } from '../../services/find-assignor-by-id/find-assignor-by-id.service';
import { FakeAuthModule } from '~/common/test/fake-auth-module';

describe('FindAssignorByIdController', () => {
  let controller: FindAssignorByIdController;
  let repository: InMemoryAssignorRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...FakeAuthModule.imports],
      controllers: [FindAssignorByIdController],
      providers: [
        ...FakeAuthModule.providers,
        FindAssignorByIdService,
        {
          provide: IAssignorRepository,
          useClass: InMemoryAssignorRepository,
        },
      ],
    }).compile();

    controller = module.get<FindAssignorByIdController>(
      FindAssignorByIdController,
    );
    repository = module.get(IAssignorRepository);
  });

  it('should find assignor by id', async () => {
    const assignor = {
      id: faker.string.uuid(),
      document: faker.string.numeric(),
      email: faker.internet.email(),
      name: faker.person.fullName(),
      phone: '+55 31 90000-0000',
    };

    repository.items.push(assignor);

    const result = await controller.handle(assignor.id);

    expect(result).toEqual(expect.objectContaining(assignor));
  });
});
