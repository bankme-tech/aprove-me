import { Test, TestingModule } from '@nestjs/testing';
import { PayableController } from './payable.controller';
import { PayableService } from './payable.service';
import PayableRepository from './repositories/payableRepository';
import AssignorRepository from '../assignor/repositories/assignorRepository';
import { payableMock } from './payable.service.spec';

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
    expect(controller).toBeDefined();
  });

  it('should return a payable', async () => {
    jest.spyOn(service, 'findOne').mockImplementation(async () => payableMock);
    const payable = await controller.findOne('1');
    expect(payable).toEqual(payableMock);
  });

  it('should return a list of  payables', async () => {
    jest.spyOn(service, 'findAll').mockImplementation(async () => [payableMock]);
    const payable = await controller.findAll();
    expect(payable).toEqual([payableMock]);
  });

  it('should return a payable after updating it', async () => {
    jest.spyOn(service, 'update').mockImplementation(async () => payableMock);
    const payable = await controller.update('1', payableMock);
    expect(payable).toEqual(payableMock);
  });

  it('should return a message after deleting a payable', async () => {
    jest.spyOn(service, 'remove').mockImplementation(async () => undefined);
    const payable = await controller.remove('1');
    expect(payable).toEqual({ message: 'Payable deleted' });
  });
});
