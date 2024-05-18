import { PayableService } from './payable.service';
import { Payable } from './entities/payable.entity';
import { payableMock } from './payable.service.spec';
import { Test, TestingModule } from '@nestjs/testing';
import { PayableController } from './payable.controller';
import { PayableRepository } from './repositories/payable-repository';
import { AssignorRepository } from '../assignor/repositories/assignor-repository';

describe('PayableController', () => {
  let controller: PayableController;
  let service: PayableService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PayableController],
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

    controller = module.get<PayableController>(PayableController);
    service = module.get<PayableService>(PayableService);
  });

  it('should be defined', () => {
    expect(controller).toBeInstanceOf(PayableController);
  });

  it('should create a payable and return it', async () => {
    jest.spyOn(service, 'create').mockImplementation(async () => payableMock);

    const payable = await controller.create(payableMock);

    expect(payable).toEqual(payableMock);
    expect(payable).toBeInstanceOf(Payable);
  });
});
