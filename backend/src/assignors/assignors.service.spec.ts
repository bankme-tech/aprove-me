import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaClient } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { NotFoundException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { UpdateAssignorDto } from './dto/update-assignor.dto';
import { CreateAssignorDto } from './dto/create-assignor.dto';
import { AssignorsService } from './assignors.service';

describe('IntegrationsService', () => {
  let service: AssignorsService;
  let prismaMock: DeepMockProxy<PrismaClient>;
  let assignors: CreateAssignorDto[];
  let updateAssignorDto: UpdateAssignorDto;

  beforeEach(async () => {
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
        AssignorsService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();
    service = module.get<AssignorsService>(AssignorsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
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
