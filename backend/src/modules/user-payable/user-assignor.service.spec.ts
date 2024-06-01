import { Test, TestingModule } from '@nestjs/testing';
import { UserAssignorService } from './user-assignor.service';

describe('UserAssignorService', () => {
  let service: UserAssignorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserAssignorService],
    }).compile();

    service = module.get<UserAssignorService>(UserAssignorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
