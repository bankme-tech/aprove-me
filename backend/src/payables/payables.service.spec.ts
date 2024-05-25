import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaClient } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { PayablesService } from './payables.service';
import { CreatePayableDto } from './dto/create.payable.dto';
import { UpdatePayableDto } from './dto/update.payable.dto';
import { ProducerService } from '../queue/producer.service';
import { BatchTrackerService } from '../queue/batch-tracker.service';
import { EmailService } from '../email/email.service';

describe('IntegrationsService', () => {
  let service: PayablesService;
  let prismaMock: DeepMockProxy<PrismaClient>;
  let payables: CreatePayableDto[];
  let updatePayableDto: UpdatePayableDto;
  let producerMock: DeepMockProxy<ProducerService>;
  let batchTrackerMock: DeepMockProxy<BatchTrackerService>;
  let emailServiceMock: DeepMockProxy<EmailService>;

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

    prismaMock = mockDeep<PrismaClient>();
    producerMock = mockDeep<ProducerService>();
    batchTrackerMock = mockDeep<BatchTrackerService>();
    emailServiceMock = mockDeep<EmailService>();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PayablesService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
        { provide: ProducerService, useValue: producerMock },
        {
          provide: BatchTrackerService,
          useValue: batchTrackerMock,
        },
        { provide: EmailService, useValue: emailServiceMock },
      ],
    }).compile();
    service = module.get<PayablesService>(PayablesService);
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

      const updatedPayable: UpdatePayableDto = {
        assignor: newPayable.assignor,
        emissionDate: newPayable.emissionDate,
        value: newPayable.value,
      };

      expect(await service.updatePayable(payables[0].id, updatedPayable)).toBe(
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

  describe('batchCreatePayables', () => {
    it('should throw BadRequestException if input is not an array', async () => {
      const createDtos = 'not an array' as any;

      await expect(service.batchCreatePayables(createDtos)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw BadRequestException if array length exceeds 10000', async () => {
      const createDtos = new Array(10001).fill({}) as CreatePayableDto[];

      await expect(service.batchCreatePayables(createDtos)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should process batch creation and notify via email', async () => {
      jest
        .spyOn(service, 'processBatchCreatePayable')
        .mockResolvedValue(undefined);

      batchTrackerMock.addBatch.mockReturnValue(undefined);
      producerMock.addToPayableQueue.mockResolvedValue(undefined);
      batchTrackerMock.onBatchComplete.mockImplementation((id, callback) => {
        callback({ sucessfulMessages: 1, failedMessages: 0 });
      });

      const result = await service.batchCreatePayables(payables);

      expect(result).toEqual({
        message: 'Your batch create payables is in progress',
      });
      expect(batchTrackerMock.addBatch).toHaveBeenCalledWith(
        expect.any(String),
        payables.length,
      );
      expect(producerMock.addToPayableQueue).toHaveBeenCalled();
      expect(emailServiceMock.sendEmail).toHaveBeenCalled();
    });
  });
});
