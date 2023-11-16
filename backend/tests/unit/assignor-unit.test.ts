import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { Assignor } from '@prisma/client';
import { AssignorService } from '../../src/assignor/assignor.service';
import { AssignorRepository } from '../../src/assignor/assignor.repository';
import { CreateAssignorDto } from '../../src/assignor/dto/create-assignor.dto';
import { UpdateAssignorDto } from '../../src/assignor/dto/update-assignor.dto';
import { PrismaService } from '../../src/prisma/prisma.service';
import { cleanDB } from '../helpers';

describe('Assignor Service Unit Tests', () => {
  let assignorService: AssignorService;
  let assignorRepository: AssignorRepository;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssignorService, AssignorRepository, PrismaService],
    }).compile();

    assignorService = module.get<AssignorService>(AssignorService);
    assignorRepository = module.get<AssignorRepository>(AssignorRepository);
    prismaService = module.get<PrismaService>(PrismaService);

    await cleanDB(prismaService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(assignorService).toBeDefined();
  });

  describe('create', () => {
    it('should create an assignor', async () => {
      const createAssignorDto: CreateAssignorDto = {
        document: '123456789',
        email: 'test@example.com',
        phone: '1234567890',
        name: 'Test Assignor',
      };

      jest
        .spyOn(assignorRepository, 'create')
        .mockResolvedValue({} as Assignor);

      const result = await assignorService.create(createAssignorDto);
      expect(result).toBeDefined();
      expect(assignorRepository.create).toHaveBeenCalledWith(createAssignorDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of assignors', async () => {
      const assignors: Assignor[] = [
        {
          id: 1,
          name: 'Assignor 1',
          document: '123456789',
          email: 'assignor1@example.com',
          phone: '1234567890',
        },
        {
          id: 2,
          name: 'Assignor 2',
          document: '987654321',
          email: 'assignor2@example.com',
          phone: '9876543210',
        },
      ];

      jest.spyOn(assignorRepository, 'findAll').mockResolvedValue(assignors);

      const result = await assignorService.findAll();

      expect(result).toEqual(assignors);
      expect(assignorRepository.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return an assignor by ID', async () => {
      const assignorId = 1;
      const assignor: Assignor = {
        id: assignorId,
        name: 'Test Assignor',
        document: '123456789',
        email: 'test@example.com',
        phone: '9876543210',
      };

      jest.spyOn(assignorRepository, 'findOne').mockResolvedValue(assignor);

      const result = await assignorService.findOne(assignorId);
      expect(result).toEqual(assignor);
      expect(assignorRepository.findOne).toHaveBeenCalledWith(assignorId);
    });

    it('should throw NotFoundException if assignor does not exist', async () => {
      const nonExistingAssignorId = 2;

      jest.spyOn(assignorRepository, 'findOne').mockResolvedValue(null);

      await expect(
        assignorService.findOne(nonExistingAssignorId),
      ).rejects.toThrow(NotFoundException);
      expect(assignorRepository.findOne).toHaveBeenCalledWith(
        nonExistingAssignorId,
      );
    });
  });

  describe('update', () => {
    it('should update an assignor', async () => {
      const assignorId = 1;
      const updateAssignorDto: UpdateAssignorDto = {
        name: 'Updated Assignor',
      };

      jest
        .spyOn(assignorService, 'validateAssignorExists')
        .mockResolvedValue(null);

      jest
        .spyOn(assignorRepository, 'update')
        .mockResolvedValue({} as Assignor);

      const result = await assignorService.update(
        assignorId,
        updateAssignorDto,
      );
      expect(result).toBeDefined();

      expect(assignorService.validateAssignorExists).toHaveBeenCalledWith(
        assignorId,
      );

      expect(assignorRepository.update).toHaveBeenCalledWith(
        assignorId,
        updateAssignorDto,
      );
    });

    it('should throw NotFoundException if assignor does not exist', async () => {
      const assignorId = 1;
      const updateAssignorDto: UpdateAssignorDto = {
        name: 'Updated Assignor',
      };

      jest
        .spyOn(assignorService, 'validateAssignorExists')
        .mockRejectedValue(
          new NotFoundException(`Assignor with id ${assignorId} not found.`),
        );

      await expect(async () => {
        await assignorService.update(assignorId, updateAssignorDto);
      }).rejects.toThrow(NotFoundException);

      expect(assignorService.validateAssignorExists).toHaveBeenCalledWith(
        assignorId,
      );
    });

    it('should handle updating non-existing assignor', async () => {
      const nonExistingAssignorId = 2;
      const updateAssignorDto: UpdateAssignorDto = {
        name: 'Updated Assignor',
      };

      jest
        .spyOn(assignorService, 'validateAssignorExists')
        .mockRejectedValue(
          new NotFoundException(
            `Assignor with id ${nonExistingAssignorId} not found.`,
          ),
        );

      await expect(async () => {
        await assignorService.update(nonExistingAssignorId, updateAssignorDto);
      }).rejects.toThrow(NotFoundException);

      expect(assignorService.validateAssignorExists).toHaveBeenCalledWith(
        nonExistingAssignorId,
      );
    });
  });

  describe('remove', () => {
    it('should remove an assignor', async () => {
      const assignorId = 1;
      const removedAssignor: Assignor = {
        id: assignorId,
        name: 'Removed Assignor',
        document: '987654321',
        email: 'removed@example.com',
        phone: '1234567890',
      };

      jest
        .spyOn(assignorService, 'validateAssignorExists')
        .mockResolvedValue(null);
      jest
        .spyOn(assignorRepository, 'remove')
        .mockResolvedValue(removedAssignor);

      const result = await assignorService.remove(assignorId);
      expect(result).toEqual(removedAssignor);
      expect(assignorService.validateAssignorExists).toHaveBeenCalledWith(
        assignorId,
      );
      expect(assignorRepository.remove).toHaveBeenCalledWith(assignorId);
    });

    it('should throw NotFoundException if assignor does not exist', async () => {
      const nonExistingAssignorId = 2;

      jest
        .spyOn(assignorService, 'validateAssignorExists')
        .mockRejectedValue(
          new NotFoundException(
            `Assignor with id ${nonExistingAssignorId} not found.`,
          ),
        );

      await expect(
        assignorService.remove(nonExistingAssignorId),
      ).rejects.toThrow(NotFoundException);
      expect(assignorService.validateAssignorExists).toHaveBeenCalledWith(
        nonExistingAssignorId,
      );
    });
  });
});
