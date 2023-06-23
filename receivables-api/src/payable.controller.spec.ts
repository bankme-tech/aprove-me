import { Test, TestingModule } from '@nestjs/testing';
import { PayableController } from './payable/controllers/payable.controller';
import { PayableService } from './payable/service/payable.service';
import { PayableDto } from './payable/dto/payable.dto';
import { PayableEntity } from './payable/payable.entity';
import { NotFoundException, BadRequestException } from '@nestjs/common';

describe('PayableController', () => {
  let controller: PayableController;
  let service: PayableService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PayableController],
      providers: [PayableService],
    }).compile();

    controller = module.get<PayableController>(PayableController);
    service = module.get<PayableService>(PayableService);
  });

  describe('createPayable', () => {
    it('should create a payable', async () => {
      const payableDto: PayableDto = {
        id: 'e7acb640-365f-4f81-b111-589e697622ea',
        value: 1000,
        emissionDate: new Date(),
        assignor: 1,
      };

      const createdPayable: PayableEntity = {
        ...payableDto,
      };

      jest.spyOn(service, 'createPayable').mockResolvedValue(createdPayable);

      const result = await controller.createPayable(payableDto);

      expect(result).toBe(createdPayable);
      expect(service.createPayable).toHaveBeenCalledWith(payableDto);
    });

    it('should throw BadRequestException if creation fails', async () => {
      const payableDto: PayableDto = {
        id: 'e7acb640-365f-4f81-b111-589e697622ea',
        value: 1000,
        emissionDate: new Date(),
        assignor: 1,
      };

      jest.spyOn(service, 'createPayable').mockRejectedValue(new Error());

      await expect(controller.createPayable(payableDto)).rejects.toThrow(
        BadRequestException,
      );
      expect(service.createPayable).toHaveBeenCalledWith(payableDto);
    });
  });

  describe('getPayableById', () => {
    it('should return a payable by ID', async () => {
      const payableId = 'e7acb640-365f-4f81-b111-589e697622ea';
      const payable: PayableEntity = {
        id: payableId,
        value: 1000,
        emissionDate: new Date(),
        assignor: 1,
      };

      jest.spyOn(service, 'getPayableById').mockResolvedValue(payable);

      const result = await controller.getPayableById(payableId);

      expect(result).toBe(payable);
      expect(service.getPayableById).toHaveBeenCalledWith(payableId);
    });

    it('should throw NotFoundException if payable is not found', async () => {
      const payableId = 'invalid-id';

      jest.spyOn(service, 'getPayableById').mockResolvedValue(null);

      await expect(controller.getPayableById(payableId)).rejects.toThrow(
        NotFoundException,
      );
      expect(service.getPayableById).toHaveBeenCalledWith(payableId);
    });
  });

  describe('updatePayable', () => {
    it('should update a payable', async () => {
      const payableId = 'e7acb640-365f-4f81-b111-589e697622ea';
      const payableDto: PayableDto = {
        id: payableId,
        value: 1000,
        emissionDate: new Date(),
        assignor: 1,
      };

      const updatedPayable: PayableEntity = {
        ...payableDto,
      };

      jest.spyOn(service, 'updatePayable').mockResolvedValue(updatedPayable);

      const result = await controller.updatePayable(payableId, payableDto);

      expect(result).toBe(updatedPayable);
      expect(service.updatePayable).toHaveBeenCalledWith(payableId, payableDto);
    });

    it('should throw NotFoundException if payable is not found', async () => {
      const payableId = 'invalid-id';
      const payableDto: PayableDto = {
        id: payableId,
        value: 1000,
        emissionDate: new Date(),
        assignor: 1,
      };

      jest.spyOn(service, 'updatePayable').mockResolvedValue(null);

      await expect(
        controller.updatePayable(payableId, payableDto),
      ).rejects.toThrow(BadRequestException);
      expect(service.updatePayable).toHaveBeenCalledWith(payableId, payableDto);
    });

    it('should throw BadRequestException if update fails', async () => {
      const payableId = 'e7acb640-365f-4f81-b111-589e697622ea';
      const payableDto: PayableDto = {
        id: payableId,
        value: 1000,
        emissionDate: new Date(),
        assignor: 1,
      };

      jest.spyOn(service, 'updatePayable').mockRejectedValue(new Error());

      await expect(
        controller.updatePayable(payableId, payableDto),
      ).rejects.toThrow(BadRequestException);
      expect(service.updatePayable).toHaveBeenCalledWith(payableId, payableDto);
    });
  });

  describe('deletePayable', () => {
    it('should delete a payable', async () => {
      const payableId = 'e7acb640-365f-4f81-b111-589e697622ea';

      jest
        .spyOn(service, 'deletePayable')
        .mockResolvedValue({} as PayableEntity);

      await controller.deletePayable(payableId);

      expect(service.deletePayable).toHaveBeenCalledWith(payableId);
    });

    it('should throw NotFoundException if payable is not found', async () => {
      const payableId = 'invalid-id';

      jest.spyOn(service, 'deletePayable').mockResolvedValue(null);

      await expect(controller.deletePayable(payableId)).rejects.toThrow(
        NotFoundException,
      );
      expect(service.deletePayable).toHaveBeenCalledWith(payableId);
    });
  });
});
