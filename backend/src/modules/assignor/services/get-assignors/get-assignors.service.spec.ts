import { Test, TestingModule } from '@nestjs/testing';
import { GetAssignorsService } from './get-assignors.service';
import { InMemoryAssignorRepository } from '../../repositories/in-memory/assignor.repository';
import { IAssignorRepository } from '../../repositories/interfaces/assignor.repository-interface';
import { makeAssignor } from '../../test/factories/make-assignor';
import { AssignorEntity } from '../../entities/assignor.entity';

describe('GetAssignorsService', () => {
  let service: GetAssignorsService;
  let repository: InMemoryAssignorRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetAssignorsService,
        {
          useClass: InMemoryAssignorRepository,
          provide: IAssignorRepository,
        },
      ],
    }).compile();

    service = module.get<GetAssignorsService>(GetAssignorsService);
    repository = module.get(IAssignorRepository);
  });

  it('should get all assignors', async () => {
    repository.items.push(makeAssignor());
    repository.items.push(makeAssignor());
    repository.items.push(makeAssignor());
    repository.items.push(makeAssignor());
    repository.items.push(makeAssignor());

    const result = await service.execute();

    expect(result.isRight()).toBeTruthy();
    expect(result.value).toBeInstanceOf(Array<AssignorEntity>);
    expect(result.value).toHaveLength(5);
  });
});
