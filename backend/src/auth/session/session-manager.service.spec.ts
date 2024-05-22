import { Test, TestingModule } from '@nestjs/testing';
import { SessionManagerService } from './session-manager.service';

describe('SessionManagerService', () => {
  let service: SessionManagerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SessionManagerService],
    }).compile();

    service = module.get<SessionManagerService>(SessionManagerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
