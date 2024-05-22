import { Test, TestingModule } from '@nestjs/testing';
import { IntegrationsService } from './integrations.service';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaClient } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import {
  CreateAssignorDto,
  CreatePayableDto,
  UpdateAssignorDto,
  UpdatePayableDto,
} from './dto/create-integration.dto';
import { randomUUID } from 'node:crypto';

describe('IntegrationsService', () => {
  let service: IntegrationsService;
  let prismaMock: DeepMockProxy<PrismaClient>;
  let payables: CreatePayableDto[];
  let assignors: CreateAssignorDto[];
  let updatePayableDto: UpdatePayableDto;
  let updateAssignorDto: UpdateAssignorDto;

  beforeEach(async () => {
    payables = Array.from({ length: 10 }, (_, i) => ({
      id: randomUUID(),
      value: 100 * (i + 1),
      emissionDate: new Date(),
      assignor: randomUUID(),
    }));

    const { ...updatePayableDtoo } = payables[0];
    delete updatePayableDtoo.id;
    updatePayableDto = updatePayableDtoo as UpdatePayableDto;

    assignors = Array.from({ length: 10 }, (_, i) => ({
      id: randomUUID(),
      document: `${i + 1}2345678901`,
      email: `email${i + 1}@email.com`,
      phone: `${i + 1}234567890`,
      name: `Assignor ${i + 1}`,
    }));

    const { ...updateAssignorDtoo } = assignors[0];

    delete updateAssignorDtoo.id;

    updateAssignorDto = updateAssignorDtoo as UpdateAssignorDto;

    prismaMock = mockDeep<PrismaClient>();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IntegrationsService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();
    service = module.get<IntegrationsService>(IntegrationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getPayableById', () => {
    it('should return a payable by id', async () => {
      //@ts-expect-error mock implementation
      prismaMock.payable.findUnique.mockResolvedValue(payables[0]);
      expect(await service.getPayableById(payables[0].id)).toBe(payables[0]);
    });

    it('should return null if payable not found', async () => {
      prismaMock.payable.findUnique.mockResolvedValue(null);
      expect(await service.getPayableById('uuid')).toBeNull();
    });
  });

  describe('createPayable', () => {
    it('should create a payable', async () => {
      prismaMock.payable.create.mockResolvedValue(payables[0]);
      expect(await service.createPayable(payables[0])).toBe(payables[0]);
    });

    it('should throw Error if is a invalid data', async () => {
      await expect(
        service.createPayable({} as CreatePayableDto),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('updatePayable', () => {
    it('should update a payable', async () => {
      const newPayable = {
        ...payables[0],
        value: 200,
      };
      prismaMock.payable.update.mockResolvedValue(newPayable);

      expect(await service.updatePayable(payables[0].id, payables[0])).toBe(
        newPayable,
      );
    });

    it('should throw NotFoundException if payable not found', async () => {
      prismaMock.payable.update.mockRejectedValue({ code: 'P2025' });

      await expect(
        service.updatePayable(randomUUID(), updatePayableDto),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw Error if is a invalid data', async () => {
      prismaMock.payable.update.mockRejectedValue({ code: 'P2025' });

      await expect(
        service.updatePayable(randomUUID(), {} as UpdatePayableDto),
      ).rejects.toThrow(Error);
    });
  });

  describe('deletePayable', () => {
    it('should delete a payable', async () => {
      prismaMock.payable.findUnique.mockResolvedValue(payables[0]);
      prismaMock.payable.delete.mockResolvedValue(payables[0]);

      expect(await service.deletePayable('uuid')).toBe(payables[0]);
    });

    it('should throw NotFoundException if payable not found', async () => {
      prismaMock.payable.findUnique.mockResolvedValue(null);

      await expect(service.deletePayable('uuid')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('createAssignor', () => {
    it('should create an assignor', async () => {
      // @ts-expect-error mock implementation
      prismaMock.assignor.create.mockResolvedValue(assignors[0]);

      expect(await service.createAssignor(assignors[0])).toBe(assignors[0]);
    });
  });

  describe('getAssignorById', () => {
    it('should return an assignor by id', async () => {
      prismaMock.assignor.findUnique.mockResolvedValue(assignors[0]);

      expect(await service.getAssignorById('uuid')).toBe(assignors[0]);
    });
  });

  describe('updateAssignor', () => {
    it('should update an assignor', async () => {
      prismaMock.assignor.findUnique.mockResolvedValue(assignors[0]);

      const data = {
        ...updateAssignorDto,
        id: 'uuid',
      };

      prismaMock.assignor.update.mockResolvedValue(data as any);

      expect(await service.updateAssignor('uuid', updateAssignorDto)).toBe(
        data,
      );
    });

    it('should throw NotFoundException if assignor not found', async () => {
      prismaMock.assignor.update.mockRejectedValue(null);
      prismaMock.assignor.findUnique.mockResolvedValue(null);

      await expect(
        service.updateAssignor(randomUUID(), assignors[0]),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteAssignor', () => {
    it('should delete an assignor', async () => {
      prismaMock.assignor.findUnique.mockResolvedValue(assignors[0]);
      prismaMock.assignor.delete.mockResolvedValue(assignors[0]);

      expect(await service.deleteAssignor('uuid')).toBe(assignors[0]);
    });

    it('should throw NotFoundException if assignor not found', async () => {
      prismaMock.assignor.findUniqueOrThrow.mockRejectedValue(
        new NotFoundException('Assignor not found'),
      );

      await expect(service.deleteAssignor('uuid')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
