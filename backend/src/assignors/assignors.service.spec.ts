import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { Assignor, PrismaClient } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { NotFoundException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { CreateAssignorDto } from './dto/create-assignor.dto';
import { AssignorsService } from './assignors.service';
import { UpdateAssignorDto } from './dto/update-assignor.dto';

describe('AssignorsService', () => {
  let service: AssignorsService;
  let prismaMock: DeepMockProxy<PrismaClient>;
  let assignor: CreateAssignorDto;
  let findUniqueMock: Assignor;

  beforeEach(async () => {
    assignor = {
      id: randomUUID(),
      document: `12345678901`,
      email: `email@email.com`,
      phone: `1234567890`,
      name: `Assignor`,
      userId: randomUUID(),
    };

    findUniqueMock = {
      ...assignor,
      userId: undefined,
    };

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
      prismaMock.assignor.create.mockResolvedValue(assignor);

      expect(await service.createAssignor(assignor)).toBe(assignor);
    });
  });

  describe('getAssignorById', () => {
    it('should return an assignor by id', async () => {
      prismaMock.assignor.findUnique.mockResolvedValue(findUniqueMock);

      expect(await service.getAssignorById('uuid')).toBe(findUniqueMock);
    });
  });

  describe('updateAssignor', () => {
    it('should update an assignor', async () => {
      prismaMock.assignor.findUnique.mockResolvedValue(findUniqueMock);

      const updateAssignorDto = {
        name: 'Updated Name',
        document: assignor.document,
        email: assignor.email,
        phone: assignor.phone,
      } as UpdateAssignorDto;

      prismaMock.assignor.update.mockResolvedValue({
        ...findUniqueMock,
        name: 'Updated Name',
      });
      expect(
        await service.updateAssignor(assignor.id, updateAssignorDto),
      ).toStrictEqual({ ...findUniqueMock, name: 'Updated Name' });
    });

    it('should throw NotFoundException if assignor not found', async () => {
      prismaMock.assignor.update.mockRejectedValue(null);
      prismaMock.assignor.findUnique.mockResolvedValue(null);

      const updateAssignorDto: UpdateAssignorDto = {
        document: assignor.document,
        email: assignor.email,
        name: 'Updated Name',
        phone: assignor.phone,
      };

      await expect(
        service.updateAssignor(randomUUID(), updateAssignorDto),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteAssignor', () => {
    it('should delete an assignor', async () => {
      prismaMock.assignor.findUnique.mockResolvedValue(findUniqueMock);
      prismaMock.assignor.delete.mockResolvedValue(findUniqueMock);

      expect(await service.deleteAssignor('uuid')).toBe(findUniqueMock);
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
