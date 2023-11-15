import { Test, TestingModule } from '@nestjs/testing';
import { AssignorService } from '../assignor.service';

describe('AssignorService', () => {
  let service: AssignorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssignorService],
    }).compile();

    service = module.get<AssignorService>(AssignorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
