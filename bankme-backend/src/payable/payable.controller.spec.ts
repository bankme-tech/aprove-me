import { Test, TestingModule } from '@nestjs/testing';
import { PayableService } from './payable.service';
import { CreatePayableDto, UpdatePayableDto } from './dto/payable.dto';
import { PayableController } from './payable.controller';

describe('PayableController', () => {
  let controller: PayableController;
  let service: PayableService;

  const mockPayableService = {
    createPayable: jest.fn(),
    getPayableById: jest.fn(),
    updatePayable: jest.fn(),
    deletePayable: jest.fn(),
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [PayableController],
      providers: [
        {
          provide: PayableService,
          useValue: mockPayableService,
        },
      ],
    }).compile();

    controller = moduleRef.get<PayableController>(PayableController);
    service = moduleRef.get<PayableService>(PayableService);
  });

  describe('create', () => {
    test('should create and return an payable', async () => {
      const payable = {
        id: 'any-id',
        assignorId: 'any-id',
        emissionDate: new Date(),
        value: 10,
      };
      const dto: CreatePayableDto = {
        assignorId: payable.assignorId,
        emissionDate: payable.emissionDate,
        value: payable.value,
      };

      jest.spyOn(service, 'createPayable').mockResolvedValueOnce(payable);

      const result = await controller.create(dto);

      expect(service.createPayable).toHaveBeenCalledWith(dto);
      expect(result).toEqual(payable);
    });
  });

  describe('findOne', () => {
    test('should return an payable if found', async () => {
      const payable = {
        id: 'any-id',
        assignorId: 'any-id',
        emissionDate: new Date(),
        value: 10,
      };

      jest.spyOn(service, 'getPayableById').mockResolvedValueOnce(payable);

      const result = await controller.findOne(payable.id);

      expect(service.getPayableById).toHaveBeenCalledWith(payable.id);
      expect(result).toEqual(payable);
    });
  });

  describe('update', () => {
    test('should update and return the payable if found', async () => {
      const payable = {
        id: 'any-id',
        assignorId: 'any-id',
        emissionDate: new Date(),
        value: 10,
      };
      const dto: UpdatePayableDto = {
        assignorId: payable.assignorId,
        emissionDate: payable.emissionDate,
        value: payable.value,
      };

      jest.spyOn(service, 'updatePayable').mockResolvedValueOnce(payable);

      const result = await controller.update(payable.id, dto);

      expect(service.updatePayable).toHaveBeenCalledWith(payable.id, dto);
      expect(result).toEqual(payable);
    });
  });

  describe('remove', () => {
    test('should delete the payable if found', async () => {
      const id = 'any-id';

      jest.spyOn(service, 'deletePayable').mockResolvedValueOnce(undefined);

      await expect(controller.remove(id)).resolves.toBeUndefined();
      expect(service.deletePayable).toHaveBeenCalledWith(id);
    });
  });
});
