import { Test, TestingModule } from '@nestjs/testing';
import { AssignorService } from './assignor.service';
import AssignorRepository from './repositories/assignorRepository';

describe('AssignorService', () => {
  let service: AssignorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AssignorService,
        {
          provide: AssignorRepository,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<AssignorService>(AssignorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
