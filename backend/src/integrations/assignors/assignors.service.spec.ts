import { Test, TestingModule } from '@nestjs/testing';
import { AssignorsService } from './assignors.service';

describe('AssignorsService', () => {
  let service: AssignorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssignorsService],
    }).compile();

    service = module.get<AssignorsService>(AssignorsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
