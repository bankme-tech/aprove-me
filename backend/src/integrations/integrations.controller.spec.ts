import { IntegrationsController } from './integrations.controller';
import { IntegrationsService } from './integrations.service';
import { NotFoundException } from '@nestjs/common';
import {
  CreateAssignorDto,
  CreatePayableDto,
  UpdateAssignorDto,
  UpdatePayableDto,
} from './dto/create-integration.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { randomUUID } from 'crypto';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';

describe('IntegrationsController', () => {
  let controller: IntegrationsController;
  let service: DeepMockProxy<IntegrationsService>;
  // let payableDto: CreatePayableDto;

  beforeEach(async () => {
    // payableDto = {
    //   id: randomUUID(),
    //   value: 100,
    //   emissionDate: new Date(),
    //   assignor: randomUUID(),
    // };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IntegrationsController],
      providers: [
        {
          provide: IntegrationsService,
          useValue: mockDeep<IntegrationsService>(),
        },
      ],
    }).compile();

    controller = module.get<IntegrationsController>(IntegrationsController);
    service = module.get<IntegrationsService>(
      IntegrationsService,
    ) as DeepMockProxy<IntegrationsService>;
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

  describe('getAssignorById', () => {
    it('should return an assignor if it exists', async () => {
      const assignorDto: CreateAssignorDto = {
        id: randomUUID(),
        document: '12345678901',
        email: 'email@example.com',
        phone: '1234567890',
        name: 'Assignor Name',
      };
      service.getAssignorById.mockResolvedValue(assignorDto);

      expect(await controller.getAssignorById(assignorDto.id)).toBe(
        assignorDto,
      );
    });

    it('should throw NotFoundException if assignor does not exist', async () => {
      service.getAssignorById.mockResolvedValue(null);
      await expect(
        controller.getAssignorById('non-existent-id'),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('updateAssignor', () => {
    it('should update an assignor', async () => {
      const updateAssignorDto: UpdateAssignorDto = {
        document: '12345678901',
        email: 'updated@example.com',
        phone: '1234567890',
        name: 'Updated Assignor Name',
      };
      const randomId = randomUUID();
      const data = {
        ...updateAssignorDto,
        id: randomId,
      };

      service.updateAssignor.mockResolvedValue(data);

      expect(await controller.updateAssignor(data.id, updateAssignorDto)).toBe(
        data,
      );
    });

    it('should throw NotFoundException if assignor does not exist', async () => {
      service.updateAssignor.mockRejectedValue(
        new NotFoundException('Assignor not found'),
      );
      const updateAssignorDto: UpdateAssignorDto = {
        document: '12345678901',
        email: 'updated@example.com',
        phone: '1234567890',
        name: 'Updated Assignor Name',
      };

      await expect(
        controller.updateAssignor('non-existent-id', updateAssignorDto),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('createAssignor', () => {
    it('should create an assignor', async () => {
      const assignorDto: CreateAssignorDto = {
        id: randomUUID(),
        document: '12345678901',
        email: 'email@example.com',
        phone: '1234567890',
        name: 'Assignor Name',
      };
      service.createAssignor.mockResolvedValue(assignorDto);

      expect(await controller.create(assignorDto)).toBe(assignorDto);
    });
  });

  describe('deleteAssignor', () => {
    it('should delete an assignor', async () => {
      const assignorDto: CreateAssignorDto = {
        id: randomUUID(),
        document: '12345678901',
        email: 'email@example.com',
        phone: '1234567890',
        name: 'Assignor Name',
      };
      service.deleteAssignor.mockResolvedValue(assignorDto);

      expect(await controller.deleteAssignor(assignorDto.id)).toBe(assignorDto);
    });

    it('should throw NotFoundException if assignor does not exist', async () => {
      service.deleteAssignor.mockRejectedValue(
        new NotFoundException('Assignor not found'),
      );

      await expect(
        controller.deleteAssignor('non-existent-id'),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
