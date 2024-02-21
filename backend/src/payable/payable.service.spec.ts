import { Test, TestingModule } from '@nestjs/testing';
import { PayableService } from './payable.service';
import PayableRepository from './repositories/payableRepository';
import AssignorRepository from '../assignor/repositories/assignorRepository';

describe('PayableService', () => {
  let service: PayableService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PayableService,
        {
          provide: PayableRepository,
          useValue: {},
        },
        {
          provide: AssignorRepository,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<PayableService>(PayableService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
