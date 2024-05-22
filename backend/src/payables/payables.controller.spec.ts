import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { randomUUID } from 'crypto';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { PayablesController } from './payables.controller';
import { PayablesService } from './payables.service';
import { CreatePayableDto } from './dto/create.payable.dto';
import { UpdatePayableDto } from './dto/update.payable.dto';

describe('PayablesController', () => {
  let controller: PayablesController;
  let service: DeepMockProxy<PayablesService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PayablesController],
      providers: [
        {
          provide: PayablesService,
          useValue: mockDeep<PayablesService>(),
        },
      ],
    }).compile();

    controller = module.get<PayablesController>(PayablesController);
    service = module.get<PayablesService>(
      PayablesService,
    ) as DeepMockProxy<PayablesService>;
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createPayable', () => {
    it('should create a payable', async () => {
      const payableDto: CreatePayableDto = {
        id: randomUUID(),
        value: 100,
        emissionDate: new Date(),
        assignor: randomUUID(),
      };
      service.createPayable.mockResolvedValue(payableDto);

      expect(await controller.createPayable(payableDto)).toBe(payableDto);
    });
  });

  describe('getPayableById', () => {
    it('should return a payable if it exists', async () => {
      const payableDto: CreatePayableDto = {
        id: randomUUID(),
        value: 100,
        emissionDate: new Date(),
        assignor: randomUUID(),
      };
      service.getPayableById.mockResolvedValue(payableDto);

      expect(await controller.getPayableById(payableDto.id)).toBe(payableDto);
    });

    it('should throw NotFoundException if payable does not exist', async () => {
      service.getPayableById.mockResolvedValue(null);
      await expect(
        controller.getPayableById('non-existent-id'),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('updatePayable', () => {
    it('should update a payable', async () => {
      const updatePayableDto: UpdatePayableDto = {
        value: 200,
        emissionDate: new Date(),
        assignor: randomUUID(),
      };

      const data = {
        ...updatePayableDto,
        id: randomUUID(),
      };
      service.updatePayable.mockResolvedValue(data);

      expect(await controller.updatePayable(updatePayableDto, data.id)).toBe(
        data,
      );
    });

    it('should throw NotFoundException if payable does not exist', async () => {
      service.updatePayable.mockRejectedValue(
        new NotFoundException('Payable not found'),
      );
      const updatePayableDto: UpdatePayableDto = {
        value: 200,
        emissionDate: new Date(),
        assignor: randomUUID(),
      };

      await expect(
        controller.updatePayable(updatePayableDto, 'non-existent-id'),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('deletePayable', () => {
    it('should delete a payable', async () => {
      const payableDto: CreatePayableDto = {
        id: randomUUID(),
        value: 100,
        emissionDate: new Date(),
        assignor: randomUUID(),
      };
      service.deletePayable.mockResolvedValue(payableDto);

      expect(await controller.deletePayable(payableDto.id)).toBe(payableDto);
    });

    it('should throw NotFoundException if payable does not exist', async () => {
      service.deletePayable.mockRejectedValue(
        new NotFoundException('Payable not found'),
      );

      await expect(controller.deletePayable('non-existent-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
