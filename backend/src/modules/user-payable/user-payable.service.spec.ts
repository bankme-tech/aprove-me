import { Test, TestingModule } from '@nestjs/testing';
import { UserPayableService } from './user-payable.service';

describe('UserPayableService', () => {
  let service: UserPayableService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserPayableService],
    }).compile();

    service = module.get<UserPayableService>(UserPayableService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
