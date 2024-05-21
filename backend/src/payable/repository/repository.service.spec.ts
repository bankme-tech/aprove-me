import { Test, TestingModule } from '@nestjs/testing';
import { PayableRepository } from './repository.service';

describe('RepositoryService', () => {
  let service: PayableRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PayableRepository],
    }).compile();

    service = module.get<PayableRepository>(PayableRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
