import { Test, TestingModule } from '@nestjs/testing';
import { PayableController } from './payable.controller';
import { PayableService } from './payable.service';
import { IPayableDomainService } from 'bme/core/domains/payables/interfaces/payable-service.interface';
import { IAssignorDomainService } from 'bme/core/domains/assignors/interfaces/assignor-service.interface';
import { PayableDomainService } from 'bme/core/domains/payables/payable-service';
import { AssignorDomainService } from 'bme/core/domains/assignors/assignor-service';
import { mock } from 'jest-mock-extended';

describe('PayableController', () => {
  let controller: PayableController;
  const payableDomainService = mock<IPayableDomainService>();
  const assignorDomainService = mock<IAssignorDomainService>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PayableController],
      providers: [
        PayableService,
        { provide: PayableDomainService, useValue: payableDomainService },
        { provide: AssignorDomainService, useValue: assignorDomainService },
      ],
    }).compile();

    controller = module.get<PayableController>(PayableController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
