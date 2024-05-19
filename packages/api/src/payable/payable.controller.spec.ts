import { JwtService } from '@nestjs/jwt';
import { PayableService } from './payable.service';
import { Payable } from './entities/payable.entity';
import { payableMock } from './payable.service.spec';
import { Test, TestingModule } from '@nestjs/testing';
import { PayableController } from './payable.controller';
import { assignorMock } from '@assignor/assignor.service.spec';
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
        JwtService,
      ],
    }).compile();

    controller = module.get<PayableController>(PayableController);
    service = module.get<PayableService>(PayableService);
  });

  it('should be defined', () => {
    expect(controller).toBeInstanceOf(PayableController);
  });

  it('should create a payable and return it', async () => {
    jest.spyOn(service, 'create').mockResolvedValue(payableMock);

    const payable = await controller.create(payableMock);

    expect(payable).toEqual(payableMock);
    expect(payable).toBeInstanceOf(Payable);
  });

  it('should return all payables', async () => {
    jest.spyOn(service, 'getAll').mockResolvedValue([payableMock]);

    const payables = await controller.getAll();

    expect(payables).toEqual([payableMock]);
  });

  it('should return the payable when updated', async () => {
    const newPayable = new Payable('1', 50, assignorMock.id, new Date());
    jest.spyOn(service, 'update').mockResolvedValue(newPayable);

    const payable = await controller.update('1', newPayable);

    expect(payable).toEqual(newPayable);
  });

  it('should not return nothing when deled a payable', async () => {
    jest.spyOn(service, 'delete').mockResolvedValue(undefined);

    expect(await controller.delete('1')).toBeUndefined();
  });
});
