import { Test, TestingModule } from '@nestjs/testing';
import { PayableService } from './payable.service';
import { PayableDomainService } from 'bme/core/domains/payables/payable-service';
import { AssignorDomainService } from 'bme/core/domains/assignors/assignor-service';
import { mock } from 'jest-mock-extended';
import { IPayableDomainService } from 'bme/core/domains/payables/interfaces/payable-service.interface';
import { IAssignorDomainService } from 'bme/core/domains/assignors/interfaces/assignor-service.interface';

describe('PayableService', () => {
  let service: PayableService;
  const payableDomainService = mock<IPayableDomainService>();
  const assignorDomainService = mock<IAssignorDomainService>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PayableService,
        { provide: PayableDomainService, useValue: payableDomainService },
        { provide: AssignorDomainService, useValue: assignorDomainService },
      ],
    }).compile();

    service = module.get<PayableService>(PayableService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
