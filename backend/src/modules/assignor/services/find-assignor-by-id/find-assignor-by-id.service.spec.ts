import { Test, TestingModule } from '@nestjs/testing';
import { FindAssignorByIdService } from './find-assignor-by-id.service';
import { IAssignorRepository } from '../../repositories/interfaces/assignor.repository-interface';
import { InMemoryAssignorRepository } from '../../repositories/in-memory/assignor.repository';
import { faker } from '@faker-js/faker';
import { AssignorEntity } from '../../entities/assignor.entity';
import { NotFoundResource } from '~/common/exceptions/not-found-resource.exception';

describe('FindAssignorByIdService', () => {
  let service: FindAssignorByIdService;
  let repository: InMemoryAssignorRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindAssignorByIdService,
        {
          provide: IAssignorRepository,
          useClass: InMemoryAssignorRepository,
        },
      ],
    }).compile();

    service = module.get<FindAssignorByIdService>(FindAssignorByIdService);
    repository = module.get(IAssignorRepository);
  });

  it('should fetch one assignor', async () => {
    const assignor = {
      id: faker.string.uuid(),
      document: faker.string.numeric(),
      email: faker.internet.email(),
      name: faker.person.fullName(),
      phone: '+55 31 90000-0000',
    };

    repository.items.push(assignor);

    const result = await service.execute({ id: assignor.id });

    expect(result.isRight()).toBeTruthy();
    expect(result.value).toBeInstanceOf(AssignorEntity);
    if (result.isRight()) {
      expect(result.value.id).toEqual(assignor.id);
    }
  });

  it('should not fetch inexistent assignor', async () => {
    const result = await service.execute({ id: 'fake-id' });

    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(NotFoundResource);
  });
});
