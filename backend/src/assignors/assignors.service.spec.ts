import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { Assignor, PrismaClient } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { CreateAssignorDto } from './dto/create-assignor.dto';
import { AssignorsService } from './assignors.service';
import { UpdateAssignorDto } from './dto/update-assignor.dto';

describe('AssignorsService', () => {
  let service: AssignorsService;
  let prismaMock: DeepMockProxy<PrismaClient>;
  let assignor: CreateAssignorDto;
  let findUniqueMock: Assignor;

  let updateAssignorDto: UpdateAssignorDto;

  beforeEach(async () => {
    assignor = {
      id: randomUUID(),
      document: `12345678901`,
      email: `email@email.com`,
      phone: `1234567890`,
      name: `Assignor`,
      userId: randomUUID(),
    };

    updateAssignorDto = {
      document: assignor.document,
      email: assignor.email,
      name: 'Updated Name',
      phone: assignor.phone,
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
      //@ts-ignore
      prismaMock.assignor.create.mockResolvedValue(assignor as any);

      expect(await service.createAssignor(assignor)).toBe(assignor);
    });

    it('should throw BadRequestException if invalid input data', async () => {
      const invalidAssignor = { ...assignor, name: null };

      await expect(service.createAssignor(invalidAssignor)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('getAssignorById', () => {
    it('should return an assignor by id', async () => {
      prismaMock.assignor.findUnique.mockResolvedValue(findUniqueMock);

      expect(await service.getAssignorById('uuid')).toBe(findUniqueMock);
    });

    it('should null if assignor not found', async () => {
      prismaMock.assignor.findUnique.mockResolvedValue(null);

      await expect(
        service.getAssignorById('non-existent-id'),
      ).resolves.toBeNull();
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

      await expect(
        service.updateAssignor(randomUUID(), updateAssignorDto),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw NotFoundException if assignor not found', async () => {
      prismaMock.assignor.findUnique.mockResolvedValue(null);

      await expect(
        service.updateAssignor('non-existent-id', updateAssignorDto),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException if invalid input data', async () => {
      const invalidUpdateDto = { ...updateAssignorDto, name: null };

      await expect(
        service.updateAssignor(assignor.id, invalidUpdateDto),
      ).rejects.toThrow(BadRequestException);
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
