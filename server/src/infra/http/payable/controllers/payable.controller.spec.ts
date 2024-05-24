import { Test, TestingModule } from '@nestjs/testing';
import { PayableController } from './payable.controller';
import { CreatePayableService } from '@modules/payable/services/create-payable.service';
import { ReadPayableService } from '@modules/payable/services/read-payable.service';
import { UpdatePayableService } from '@modules/payable/services/update-payable.service';
import { DeletePayableService } from '@modules/payable/services/delete-payable.service';

describe('PayableController', () => {
  let controller: PayableController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PayableController],
      providers: [
        CreatePayableService,
        ReadPayableService,
        UpdatePayableService,
        DeletePayableService,
      ],
    }).compile();

    controller = module.get<PayableController>(PayableController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
